import React, { useState, useEffect } from 'react';

// Simple markdown renderer for typewriter effect
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

export default function TypewriterText({ text, speed = 30, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div className="whitespace-pre-wrap text-base leading-relaxed">
      {renderMarkdown(displayedText)}
      {isTyping && (
        <span className="inline-block w-2 h-5 bg-gray-600 ml-1 animate-pulse"></span>
      )}
    </div>
  );
}
