![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-orange.svg)

# 42Botler

A modern, intelligent chatbot designed specifically for 42 Heilbronn students. Built with React, Node.js, and OpenAI integration, it provides instant answers about campus life, coding standards, and student resources.

## ✨ Features

- 🤖 **AI-Powered**: Uses OpenAI GPT-3.5-turbo for intelligent responses
- 🎯 **42-Specific**: Focused only on 42 Heilbronn topics (redirects general questions to Google)
- 📚 **Knowledge Base**: Comprehensive information scraped from official Notion pages
- 💬 **Modern Chat UI**: Beautiful, responsive interface with real-time messaging
- 🔄 **Auto-Updates**: Easy knowledge base updates from Notion content
- 📱 **Mobile-Friendly**: Works perfectly on all devices
- 🛡️ **Content Filtering**: Automatically filters inappropriate language
- 🔗 **Smart Links**: Clickable links for Google, search engines, and 42 Heilbronn
- 📝 **Markdown Support**: Bold text, code blocks, and formatted messages
- ⚠️ **Development Mode**: Clear disclaimer about AI being in development
- 🐛 **Bug Reporting**: Easy bug report button for false information
- 🎨 **Animated UI**: Smooth animations and hover effects
- 📊 **Error Handling**: Graceful fallback messages when server is down

## 🏗️ Project Structure

```
/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/        # Chat components
│   │   │   ├── ChatWindow.jsx # Main chat interface
│   │   │   └── Message.jsx    # Message bubbles
│   │   ├── App.jsx           # Main app component
│   │   └── index.css         # Tailwind styles
│   ├── index.html
│   └── package.json
└── server/                   # Node.js Backend
    ├── knowledge_base.md     # AI knowledge source
    ├── .env                 # Environment variables
    ├── server.js            # Express server
    ├── scraper.js           # Notion content scraper
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **OpenAI API key** (get from [OpenAI Platform](https://platform.openai.com/))

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure OpenAI API

1. **Get your OpenAI API key** from [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. **Edit `server/.env`** and add your API key:
```bash
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

### 3. Run the Application

**Terminal 1 - Start the Backend:**
```bash
cd server
npm start
```
✅ Server runs on `http://localhost:3001`

**Terminal 2 - Start the Frontend:**
```bash
cd client
npm run dev
```
✅ Client runs on `http://localhost:5173`

### 4. Test Your AI Chatbot

1. **Open your browser** to `http://localhost:5173`
2. **Ask questions** like:
   - "What are the opening hours?"
   - "Tell me about norminette"
   - "How do I find housing?"
   - "What scholarships are available?"

## 📚 Knowledge Base Management

### Option 1: Manual Content Addition

Edit `server/knowledge_base.md` directly with your content:

```markdown
# 42 Heilbronn Knowledge Base

## Campus Information
- Opening hours: 24/7
- Location: [Your campus address]
- Contact: hello@42heilbronn.de

## Coding Standards
- Norminette rules and requirements
- Project submission guidelines
- Code quality standards
```

### Option 2: Comprehensive Data Scraping (Recommended)

Use the advanced scraper to automatically gather data from multiple sources:

```bash
cd scrapers
node run-scraper.js
```

**What it does:**
1. **🔍 Web Search**: Automatically searches for 42 Heilbronn information
2. **🌐 Website Scraping**: Scrapes official websites and relevant sources
3. **📋 Notion Integration**: Opens Safari for manual Notion content
4. **💾 Auto-Update**: Updates your knowledge base with all data

**Benefits:**
- ✅ **Comprehensive**: Gets data from multiple sources automatically
- ✅ **Smart**: Uses web search to find relevant information
- ✅ **Flexible**: Combines automated and manual methods
- ✅ **Organized**: Structures data for optimal AI performance

### Option 3: Manual Content Addition

Edit `server/knowledge_base.md` directly with your content:

```markdown
# 42 Heilbronn Knowledge Base

## Campus Information
- Opening hours: 24/7
- Location: [Your campus address]
- Contact: hello@42heilbronn.de
```

## 🎨 Customization

### Styling the Chat Interface

**Colors and Themes:**
- Edit `client/src/index.css` for global styles
- Modify `client/src/components/ChatWindow.jsx` for chat layout
- Update `client/src/components/Message.jsx` for message styling

**Example customizations:**
```css
/* Custom gradient background */
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Custom message bubbles */
.message-user {
  background: linear-gradient(135deg, #42b883, #35495e);
}
```

### AI Behavior

**Modify AI responses** in `server/server.js`:

```javascript
const systemPrompt = `You are a specialized AI assistant for 42 Heilbronn students.
- ONLY answer questions about 42 Heilbronn, coding, campus life
- Redirect general questions to Google
- Be helpful and friendly but stay focused on 42 topics`;
```

## 🔧 Development

### Available Scripts

**Server:**
```bash
npm start          # Start production server
node server.js     # Alternative start method
```

**Client:**
```bash
npm run dev        # Development with hot reload
npm run build      # Build for production
npm run preview    # Preview production build
```

### API Endpoints

- `GET /api/health` - Server health check
- `GET /api/knowledge-base` - View current knowledge base
- `POST /api/chat` - Chat with the AI

### Environment Variables

**Server (.env):**
```bash
OPENAI_API_KEY=sk-your-key-here    # Required: Your OpenAI API key
PORT=3001                          # Optional: Server port (default: 3001)
```

## 🐛 Troubleshooting

### Common Issues

**1. "OpenAI API key not configured"**
```bash
# Check your .env file
cat server/.env
# Should show: OPENAI_API_KEY=sk-your-actual-key
```

**2. "Failed to process chat request"**
- ✅ Check OpenAI API key is valid
- ✅ Ensure you have credits in your OpenAI account
- ✅ Check server console for error details

**3. Client not connecting to server**
- ✅ Verify server is running on port 3001
- ✅ Check browser console for network errors
- ✅ Ensure both servers are running

**4. Knowledge base not updating**
- ✅ Restart server after updating knowledge_base.md
- ✅ Check file permissions
- ✅ Verify markdown format is correct

### Debug Commands

```bash
# Check server health
curl http://localhost:3001/api/health

# View knowledge base content
curl http://localhost:3001/api/knowledge-base

# Check server logs
cd server && npm start
```

## 🚀 Deployment

### Local Development
- Both servers run locally
- Perfect for development and testing

### Production Deployment
- Deploy server to cloud platform (Heroku, Vercel, etc.)
- Deploy client to static hosting (Netlify, Vercel, etc.)
- Update API URLs in client code
- Set environment variables in production

### Docker Deployment
```dockerfile
# Dockerfile example
FROM node:18
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ .
EXPOSE 3001
CMD ["npm", "start"]
```

## 📊 Performance

- **Fast Response**: Optimized for quick AI responses
- **Efficient Scraping**: Smart content extraction from Notion
- **Responsive UI**: Smooth animations and interactions
- **Error Handling**: Graceful fallbacks for API issues

## 🔒 Security

- **API Key Protection**: Never commit .env files
- **Input Validation**: Sanitized user inputs
- **Rate Limiting**: Consider adding for production
- **CORS Configuration**: Properly configured for development

## 📚 Learning Resources

- **42 Heilbronn**: [Official Website](https://42heilbronn.de)
- **OpenAI API**: [Documentation](https://platform.openai.com/docs)
- **React**: [Official Docs](https://reactjs.org/docs)
- **Tailwind CSS**: [Documentation](https://tailwindcss.com/docs)

## 🛡️ Content Safety

### Inappropriate Language Filtering

The bot automatically filters inappropriate language and responds professionally:

- **Profanity Detection**: Filters common inappropriate words
- **Professional Response**: Redirects to 42 topics when inappropriate content is detected
- **Respectful Communication**: Maintains professional tone throughout

### Development Disclaimer

⚠️ **Important**: This AI is still in development. Users are reminded to:
- Always verify information with peers
- Check official sources for critical information
- Report any incorrect information using the bug report button

## 🐛 Bug Reporting

### How to Report Issues

1. **Click the "🐛 Report Bug" button** in the footer
2. **Fill out the GitHub issue form** with:
   - Description of the incorrect information
   - What the correct information should be
   - Any additional context

### What Gets Fixed

- ❌ **False Information**: Incorrect campus details, hours, procedures
- 🔧 **Technical Issues**: Server errors, UI problems, broken links
- 📝 **Content Updates**: Outdated information, missing details
- 🎯 **42-Specific Issues**: Anything related to 42 Heilbronn accuracy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- **Issues**: Create a GitHub issue
- **Questions**: Contact the development team
- **42 Heilbronn**: hello@42heilbronn.de

## 🎯 Roadmap

- [ ] User authentication system
- [ ] Conversation history persistence
- [ ] File upload for knowledge base
- [ ] Advanced Notion integration
- [ ] Mobile app version
- [ ] Multi-language support

---

**Built with ❤️ for 42 Heilbronn students**

*Empowering students with intelligent assistance for campus life and coding education.*
