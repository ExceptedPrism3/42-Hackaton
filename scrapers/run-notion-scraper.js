const fs = require('fs');
const path = require('path');
const { NotionScraper } = require('./notion-scraper');

const notionUrls = [
  // Add your Notion URLs here. For example:
  'https://www.notion.so/42heilbronn/01328f81282340fc93d9398a5314f8c4?v=41ea720a2cff48498b0030285dc72f2d'
];

const knowledgeBasePath = path.join(__dirname, '../server/knowledge_base_notion.md');
const maxDepth = 5;

(async () => {
  if (notionUrls.length === 0) {
    console.log('No Notion URLs provided. Please add your Notion URLs to scrapers/run-notion-scraper.js');
    return;
  }

  const scraper = new NotionScraper(maxDepth);

  console.log(`🚀 Starting Notion scraper with max depth: ${maxDepth}...`);

  for (const url of notionUrls) {
    await scraper.scrapeRecursive(url);
  }

  let markdown = `# 42 Heilbronn Notion Knowledge Base\n\n`;
  markdown += `<!-- Auto-generated from Notion scraping on ${new Date().toISOString()} -->\n\n`;
  markdown += `**Total pages:** ${scraper.allContent.length}\n\n`;

  scraper.allContent.forEach(item => {
    markdown += `### ${item.title}\n\n`;
    markdown += `**URL:** ${item.url}\n\n`;
    markdown += `**Content:**\n\n${item.content}\n\n`;
    markdown += `---\n\n`;
  });

  fs.writeFileSync(knowledgeBasePath, markdown);

  console.log(`\n✅ Notion scraping completed!`);
  console.log(`📊 Total pages scraped: ${scraper.allContent.length}`);
  console.log(`💾 Knowledge base saved to: ${knowledgeBasePath}`);
})();
