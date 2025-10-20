import React, { useState } from 'react';

const BashCommand = ({ command, description, example }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-green-400 font-mono text-sm">$</span>
            <code className="text-white font-mono text-sm bg-gray-800 px-2 py-1 rounded">
              {command}
            </code>
          </div>
          {description && (
            <p className="text-gray-300 text-sm mb-2">{description}</p>
          )}
          {example && (
            <div className="mt-2">
              <p className="text-gray-400 text-xs mb-1">Example:</p>
              <code className="text-blue-300 font-mono text-xs bg-gray-800 px-2 py-1 rounded block">
                {example}
              </code>
            </div>
          )}
        </div>
        <button
          onClick={() => copyToClipboard(command)}
          className={`ml-3 px-3 py-1 rounded text-xs font-medium transition-colors ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default BashCommand;
