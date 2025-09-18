import { useEffect, useMemo, useState } from 'react'
import { herbsService } from '../services/api'
import Card from '../components/ui/Card'

export default function Herbs() {
  const [herbs, setHerbs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    setLoading(true)
    herbsService
      .list()
      .then(setHerbs)
      .catch(() => setError('Failed to load herbs'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return herbs.filter((h) =>
      [h.name, h.scientific_name, h.taste_signature, h.uses]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    )
  }, [herbs, query])

  return (
    <section className="container-page section">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Herbs</h2>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search herbs..."
            className="input-field w-72"
          />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((h) => (
          <Card key={h._id || h.id} className="card-surface p-5">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold">{h.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 italic">{h.scientific_name}</p>
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <p><span className="text-gray-500">Taste:</span> {h.taste_signature}</p>
              {h.uses && <p className="text-gray-700 dark:text-gray-300"><span className="text-gray-500">Uses:</span> {h.uses}</p>}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}


