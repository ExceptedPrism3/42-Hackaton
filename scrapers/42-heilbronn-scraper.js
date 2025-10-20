const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { exec } = require('child_process');

class Heilbronn42Scraper {
  constructor() {
    this.allContent = [];
    this.knowledgeBasePath = path.join(__dirname, '../server/knowledge_base.md');
  }

  // Web search functionality
  async searchWeb(query) {
    try {
      console.log(`🔍 Searching web for: ${query}`);
      
      // Search for 42 Heilbronn specific information
      const searchQueries = [
        `42 Heilbronn ${query}`,
        `42 school Heilbronn ${query}`,
        `42 coding school Germany ${query}`,
        `42 Heilbronn campus ${query}`,
        `42 Heilbronn student ${query}`
      ];

      const results = [];
      
      for (const searchQuery of searchQueries) {
        try {
          // Use DuckDuckGo search (no API key needed)
          const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}`;
          const response = await axios.get(searchUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          });

          const $ = cheerio.load(response.data);
          const searchResults = [];

          $('.result').each((index, element) => {
            if (index < 5) { // Limit to first 5 results
              const title = $(element).find('.result__title a').text().trim();
              const url = $(element).find('.result__title a').attr('href');
              const snippet = $(element).find('.result__snippet').text().trim();

              if (title && url && snippet) {
                searchResults.push({
                  title,
                  url,
                  snippet,
                  query: searchQuery
                });
              }
            }
          });

          results.push(...searchResults);
          
          // Be respectful - wait between requests
          await new Promise(resolve => setTimeout(resolve, 2000));
          
        } catch (error) {
          console.log(`⚠️ Search failed for: ${searchQuery}`);
        }
      }

      return results;
    } catch (error) {
      console.error('❌ Web search failed:', error.message);
      return [];
    }
  }

  // Scrape specific websites
  async scrapeWebsite(url, title = '') {
    try {
      console.log(`🌐 Scraping website: ${url}`);
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      
      // Remove unwanted elements
      $('script, style, nav, header, footer, .ad, .advertisement').remove();
      
      // Extract main content
      let content = '';
      
      // Try different selectors for main content
      const contentSelectors = [
        'main',
        'article',
        '.content',
        '.post-content',
        '.entry-content',
        'body'
      ];

      for (const selector of contentSelectors) {
        const element = $(selector);
        if (element.length > 0) {
          content = element.text().trim();
          if (content.length > 100) break;
        }
      }

      if (content.length > 100) {
        this.addContent(url, title || $('title').text(), content);
        console.log(`✅ Scraped: ${title} (${content.length} chars)`);
        return true;
      }

      return false;
    } catch (error) {
      console.error(`❌ Failed to scrape ${url}:`, error.message);
      return false;
    }
  }

  // Safari-based Notion scraping
  openSafari(url) {
    return new Promise((resolve, reject) => {
      exec(`open -a Safari "${url}"`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  // Add content to knowledge base
  addContent(url, title, content) {
    this.allContent.push({
      url: url,
      title: title,
      content: content,
      timestamp: new Date().toISOString(),
      source: 'scraper'
    });
  }

  // Save to knowledge base
  async saveToKnowledgeBase() {
    let markdown = `# 42 Heilbronn Knowledge Base\n\n`;
    markdown += `<!-- Auto-generated from comprehensive scraping on ${new Date().toISOString()} -->\n\n`;
    markdown += `**Total sources:** ${this.allContent.length}\n\n`;
    
    // Group by source type
    const bySource = {};
    this.allContent.forEach(item => {
      if (!bySource[item.source]) {
        bySource[item.source] = [];
      }
      bySource[item.source].push(item);
    });

    // Add content organized by source
    Object.keys(bySource).forEach(source => {
      const items = bySource[source];
      markdown += `## ${source.charAt(0).toUpperCase() + source.slice(1)} Sources\n\n`;
      
      items.forEach((item, index) => {
        markdown += `### ${item.title}\n\n`;
        markdown += `**URL:** ${item.url}\n\n`;
        markdown += `**Content:**\n\n${item.content}\n\n`;
        markdown += `---\n\n`;
      });
    });
    
    fs.writeFileSync(this.knowledgeBasePath, markdown);
    console.log(`\n✅ Knowledge base updated with ${this.allContent.length} sources`);
  }

  async scrapeNotionPage(url) {
    try {
      console.log(` Scraping Notion page: ${url}`);
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const title = $('title').text();
      $('script, style, nav, header, footer, .ad, .advertisement').remove();
      const content = $('body').text().trim();

      if (content.length > 100) {
        this.addContent(url, title, content);
        console.log(`✅ Scraped Notion Page: ${title} (${content.length} chars)`);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`❌ Failed to scrape Notion page ${url}:`, error.message);
      return false;
    }
  }

  // Main scraping function
  async scrapeAll() {
    console.log('🚀 Starting comprehensive 42 Heilbronn data collection...\n');

    // 1. Web search for 42 Heilbronn information
    console.log('📡 Phase 1: Web search for 42 Heilbronn information...');
    const searchTerms = [
      'campus information',
      'student life',
      'coding standards',
      'housing',
      'scholarships',
      'visa requirements',
      'norminette',
      'moulinette',
      'projects',
      'curriculum',
      'admissions',
      'piscine',
      'events',
      'contact'
    ];

    for (const term of searchTerms) {
      const searchResults = await this.searchWeb(term);
      console.log(`🔍 Found ${searchResults.length} results for: ${term}`);
      
      // Scrape the most relevant results
      for (const result of searchResults.slice(0, 3)) {
        if (result.url && !result.url.includes('duckduckgo.com')) {
          await this.scrapeWebsite(result.url, result.title);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
    }

    // 2. Known 42 Heilbronn websites
    console.log('\n🌐 Phase 2: Scraping known 42 Heilbronn websites...');
    const knownSites = [
      {
        url: 'https://42heilbronn.de',
        title: '42 Heilbronn Official Website'
      },
      {
        url: 'https://42.fr',
        title: '42 School Official Website'
      },
      {
        url: 'https://www.linkedin.com/school/42-heilbronn/',
        title: '42 Heilbronn LinkedIn'
      },
      {
        url: 'https://www.instagram.com/42heilbronn/',
        title: '42 Heilbronn Instagram'
      }
    ];

    for (const site of knownSites) {
      await this.scrapeWebsite(site.url, site.title);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // 3. Automated Notion scraping
    console.log('\n📋 Phase 3: Automated Notion scraping...');
    const notionUrls = [
      // Add your Notion URLs here. For example:
      // 'https://www.notion.so/your-workspace/Page-Title-1234567890abcdef1234567890abcdef'
    ];

    if (notionUrls.length === 0) {
      console.log('No Notion URLs provided. Skipping Notion scraping.');
    } else {
      for (const url of notionUrls) {
        await this.scrapeNotionPage(url);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // 4. Save everything
    await this.saveToKnowledgeBase();
    
    console.log('\n✅ Comprehensive scraping completed!');
    console.log(`📊 Total sources: ${this.allContent.length}`);
    
    // Show summary
    console.log('\n📋 Scraping Summary:');
    this.allContent.forEach((item, index) => {
      console.log(`  ${index + 1}. [${item.source}] ${item.title} - ${item.content.length} chars`);
    });
  }
}

// Main function
async function runComprehensiveScraping() {
  const scraper = new Heilbronn42Scraper();
  
  try {
    await scraper.scrapeAll();
  } catch (error) {
    console.error('❌ Comprehensive scraping failed:', error);
  }
}

// Export for use in other files
module.exports = { Heilbronn42Scraper };

// Run if called directly
if (require.main === module) {
  runComprehensiveScraping();
}
