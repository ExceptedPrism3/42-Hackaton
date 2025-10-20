import React from 'react';

export default function About() {
  return (
    <div className="relative">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">About 42Butler</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">42Butler is a specialized AI assistant built for 42 Heilbronn students. It helps you find campus information, understand project requirements, and get guidance on 42-specific workflows. General questions are redirected to Google to keep the focus on 42 content.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow">
          <h3 className="font-semibold text-gray-800">Purpose</h3>
          <p className="text-gray-600 mt-2">Provide fast, precise answers about 42 Heilbronn: campus, curriculum, projects, tools, events, and procedures.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow">
          <h3 className="font-semibold text-gray-800">Tech Stack</h3>
          <p className="text-gray-600 mt-2">React + Vite + Tailwind CSS, Node.js + Express, OpenAI API, custom scraping for knowledge base updates.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow">
          <h3 className="font-semibold text-gray-800">Scope</h3>
          <p className="text-gray-600 mt-2">42-only content. If a question is outside scope, you’ll be guided to search via Google.</p>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-cyan-50 border border-white/40">
        <h3 className="font-semibold text-gray-800">How it works</h3>
        <ul className="mt-3 text-gray-600 list-disc pl-5 space-y-1">
          <li>Chat frontend sends messages to the backend API</li>
          <li>Backend injects 42-specific knowledge base</li>
          <li>OpenAI generates responses focused on 42 content</li>
          <li>Web/Notion scraping keeps the knowledge base fresh</li>
        </ul>
      </div>
    </div>
  );
}


