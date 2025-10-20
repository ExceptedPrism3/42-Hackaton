q# 🕷️ Notion Scraping Guide for 42 Heilbronn AI

## 🎯 **Quick Start (5 minutes)**

### Step 1: Get Notion URLs
1. **Go to the Notion workspace** with 42 Heilbronn info
2. **Find the pages** you want to scrape (campus rules, project info, etc.)
3. **Copy the URLs** - they look like: `https://www.notion.so/workspace/page-name-abc123`
4. **Make sure pages are public** or you have access

### Step 2: Run the Setup
```bash
cd server
node setup-scraper.js
```
- **Paste your URLs** one by one
- **Type "done"** when finished
- **The scraper will be configured** automatically

### Step 3: Run the Scraper
```bash
node update-knowledge.js
```
- **This will scrape all pages** and update the knowledge base
- **Check the output** for any errors
- **Restart your server** to use the new data

## 🔧 **Manual Setup (if needed)**

### Edit the URLs directly:
1. **Open** `server/update-knowledge.js`
2. **Replace the URLs** in the `urls` array:
```javascript
const urls = [
  'https://www.notion.so/your-workspace/page1',
  'https://www.notion.so/your-workspace/page2',
  // Add more URLs here
];
```

## 🚀 **Automated Updates**

### Option 1: Cron Job (Linux/Mac)
```bash
# Edit crontab
crontab -e

# Add this line to run every 6 hours
0 */6 * * * cd /path/to/your/server && node update-knowledge.js
```

### Option 2: Manual Updates
```bash
# Run whenever you want to update
cd server
node update-knowledge.js
```

## 🛠️ **Troubleshooting**

### Common Issues:

**1. "No content was scraped"**
- ✅ Check if URLs are correct
- ✅ Make sure pages are accessible
- ✅ Try opening URLs in browser first

**2. "Timeout errors"**
- ✅ Notion pages might be slow to load
- ✅ Check your internet connection
- ✅ Try with fewer URLs at once

**3. "Permission denied"**
- ✅ Make sure you have access to the Notion pages
- ✅ Check if pages are public or shared with you

### Debug Mode:
```bash
# Run with more verbose output
DEBUG=true node update-knowledge.js
```

## 📊 **What Gets Scraped**

The scraper extracts:
- ✅ **Text content** from Notion pages
- ✅ **Headers and sections**
- ✅ **Lists and bullet points**
- ✅ **Code blocks** (if any)
- ✅ **Links and references**

## 🎯 **Best Practices**

1. **Start small** - test with 1-2 URLs first
2. **Be respectful** - don't scrape too frequently
3. **Check results** - verify the scraped content
4. **Update regularly** - keep knowledge base fresh
5. **Monitor usage** - check if scraping is working

## 🔄 **Update Your AI**

After scraping:
1. **Check** `server/knowledge_base.md` for new content
2. **Restart your server**: `npm start`
3. **Test the AI** with questions about the scraped content
4. **Verify responses** are more detailed and accurate

## 📞 **Need Help?**

If scraping doesn't work:
1. **Check the URLs** are correct and accessible
2. **Try with a different Notion page** first
3. **Look at the console output** for error messages
4. **Make sure you have internet connection**

The goal is to make your AI assistant super knowledgeable about 42 Heilbronn! 🎓✨
