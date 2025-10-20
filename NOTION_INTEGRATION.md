# Notion Integration Guide for 42 Heilbronn AI

## 🎯 **Goal**: Import your Notion data to make the AI more knowledgeable about 42 Heilbronn

## 📋 **Method 1: Export from Notion (Recommended)**

### Step 1: Export Your Notion Pages
1. **Go to your Notion workspace**
2. **Select the pages** you want to export (42 Heilbronn related)
3. **Click the "..." menu** → **"Export"**
4. **Choose "Markdown & CSV"** format
5. **Download the files**

### Step 2: Convert to Knowledge Base
1. **Open the downloaded markdown files**
2. **Copy the content**
3. **Paste into** `server/knowledge_base.md`
4. **Restart the server**

## 🔧 **Method 2: Notion API (Advanced)**

### Step 1: Get Notion API Key
1. Go to [Notion Developers](https://www.notion.so/my-integrations)
2. **Create a new integration**
3. **Copy the "Internal Integration Token"**
4. **Add it to your server**

### Step 2: Update Server Code
Add this to your `server/package.json`:
```json
{
  "dependencies": {
    "@notionhq/client": "^2.2.0"
  }
}
```

### Step 3: Create Notion Integration
Create `server/notion.js`:
```javascript
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function getNotionData() {
  try {
    const response = await notion.databases.query({
      database_id: 'YOUR_DATABASE_ID',
    });
    
    // Process and return the data
    return response.results;
  } catch (error) {
    console.error('Notion API error:', error);
    return [];
  }
}

module.exports = { getNotionData };
```

### Step 4: Update Server
In `server/server.js`, add:
```javascript
const { getNotionData } = require('./notion');

// In your chat endpoint:
const notionData = await getNotionData();
const knowledgeBase = getKnowledgeBase() + '\n\n' + notionData;
```

## 🚀 **Method 3: Web Scraping (If Export Not Available)**

### Step 1: Install Scraping Tools
```bash
cd server
npm install puppeteer cheerio
```

### Step 2: Create Scraper
Create `server/scraper.js`:
```javascript
const puppeteer = require('puppeteer');

async function scrapeNotion(notionUrl) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(notionUrl);
  await page.waitForSelector('content');
  
  const content = await page.evaluate(() => {
    return document.querySelector('content').innerText;
  });
  
  await browser.close();
  return content;
}

module.exports = { scrapeNotion };
```

## 📝 **Method 4: Manual Content Addition**

### Step 1: Identify Key Information
Look for these topics in your Notion:
- **Campus rules and policies**
- **Project guidelines**
- **Coding standards**
- **Staff contact information**
- **Event schedules**
- **Facility information**

### Step 2: Format for Knowledge Base
Update `server/knowledge_base.md`:
```markdown
# 42 Heilbronn Knowledge Base

## Campus Information
- Opening hours: 24/7
- Location: [Your campus address]
- Contact: [Contact information]

## Coding Standards
- Norminette rules
- Project requirements
- Submission guidelines

## Staff Information
- [Staff names and roles]
- [Office hours]
- [Contact methods]

## Events and Activities
- [Upcoming events]
- [Regular activities]
- [Special programs]
```

## 🔄 **Automated Updates**

### Option 1: Cron Job
Set up a cron job to periodically update the knowledge base:
```bash
# Add to crontab
0 */6 * * * cd /path/to/server && node update-knowledge.js
```

### Option 2: Webhook Integration
Set up Notion webhooks to automatically update when content changes.

## 🎯 **Best Practices**

1. **Keep content focused** on 42 Heilbronn topics
2. **Update regularly** to keep information current
3. **Test responses** after adding new content
4. **Organize by categories** for better AI understanding
5. **Include contact information** for complex queries

## 🚨 **Important Notes**

- **Respect Notion's terms of service**
- **Don't expose sensitive information**
- **Test thoroughly** before deploying
- **Keep backups** of your knowledge base
- **Monitor API usage** if using Notion API

## 📞 **Need Help?**

If you need help with any of these methods, let me know:
1. **Which method** you prefer
2. **What type of content** you have in Notion
3. **Any specific challenges** you're facing

The goal is to make your AI assistant as knowledgeable as possible about 42 Heilbronn! 🎓
