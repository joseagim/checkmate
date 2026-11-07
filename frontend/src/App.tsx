import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-900 p-6 text-slate-100">
      <h1 className="text-5xl font-bold tracking-tight">
        Check<span className="text-emerald-400">Mate</span>
      </h1>
      <p className="max-w-md text-center text-slate-300">
        Vite + React + TypeScript + Tailwind CSS are working. The chessboard
        will come later.
      </p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded-lg bg-emerald-500 px-5 py-2 font-semibold text-slate-900 shadow transition hover:bg-emerald-400 active:scale-95"
      >
        Clicked {count} times
      </button>
      <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
        If you see this styled, Tailwind is OK
      </span>
    </main>
  )
}

export default App