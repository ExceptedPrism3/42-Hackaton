import React from 'react';

const team = [
  { name: 'sabo-gla', role: 'Digital', avatarUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=2' },
  { name: 'aben-cad', role: 'Backend', avatarUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=1' },
  { name: 'spostica', role: 'Digital', avatarUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=3' },
  { name: 'ameine', role: 'Data', avatarUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=4' },
  { name: 'rreimann', role: 'Data', avatarUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=5' },
  { name: 'ekypraio', role: 'Data', avatarUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=6' },
];

export default function Team() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Meet the Team</h2>
      <p className="text-gray-600 mt-2">We're a team of six focused on student experience and practical tools.</p>

      <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-6">
        {team.map((member, idx) => (
          <div key={member.name} className={`group p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-[1.02]`}>
            <div className={`flex flex-col items-center text-center animate-float-slow`} style={{animationDelay: `${idx * 0.15}s`}}>
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-md">
                <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="mt-3 font-semibold text-gray-900">{member.name}</div>
              <div className="text-sm text-gray-600">{member.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


