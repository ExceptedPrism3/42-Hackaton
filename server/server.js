const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3001;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// Read knowledge base
function getKnowledgeBase() {
  try {
    const kbPath = path.join(__dirname, 'knowledge_base.md');
    return fs.readFileSync(kbPath, 'utf8');
  } catch (error) {
    console.error('Error reading knowledge base:', error);
    return '';
  }
}

// Basic health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Expose knowledge base for debugging (non-sensitive)
app.get('/api/knowledge-base', (_req, res) => {
  try {
    const content = getKnowledgeBase();
    res.type('text/markdown').send(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read knowledge base' });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Check if API key is configured and has quota
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'YOUR_API_KEY_HERE') {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in .env file.' 
      });
    }

    const knowledgeBase = getKnowledgeBase();
    
    try {
      const systemPrompt = `You are a specialized AI assistant ONLY for 42 Heilbronn students. 

IMPORTANT RULES:
- ONLY answer questions about 42 Heilbronn, 42 school, coding standards, campus life, or 42-specific topics
- If asked about general topics (weather, news, general programming, etc.), politely redirect them to Google
- Use this knowledge base about 42 Heilbronn:

${knowledgeBase}

- Be helpful and friendly but stay focused on 42 Heilbronn topics only
- If someone asks about non-42 topics, say: "I'm specialized for 42 Heilbronn questions only. For general topics, please use Google or other search engines."`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const reply = completion.choices[0].message.content;
      res.json({ reply });
    } catch (apiError) {
      // If API fails due to quota, provide intelligent fallback responses
      if (apiError.code === 'insufficient_quota' || apiError.status === 429) {
        const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
        let fallbackReply = '';
        
        if (userMessage.includes('opening') || userMessage.includes('hours')) {
          fallbackReply = `🕒 **Opening Hours**: The 42 Heilbronn cluster is open 24/7, so you can code anytime! The campus never sleeps, just like your dedication to learning. 💪`;
        } else if (userMessage.includes('coffee') || userMessage.includes('machine')) {
          fallbackReply = `☕ **Coffee Machine**: Located in the lounge area on the ground floor - it's completely free! Perfect for those late-night coding sessions. The coffee is surprisingly good for a free machine! ☕`;
        } else if (userMessage.includes('norminette')) {
          fallbackReply = `🔍 **Norminette**: Your coding standard checker! Run \`norminette\` on your files to check compliance. It's strict but fair - follow the 42 coding standards and you'll be fine. Remember: clean code is good code! 📝`;
        } else if (userMessage.includes('moulinette')) {
          fallbackReply = `🤖 **Moulinette**: The automated grading system that evaluates your projects. It's merciless but fair - if your code works and follows standards, you'll pass. No shortcuts, just solid programming! ⚡`;
        } else if (userMessage.includes('help') || userMessage.includes('question')) {
          fallbackReply = `🤝 **I'm here to help with 42 Heilbronn questions!** While my AI quota is currently exceeded, I can still provide basic campus info:

• **Campus**: Open 24/7 for coding
• **Coffee**: Free machine in the lounge  
• **Norminette**: Run \`norminette\` for code standards
• **Moulinette**: Automated grading system

**Note**: I specialize in 42 Heilbronn topics only. For general questions, please use Google! 🔍`;
        } else if (userMessage.includes('weather') || userMessage.includes('news') || userMessage.includes('general') || userMessage.includes('google')) {
          fallbackReply = `🎯 **I'm specialized for 42 Heilbronn questions only!** 

For general topics like weather, news, or other non-42 questions, please use Google or other search engines. 

I'm here to help with:
• 42 Heilbronn campus info
• Coding standards (norminette)
• Project grading (moulinette) 
• Campus life and facilities

What 42-related question can I help you with? 🎓`;
        } else {
          fallbackReply = `👋 **Hello!** I'm the 42 Heilbronn AI Assistant. While my advanced AI features are temporarily unavailable, I can still help with campus information:

• Campus is open 24/7
• Free coffee in the lounge
• Use \`norminette\` for code standards  
• Moulinette handles project grading

**I specialize in 42 Heilbronn topics only.** For general questions, please use Google! 

What would you like to know about 42 Heilbronn? 🎓`;
        }
        
        return res.json({ reply: fallbackReply });
      }
      
      throw apiError; // Re-throw if it's not a quota error
    }

  } catch (error) {
    console.error('Chat error:', error);
    
    // Handle quota exceeded or API errors gracefully
    if (error.code === 'insufficient_quota' || error.status === 429) {
      const fallbackReply = `I'm currently experiencing high demand and my API quota has been exceeded. 
      
However, I can still help you with basic information about 42 Heilbronn:

- **Opening Hours**: The cluster is open 24/7
- **Coffee**: Free coffee machine in the lounge area on the ground floor
- **Norminette**: Run \`norminette\` on your files to check coding standards
- **Moulinette**: The automated grading system for your projects

Please try again later or contact the 42 Heilbronn staff for immediate assistance.`;
      
      return res.json({ reply: fallbackReply });
    }
    
    res.status(500).json({ 
      error: 'Failed to process chat request',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log(`Health check: http://localhost:${port}/api/health`);
});


