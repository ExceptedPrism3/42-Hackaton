![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)

# 42Botler

An AI-powered chatbot designed specifically for 42 Heilbronn students. Built with React, Node.js, and OpenAI GPT-3.5-turbo, it provides instant answers about campus life, coding standards, and student resources.

## Features

- **AI-Powered**: Uses OpenAI GPT-3.5-turbo for intelligent responses
- **42-Specific**: Focused on 42 Heilbronn topics (redirects general questions)
- **Knowledge Base**: Comprehensive information from official Notion pages
- **Modern UI**: Beautiful, responsive chat interface with real-time messaging
- **Auto-Updates**: Easy knowledge base updates from Notion content
- **Content Filtering**: Automatically filters inappropriate language
- **Markdown Support**: Rich text formatting with code blocks

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 42-Hackaton
   ```

2. **Install dependencies**
   ```bash
   # Server
   cd server
   npm install
   
   # Client
   cd ../client
   npm install
   ```

3. **Configure environment**
   
   Create `server/.env`:
   ```bash
   OPENAI_API_KEY=sk-your-api-key-here
   PORT=3001
   ```

4. **Run the application**
   
   **Option A: Use the run script**
   ```bash
   ./run.sh d  # Development mode
   ./run.sh p  # Production mode
   ```
   
   **Option B: Manual start**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm start
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

5. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`

## Project Structure

```
/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Chat components
│   │   └── pages/       # App pages
│   └── package.json
├── server/              # Node.js backend
│   ├── server.js        # Express server
│   ├── knowledge_base.md # AI knowledge source
│   └── package.json
└── scrapers/            # Data collection tools
    ├── run-scraper.js   # Main scraper script
    └── README.md        # Scraper documentation
```

## Knowledge Base Management

### Option 1: Manual Edit

Edit `server/knowledge_base.md` directly with your content.

### Option 2: Automated Scraping (Recommended)

Use the scraper to automatically gather data from multiple sources:

```bash
cd scrapers
node run-scraper.js
```

This will:
- Search the web for 42 Heilbronn information
- Scrape official websites
- Allow manual Notion content extraction
- Update the knowledge base automatically

See `scrapers/README.md` for detailed scraper documentation.

## API Endpoints

- `GET /api/health` - Server health check
- `GET /api/knowledge-base` - View current knowledge base
- `POST /api/chat` - Chat with the AI

## Development

### Available Scripts

**Server:**
```bash
npm start          # Start server
```

**Client:**
```bash
npm run dev        # Development with hot reload
npm run build      # Build for production
npm run preview    # Preview production build
```

### Environment Variables

**Server (`server/.env`):**
```bash
OPENAI_API_KEY=sk-your-key-here    # Required
PORT=3001                          # Optional (default: 3001)
```

## Deployment

### Production Build

```bash
cd client
npm run build
```

The build automatically detects deployment environment:
- **Local dev**: Uses root path `/`
- **Production**: Uses subdirectory path `/42botler/`

### Server Deployment

1. **Build the client**
   ```bash
   cd client && npm run build
   ```

2. **Set up environment variables** on your server

3. **Configure web server** (Nginx/Apache) to:
   - Serve static files from `client/dist` at `/42botler/`
   - Proxy `/api/*` requests to `http://localhost:3001`

4. **Run the server** (use PM2 or similar):
   ```bash
   cd server && npm start
   ```

For detailed deployment instructions, see the [Deployment Guide](#deployment-guide) section below.

## Troubleshooting

**OpenAI API key not configured**
- Verify `server/.env` exists and contains `OPENAI_API_KEY`

**Client not connecting to server**
- Ensure server is running on port 3001
- Check browser console for CORS errors

**Knowledge base not updating**
- Restart server after editing `knowledge_base.md`
- Verify file permissions

**Check server health:**
```bash
curl http://localhost:3001/api/health
```

## Security

- Store API keys in environment variables (never commit `.env`)
- Use HTTPS in production
- Configure CORS for production domains
- Implement rate limiting for production use

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Documentation

- **[USER_GUIDE.md](./USER_GUIDE.md)** - Complete user guide for end users
- **[scrapers/README.md](./scrapers/README.md)** - Scraper documentation

## License

MIT License - see [LICENSE](./LICENSE) file for details

---

**Built with ❤️ for 42 Heilbronn students**
