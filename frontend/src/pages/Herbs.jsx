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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Herbs</h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search herbs..."
          className="border rounded px-3 py-2 w-64"
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((h) => (
          <Card key={h.id} className="p-4">
            <h3 className="text-lg font-medium">{h.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">{h.scientific_name}</p>
            <p className="mt-2 text-sm">Taste: {h.taste_signature}</p>
            {h.uses && <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Uses: {h.uses}</p>}
          </Card>
        ))}
      </div>
    </div>
  )
}


