import React from 'react';

// Simple markdown renderer for basic formatting
function renderMarkdown(text) {
  if (!text) return '';
  
  // Split by lines to handle line breaks
  const lines = text.split('\n');
  
  return lines.map((line, index) => {
    // Handle bold text **text**
    let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle inline code `code`
    processedLine = processedLine.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
    
    // Handle clickable links for search engines
    processedLine = processedLine.replace(/Google/g, '<a href="https://www.google.com" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium">Google</a>');
    processedLine = processedLine.replace(/Bing/g, '<a href="https://www.bing.com" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium">Bing</a>');
    processedLine = processedLine.replace(/DuckDuckGo/g, '<a href="https://duckduckgo.com" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium">DuckDuckGo</a>');
    processedLine = processedLine.replace(/search engines/g, '<a href="https://www.google.com" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium">search engines</a>');
    
    // Handle other common links
    processedLine = processedLine.replace(/42 Heilbronn/g, '<a href="https://42heilbronn.de" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium">42 Heilbronn</a>');
    processedLine = processedLine.replace(/42 school/g, '<a href="https://42heilbronn.de" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium">42 school</a>');
    
    // Handle bullet points
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return (
        <div key={index} className="flex items-start">
          <span className="text-lg mr-2">•</span>
          <span dangerouslySetInnerHTML={{ __html: processedLine.replace(/^[•-]\s*/, '') }} />
        </div>
      );
    }
    
    // Handle regular lines
    return (
      <div key={index} dangerouslySetInnerHTML={{ __html: processedLine }} />
    );
  });
}

export default function Message({ role, content }) {
  const isUser = role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex items-start space-x-4 max-w-[90%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600' 
            : 'bg-gradient-to-br from-purple-500 via-purple-600 to-cyan-600'
        }`}>
          {isUser ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        
        {/* Message Content */}
        <div className={`rounded-3xl px-6 py-4 shadow-lg backdrop-blur-sm ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white' 
            : 'bg-white/90 border border-gray-200/50 text-gray-800'
        }`}>
          <div className="whitespace-pre-wrap text-base leading-relaxed">
            {renderMarkdown(content)}
          </div>
          <div className={`text-xs mt-3 font-medium ${
            isUser ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {isUser ? 'You' : 'AI Assistant'} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>
      </div>
    </div>
  );
}


