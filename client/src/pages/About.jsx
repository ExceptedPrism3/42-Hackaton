import React from 'react';

export default function About() {
  return (
    <div className="relative">
      <div className="mb-8 rounded-3xl overflow-hidden border border-white/40 bg-white/70 backdrop-blur-xl">
        <div className="p-10 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">About 42Botler</h2>
          <p className="mt-2 text-blue-50 max-w-3xl mx-auto">Your 42 Heilbronn companion for campus info, project guidance, and workflows — laser-focused on 42 content to keep you productive.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 p-8">
          <div className="p-6 rounded-2xl bg-white/90 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900">Purpose</h3>
            <p className="text-gray-600 mt-2">Fast, precise answers about campus, curriculum, projects, tools, and procedures.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/90 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900">Tech Stack</h3>
            <p className="text-gray-600 mt-2">React, Vite, Tailwind CSS, Node.js, Express, OpenAI, and custom scraping.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/90 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900">Scope</h3>
            <p className="text-gray-600 mt-2">42-only content. Outside scope? We direct you to Google instead.</p>
          </div>
        </div>
        <div className="px-8 pb-8">
          <div className="flex flex-wrap items-center justify-center gap-4 opacity-90">
            <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className="h-8 w-8" />
            <img src="https://cdn.simpleicons.org/vite/646CFF" alt="Vite" className="h-8 w-8" />
            <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind" className="h-8 w-8" />
            <img src="https://cdn.simpleicons.org/nodedotjs/5FA04E" alt="Node.js" className="h-8 w-8" />
            <img src="https://cdn.simpleicons.org/express/000000" alt="Express" className="h-8 w-8" />
            <img src="https://cdn.simpleicons.org/openai/412991" alt="OpenAI" className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40">
          <h3 className="font-semibold text-gray-800">How it works</h3>
          <ul className="mt-3 text-gray-600 list-disc pl-5 space-y-1">
            <li>Chat frontend sends messages to backend API</li>
            <li>Backend injects 42-specific knowledge base</li>
            <li>OpenAI generates focused responses</li>
            <li>Scrapers keep knowledge fresh</li>
          </ul>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-cyan-50 border border-white/40">
          <h3 className="font-semibold text-gray-800">What you can ask</h3>
          <ul className="mt-3 text-gray-600 list-disc pl-5 space-y-1">
            <li>Norminette, Moulinette, Piscine tips</li>
            <li>Campus hours, resources, and tools</li>
            <li>Project guidelines and peer evals</li>
            <li>Events, partnerships, and more</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


