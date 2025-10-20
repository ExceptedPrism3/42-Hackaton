const { exec } = require('child_process');
const cheerio = require('cheerio');

class NotionScraper {
  constructor(maxDepth = 2) {
    this.allContent = [];
    this.visitedUrls = new Set();
    this.maxDepth = maxDepth;
  }

  async scrapePage(url) {
    return new Promise((resolve, reject) => {
      const appleScript = `
        tell application "Safari"
          open location "${url}"
          delay 10
          tell current tab of front window
            do JavaScript "document.body.innerHTML"
          end tell
        end tell
      `;

      exec(`osascript -e '${appleScript}'`, (error, stdout, stderr) => {
        if (error) {
          console.error(`AppleScript error: ${stderr}`);
          reject(error);
        } else {
          resolve(stdout.trim());
        }
      });
    });
  }

  async scrapeRecursive(url, depth = 0) {
    if (depth > this.maxDepth || this.visitedUrls.has(url)) {
      return;
    }

    console.log(`Scraping [depth: ${depth}]: ${url}`);
    this.visitedUrls.add(url);

    try {
      const html = await this.scrapePage(url);
      const $ = cheerio.load(html);

      const title = $('title').text() || url;
      const content = $('body').text().trim();

      this.allContent.push({
        url: url,
        title: title,
        content: content,
        timestamp: new Date().toISOString(),
        source: 'notion-safari'
      });

      if (depth < this.maxDepth) {
        const links = new Set();
        $('a').each((i, link) => {
          const href = $(link).attr('href');
          if (href) {
            if (href.startsWith('/')) {
              const urlObject = new URL(url);
              links.add(`${urlObject.protocol}//${urlObject.host}${href}`);
            } else if (href.includes('notion.so')) {
              links.add(href);
            }
          }
        });

        for (const link of links) {
          await this.scrapeRecursive(link, depth + 1);
        }
      }
    } catch (error) {
      console.error(`Failed to scrape ${url}:`, error);
    }
  }
}

module.exports = { NotionScraper };
