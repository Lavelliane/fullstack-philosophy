const USERS = [
  { name: "Alice", role: "Designer" },
  { name: "Bob", role: "Engineer" },
];

function UserCardMini({ name, role }: { name: string; role: string }) {
  return (
    <div className="border-2 border-zinc-400 rounded-lg p-2 bg-white shrink-0 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-zinc-300 shrink-0" />
        <div>
          <div className="text-xs font-semibold text-zinc-800">{name}</div>
          <div className="text-[10px] text-zinc-600">{role}</div>
        </div>
      </div>
    </div>
  );
}

export default function ComponentsVisual() {
  return (
    <div className="flex flex-row gap-6 items-start justify-center flex-wrap max-w-4xl mx-auto">
      {/* Component: 2 users, 2 cards (loop) */}
      <div className="shrink-0 border-2 border-zinc-900 rounded-lg p-3 bg-zinc-900/5">
        <span className="inline-block font-mono text-xs bg-zinc-900 text-white px-2 py-1 tracking-widest mb-2 uppercase">
          Component
        </span>
        <div className="flex flex-wrap gap-2">
          {USERS.map((u) => (
            <UserCardMini key={u.name} name={u.name} role={u.role} />
          ))}
        </div>
        <p className="text-xs text-zinc-500 mt-2">users.map → 2 cards</p>
      </div>

      {/* Props: parent → child */}
      <div className="shrink-0 border-2 border-zinc-500 rounded-lg p-3 bg-zinc-500/5">
        <span className="inline-block font-mono text-xs bg-zinc-500 text-white px-2 py-1 tracking-widest mb-2 uppercase">
          Props
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="border-2 border-zinc-900 rounded-lg px-2 py-1.5 bg-zinc-100 shrink-0">
            <span className="text-xs font-mono font-semibold text-zinc-900">Parent</span>
            <p className="text-[10px] text-zinc-600">passes data</p>
          </div>
          <span className="text-zinc-500 text-base font-medium shrink-0">→</span>
          <div className="border-2 border-zinc-400 rounded-lg px-2 py-1.5 bg-white shrink-0">
            <span className="text-xs font-mono font-semibold text-zinc-800">Child</span>
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-2">pass down</p>
      </div>

      {/* Children: content between tags */}
      <div className="shrink-0 border-2 border-zinc-400 rounded-lg p-3 bg-zinc-400/10">
        <span className="inline-block font-mono text-xs bg-zinc-400 text-white px-2 py-1 tracking-widest mb-2 uppercase">
          Children
        </span>
        <div className="border-2 border-zinc-400 rounded p-2 bg-white font-mono text-[10px] text-zinc-700">
          <span className="text-zinc-400">&lt;Card&gt;</span>
          <span className="block pl-1 mt-0.5 text-zinc-800">content here</span>
          <span className="text-zinc-400">&lt;/Card&gt;</span>
        </div>
        <p className="text-xs text-zinc-500 mt-2">between tags</p>
      </div>

      {/* Compose: nested structure — last */}
      <div className="shrink-0 border-2 border-zinc-300 rounded-lg p-3 bg-zinc-200/50">
        <span className="inline-block font-mono text-xs bg-zinc-200 text-zinc-800 px-2 py-1 tracking-widest mb-2 uppercase">
          Compose
        </span>
        <div className="border-2 border-zinc-500 rounded-lg p-2 bg-zinc-100/80">
          <div className="flex flex-col gap-1.5">
            <div className="h-7 rounded border-2 border-zinc-400 bg-white px-3 flex items-center">
              <span className="text-xs font-mono font-medium text-zinc-700">NavBar</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {USERS.map((u) => (
                <div key={u.name} className="flex-1 min-w-[64px] border-2 border-zinc-400 rounded p-2 bg-white">
                  <span className="text-xs font-mono font-medium text-zinc-700">Card</span>
                  <div className="text-[10px] text-zinc-600">{u.name}</div>
                </div>
              ))}
            </div>
            <div className="h-7 rounded border-2 border-zinc-400 bg-white px-3 flex items-center">
              <span className="text-xs font-mono font-medium text-zinc-700">Footer</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-2">nested</p>
      </div>
    </div>
  );
}
