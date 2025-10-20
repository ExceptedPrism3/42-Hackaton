const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class RecursiveNotionScraper {
  constructor() {
    this.browser = null;
    this.scrapedUrls = new Set(); // Track already scraped URLs
    this.allContent = [];
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async scrapePageRecursively(url, depth = 0, maxDepth = 3) {
    if (this.scrapedUrls.has(url) || depth > maxDepth) {
      return;
    }

    if (!this.browser) {
      await this.init();
    }

    this.scrapedUrls.add(url);
    console.log(`${'  '.repeat(depth)}🔍 Scraping depth ${depth}: ${url}`);

    const page = await this.browser.newPage();
    
    try {
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      await page.setViewport({ width: 1920, height: 1080 });
      
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      await new Promise(resolve => setTimeout(resolve, 3000));

      const pageData = await page.evaluate(() => {
        // Extract all text content
        const getTextContent = (element) => {
          let text = '';
          if (element.textContent) {
            text += element.textContent.trim() + '\n\n';
          }
          return text;
        };

        // Try multiple selectors for content
        const contentSelectors = [
          '[data-block-id]',
          '.notion-page-content',
          '.notion-selectable',
          '[role="textbox"]',
          '.notion-text',
          'main',
          'article',
          '.notion-page',
          '[data-root="true"]'
        ];

        let allText = '';
        for (const selector of contentSelectors) {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            elements.forEach(el => {
              allText += getTextContent(el);
            });
            break;
          }
        }

        if (!allText.trim()) {
          allText = document.body.innerText;
        }

        // Find all links that might be categories or subcategories
        const links = [];
        const linkSelectors = [
          'a[href*="notion.site"]',
          'a[href*="42heilbronn"]',
          '[data-block-id] a',
          '.notion-page a',
          'a[role="button"]'
        ];

        linkSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            const href = el.getAttribute('href');
            const text = el.textContent?.trim();
            
            if (href && text && text.length > 2 && text.length < 200) {
              // Convert relative URLs to absolute
              let fullUrl = href;
              if (href.startsWith('/')) {
                fullUrl = `https://42heilbronn.notion.site${href}`;
              } else if (!href.startsWith('http')) {
                fullUrl = `https://42heilbronn.notion.site/${href}`;
              }

              // Only include Notion links
              if (fullUrl.includes('notion.site') || fullUrl.includes('42heilbronn')) {
                links.push({
                  url: fullUrl,
                  title: text,
                  originalHref: href
                });
              }
            }
          });
        });

        // Also look for clickable elements that might be categories
        const clickableElements = document.querySelectorAll('[data-block-id], [role="button"], .notion-selectable');
        clickableElements.forEach(el => {
          const text = el.textContent?.trim();
          if (text && text.length > 3 && text.length < 100) {
            // Check if this element has a click handler or is a link
            const parentLink = el.closest('a');
            if (parentLink) {
              const href = parentLink.getAttribute('href');
              if (href) {
                let fullUrl = href;
                if (href.startsWith('/')) {
                  fullUrl = `https://42heilbronn.notion.site${href}`;
                } else if (!href.startsWith('http')) {
                  fullUrl = `https://42heilbronn.notion.site/${href}`;
                }

                if (fullUrl.includes('notion.site') || fullUrl.includes('42heilbronn')) {
                  links.push({
                    url: fullUrl,
                    title: text,
                    originalHref: href
                  });
                }
              }
            }
          }
        });

        return {
          content: allText,
          links: links,
          pageTitle: document.title,
          url: window.location.href
        };
      });

      // Store the content
      this.allContent.push({
        url: url,
        title: pageData.pageTitle,
        content: pageData.content,
        depth: depth,
        timestamp: new Date().toISOString()
      });

      console.log(`${'  '.repeat(depth)}📊 Extracted ${pageData.content.length} characters`);
      console.log(`${'  '.repeat(depth)}🔗 Found ${pageData.links.length} links`);

      // Show found links
      if (pageData.links.length > 0) {
        console.log(`${'  '.repeat(depth)}📋 Links found:`);
        pageData.links.forEach((link, index) => {
          console.log(`${'  '.repeat(depth)}  ${index + 1}. ${link.title} - ${link.url}`);
        });
      }

      // Recursively scrape found links
      for (const link of pageData.links) {
        if (!this.scrapedUrls.has(link.url)) {
          await this.scrapePageRecursively(link.url, depth + 1, maxDepth);
          // Be respectful - wait between requests
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

    } catch (error) {
      console.error(`${'  '.repeat(depth)}❌ Error scraping ${url}:`, error.message);
    } finally {
      await page.close();
    }
  }

  async saveToKnowledgeBase() {
    const kbPath = path.join(__dirname, 'knowledge_base.md');
    
    let markdown = `# 42 Heilbronn Knowledge Base\n\n`;
    markdown += `<!-- Auto-generated from recursive Notion scraping on ${new Date().toISOString()} -->\n\n`;
    markdown += `**Total pages scraped:** ${this.allContent.length}\n\n`;
    
    // Group by depth for better organization
    const byDepth = {};
    this.allContent.forEach(item => {
      if (!byDepth[item.depth]) {
        byDepth[item.depth] = [];
      }
      byDepth[item.depth].push(item);
    });

    // Add content organized by depth
    Object.keys(byDepth).sort((a, b) => parseInt(a) - parseInt(b)).forEach(depth => {
      const items = byDepth[depth];
      const depthTitle = depth === '0' ? 'Main Page' : `Level ${depth} Categories`;
      
      markdown += `## ${depthTitle}\n\n`;
      
      items.forEach((item, index) => {
        markdown += `### ${item.title || `Page ${index + 1}`}\n\n`;
        markdown += `**URL:** ${item.url}\n\n`;
        markdown += `**Content:**\n\n${item.content}\n\n`;
        markdown += `---\n\n`;
      });
    });
    
    fs.writeFileSync(kbPath, markdown);
    console.log(`\n✅ Knowledge base updated with ${this.allContent.length} pages`);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Main recursive scraping function
async function scrapeRecursively() {
  const scraper = new RecursiveNotionScraper();
  
  try {
    console.log('🚀 Starting recursive 42 Heilbronn Notion scraping...');
    console.log('📊 This will scrape the main page and all categories/subcategories');
    
    const mainUrl = 'https://www.notion.so/42heilbronn/01328f81282340fc93d9398a5314f8c4?v=41ea720a2cff48498b0030285dc72f2d';
    
    // Start recursive scraping from main page
    await scraper.scrapePageRecursively(mainUrl, 0, 3); // Max depth of 3 levels
    
    // Save all content to knowledge base
    await scraper.saveToKnowledgeBase();
    
    console.log('\n✅ Recursive scraping completed!');
    console.log(`📊 Total pages scraped: ${scraper.allContent.length}`);
    console.log(`📊 Unique URLs: ${scraper.scrapedUrls.size}`);
    
    // Show summary
    console.log('\n📋 Scraping Summary:');
    scraper.allContent.forEach((item, index) => {
      console.log(`  ${index + 1}. [Depth ${item.depth}] ${item.title || 'Untitled'} - ${item.content.length} chars`);
    });
    
  } catch (error) {
    console.error('❌ Recursive scraping failed:', error);
  } finally {
    await scraper.close();
  }
}

// Export for use in other files
module.exports = { RecursiveNotionScraper };

// Run if called directly
if (require.main === module) {
  scrapeRecursively();
}
