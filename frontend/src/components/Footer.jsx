export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200/70 dark:border-gray-800">
      <div className="container-page py-8 text-sm text-gray-600 dark:text-gray-300 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Gulaab-Jamun E‑Tongue</p>
        <p className="text-gray-500">Built with React, Vite, Tailwind and FastAPI</p>
      </div>
    </footer>
  )
}


