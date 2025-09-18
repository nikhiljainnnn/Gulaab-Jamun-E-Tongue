export default function About() {
  return (
    <section className="container-page section max-w-3xl">
      <h2 className="text-2xl font-semibold mb-3 tracking-tight">About</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Aushadhi Assure is a minimal, modern interface for exploring herbal taste signatures and reviewing E‑Tongue test results. It focuses on clarity, performance, and a clean visual language.</p>
      <div className="mt-6 card-surface p-5">
        <h3 className="font-medium mb-2">Stack</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>Frontend: React, Vite, TailwindCSS</li>
          <li>Backend: FastAPI</li>
          <li>Charts: Recharts</li>
        </ul>
      </div>
    </section>
  )
}


