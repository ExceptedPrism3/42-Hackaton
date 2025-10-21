import React, { useState, useRef, useEffect } from 'react';
import Message from './Message.jsx';

export default function ChatWindow({ messages, setMessages, isOnline }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  async function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/42butler/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      
      if (!res.ok) {
        // Try to get error details from server
        try {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Server error');
        } catch {
          throw new Error(`Server error: ${res.status}`);
        }
      }
      
      const data = await res.json();
      setMessages([...nextMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error('Chat error:', err);
      
      // Provide better error messages based on the error type
      let errorMessage = '';
      
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = `🔧 **42Botler is currently offline.**

I'm temporarily unable to connect to my server, but here's some essential 42 Heilbronn information:

**📚 Campus Essentials:**
• **Hours**: Open 24/7 for coding sessions
• **Coffee**: Free machine in the ground floor lounge
• **WiFi**: Campus-wide high-speed internet
• **Study Areas**: Multiple floors with comfortable seating

**💻 Academic Tools:**
• **Norminette**: Run \`norminette\` to check coding standards
• **Moulinette**: Automated project grading system
• **Intranet**: Access via campus computers
• **Peer Evaluation**: Submit through the intranet

**🎯 I specialize in 42 Heilbronn topics only.** For general questions, please use Google.

Please try again in a few moments, or contact campus staff for immediate assistance! 🚀`;
      } else if (err.message.includes('Server error: 500')) {
        errorMessage = `⚡ **42Botler is experiencing technical difficulties.**

My server is temporarily overwhelmed, but I can still provide basic 42 Heilbronn information:

**🏫 Quick Campus Guide:**
• **Hours**: Open 24/7 - the cluster never sleeps!
• **Coffee**: Free machine in the ground floor lounge
• **Tools**: Use \`norminette\` for code standards
• **Grading**: Moulinette handles project evaluation

**🎯 I focus on 42 Heilbronn topics only.** For general questions, please use Google.

Try again in a few minutes, or contact 42 Heilbronn staff for immediate help! 🤝`;
      } else {
        errorMessage = `🔧 **42Botler is temporarily unavailable.**

I'm working to get back online, but here's some essential 42 Heilbronn information:

**📚 Campus Information:**
• **Hours**: Open 24/7 for coding
• **Coffee**: Free machine in ground floor lounge
• **Tools**: Use \`norminette\` for code standards
• **Grading**: Moulinette handles project evaluation

**🎯 I specialize in 42 Heilbronn topics only.** For general questions, please use Google.

Please try again in a few moments, or contact campus staff for immediate help! 🚀`;
      }
      
      setMessages([
        ...nextMessages,
        { role: 'assistant', content: errorMessage },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl flex flex-col h-[calc(100vh-150px)] overflow-hidden relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-gray-50/30 to-white/50">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome to 42Botler AI
            </h3>
            <p className="text-gray-600 text-sm mb-3 max-w-md mx-auto">
              Ask me anything about campus life, coding standards, or general 42 questions.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 max-w-xl mx-auto">
              <div>
                <h4 className="text-xs font-semibold text-amber-800 mb-1">⚠️ Development Mode</h4>
                <p className="text-xs text-amber-700">
                  This AI is still in development. Please <strong>always verify information with your peers</strong> and official sources. 
                  Report any incorrect information using the following{' '}
                  <button 
                    onClick={() => window.open('https://github.com/ExceptedPrism3/42-Hackaton/issues/new?title=Bug Report: False Information&body=Please describe the incorrect information you found and what the correct information should be.', '_blank')}
                    className="text-amber-800 underline hover:text-amber-900 font-semibold"
                  >
                    button
                  </button>.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto">
              <button 
                onClick={() => setInput("What are the opening hours?")}
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-3 text-left hover:bg-blue-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors text-sm">
                    📅
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-xs">Opening hours</div>
                    <div className="text-xs text-gray-500">Campus schedule</div>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => setInput("Can I eat at mensa?")}
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-3 text-left hover:bg-green-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors text-sm">
                    🍽️
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-xs">Mensa</div>
                    <div className="text-xs text-gray-500">Food & dining</div>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => setInput("Tell me about norminette")}
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-3 text-left hover:bg-purple-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors text-sm">
                    🔍
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-xs">Norminette help</div>
                    <div className="text-xs text-gray-500">Coding standards</div>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => setInput("Bash commands for Ubuntu")}
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-3 text-left hover:bg-orange-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors text-sm">
                    💻
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-xs">Bash commands</div>
                    <div className="text-xs text-gray-500">Ubuntu terminal</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
        
        {messages.map((m, idx) => (
          <Message key={idx} role={m.role} content={m.content} />
        ))}
        
        {isLoading && (
          <div className="flex items-center justify-center space-x-3 py-8">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-gray-600 font-medium">AI is thinking...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white/90 backdrop-blur-sm border-t border-gray-200/30 p-5">
        <form onSubmit={handleSend} className="flex gap-4">
          <div className="flex-1 relative">
            <input
              className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 pr-16 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
              placeholder="Ask about 42 Heilbronn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white p-3 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <svg className={`w-6 h-6 transition-transform duration-500 ease-in-out ${input.trim() ? '-rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


