#!/usr/bin/env node

const { Heilbronn42Scraper } = require('./42-heilbronn-scraper');

console.log('🚀 42 Heilbronn Comprehensive Data Scraper');
console.log('==========================================\n');

console.log('📋 This scraper will:');
console.log('1. 🔍 Search the web for 42 Heilbronn information');
console.log('2. 🌐 Scrape relevant websites automatically');
console.log('3. 📋 Open Safari for manual Notion content extraction');
console.log('4. 💾 Update your knowledge base with all data\n');

console.log('🎯 Benefits:');
console.log('- Automatically gathers data from multiple sources');
console.log('- Uses web search to find relevant information');
console.log('- Combines automated and manual scraping');
console.log('- Creates comprehensive knowledge base\n');

(async () => {
  const scraper = new Heilbronn42Scraper();
  
  try {
    await scraper.scrapeAll();
  } catch (error) {
    console.error('❌ Scraping failed:', error);
  }
})();
