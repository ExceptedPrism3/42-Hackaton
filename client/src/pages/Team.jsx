import React from 'react';

const team = [
  {
    name: '42Butler Team',
    role: 'Creators',
    avatar: '🧠',
    bio: 'Building helpful tools for 42 Heilbronn students with care and craft.',
    links: [
      { label: 'GitHub', href: 'https://github.com/ExceptedPrism3/42-Hackaton' },
    ],
  },
];

export default function Team() {
  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Meet the Team</h2>
      <p className="text-gray-600 mt-2">We’re a small group focused on student experience and practical tools.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {team.map((member) => (
          <div key={member.name} className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 flex items-center justify-center text-2xl text-white">
                <span>{member.avatar}</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{member.name}</div>
                <div className="text-sm text-gray-600">{member.role}</div>
              </div>
            </div>
            <p className="text-gray-600 mt-4">{member.bio}</p>
            <div className="mt-4 flex space-x-3">
              {member.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


