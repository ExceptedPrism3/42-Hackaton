# 42 Heilbronn Data Scraper

A comprehensive data collection system that automatically gathers information about 42 Heilbronn from multiple sources.

## 🎯 What It Does

### 🔍 **Web Search**
- Automatically searches for 42 Heilbronn information
- Covers topics like: campus life, coding standards, housing, scholarships, visa requirements
- Uses DuckDuckGo search (no API keys needed)

### 🌐 **Website Scraping**
- Scrapes official 42 Heilbronn websites
- Extracts relevant content automatically
- Filters out ads and navigation elements

### 📋 **Notion Integration**
- Opens Safari for manual Notion content extraction
- Uses your existing login session
- Allows you to copy/paste specific pages

### 💾 **Knowledge Base Updates**
- Automatically updates the AI's knowledge base
- Organizes content by source type
- Creates comprehensive markdown files

## 🚀 Quick Start

### Run the Comprehensive Scraper

```bash
cd scrapers
node run-scraper.js
```

### Or Run the Main Scraper Directly

```bash
cd scrapers
node 42-heilbronn-scraper.js
```

## 📊 What Gets Collected

### **Automated Sources:**
- ✅ Web search results for 42 Heilbronn topics
- ✅ Official 42 Heilbronn website content
- ✅ 42 school general information
- ✅ Campus and student life information

### **Manual Sources:**
- ✅ Specific Notion pages you choose
- ✅ Protected content from your Notion workspace
- ✅ Custom content you want to include

## 🔧 How It Works

### **Phase 1: Web Search**
1. Searches for 42 Heilbronn information online
2. Covers multiple search terms automatically
3. Scrapes relevant websites found

### **Phase 2: Known Websites**
1. Scrapes official 42 Heilbronn websites
2. Extracts campus and program information
3. Gathers general 42 school information

### **Phase 3: Manual Notion**
1. Opens Safari with your Notion pages
2. You copy content manually
3. Paste it into the scraper
4. Adds to knowledge base

### **Phase 4: Save Everything**
1. Organizes all content by source
2. Updates the AI's knowledge base
3. Creates comprehensive documentation

## 📁 Output

The scraper creates/updates:
- `../server/knowledge_base.md` - Main knowledge base for the AI
- Organized by source type (web, notional, manual)
- Timestamped and versioned

## 🎯 Benefits

- **Comprehensive**: Gets data from multiple sources
- **Automated**: Most work is done automatically
- **Flexible**: Combines automated and manual methods
- **Smart**: Uses web search to find relevant information
- **Organized**: Structures data for optimal AI performance

## 🔧 Customization

### Add More Search Terms
Edit `42-heilbronn-scraper.js` and modify the `searchTerms` array:

```javascript
const searchTerms = [
  'campus information',
  'student life',
  'coding standards',
  // Add your own terms here
];
```

### Add More Websites
Edit the `knownSites` array:

```javascript
const knownSites = [
  {
    url: 'https://42heilbronn.de',
    title: '42 Heilbronn Official Website'
  },
  // Add more sites here
];
```

## 🐛 Troubleshooting

### Common Issues

**1. Web search not working**
- Check internet connection
- Some websites may block automated requests
- Try running again later

**2. Safari not opening**
- Make sure Safari is installed
- Check file permissions
- Try opening Safari manually first

**3. Content not saving**
- Check file permissions in server directory
- Ensure server directory exists
- Verify knowledge base path

### Debug Mode

```bash
# Run with verbose output
DEBUG=true node 42-heilbronn-scraper.js
```

## 📚 Examples

### Basic Usage
```bash
cd scrapers
node run-scraper.js
```

### Advanced Usage
```bash
cd scrapers
node 42-heilbronn-scraper.js
```

## 🔄 Regular Updates

### Manual Updates
Run the scraper whenever you want fresh data:

```bash
cd scrapers
node run-scraper.js
```

### Automated Updates
Set up a cron job for regular updates:

```bash
# Add to crontab (runs every 6 hours)
0 */6 * * * cd /path/to/scrapers && node run-scraper.js
```

## 📊 Performance

- **Fast**: Optimized for quick data collection
- **Respectful**: Waits between requests to avoid overloading servers
- **Efficient**: Only scrapes relevant content
- **Smart**: Filters out unwanted navigation and ads

## 🔒 Privacy

- **No API Keys**: Uses free web search
- **Local Processing**: All data stays on your machine
- **Respectful**: Follows robots.txt and rate limits
- **Transparent**: Shows exactly what it's doing

---

**Built for 42Butler**

*Automatically gathering comprehensive knowledge for intelligent student assistance.*
