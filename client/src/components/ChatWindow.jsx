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
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setMessages([...nextMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages([
        ...nextMessages,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
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
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Welcome to 42Butler AI
            </h3>
            <p className="text-gray-600 text-base mb-6 max-w-md mx-auto">
              Ask me anything about campus life, coding standards, or general 42 questions.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button 
                onClick={() => setInput("What are the opening hours?")}
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 text-left hover:bg-blue-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    📅
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Opening hours</div>
                    <div className="text-sm text-gray-500">Campus schedule info</div>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => setInput("Tell me about norminette")}
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 text-left hover:bg-purple-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    🔍
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Norminette help</div>
                    <div className="text-sm text-gray-500">Coding standards</div>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => setInput("Where is the coffee machine?")}
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 text-left hover:bg-cyan-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                    ☕
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Coffee machine</div>
                    <div className="text-sm text-gray-500">Campus amenities</div>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => setInput("What is moulinette?")}
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 text-left hover:bg-pink-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                    🤖
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Moulinette info</div>
                    <div className="text-sm text-gray-500">Grading system</div>
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
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white p-3 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${input.trim() ? 'animate-pulse' : ''}`}
            >
              <svg className={`w-6 h-6 transition-transform duration-300 ${input.trim() ? '-rotate-12' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


