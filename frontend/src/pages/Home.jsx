import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function Home() {
  return (
    <div>
      <section className="container-page section">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">E‑Tongue for Herbs</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">Explore herbal taste signatures and analyze E‑Tongue test results in a clean, modern interface designed for focus and clarity.</p>
            <div className="flex items-center gap-3">
              <Link to="/herbs" className="btn-primary">Explore Herbs</Link>
              <Link to="/results" className="btn-muted">View Tests</Link>
            </div>
          </div>
          <div className="card-surface p-6">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 grid place-items-center text-sm text-gray-600 dark:text-gray-300">
              Preview Area
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Visualize taste signatures and raw data trends with interactive charts.</p>
          </div>
        </div>
      </section>
    </div>
  )
}


