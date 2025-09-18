import { useEffect, useState } from 'react'
import { resultsService } from '../services/api'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Results() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    resultsService
      .list()
      .then(setItems)
      .catch(() => setError('Failed to load results'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="container-page section">
      <h2 className="text-2xl font-semibold mb-6 tracking-tight">Test Results</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 gap-6">
        {items.map((item) => {
          const data = Array.isArray(item.raw_data) ? item.raw_data : []
          return (
            <div key={item._id || item.id} className="card-surface p-5">
              <p className="mb-3 font-medium">{item.title || `Result ${item._id || item.id}`}</p>
              <div className="w-full h-64">
                <ResponsiveContainer>
                  <LineChart data={data}>
                    <Line type="monotone" dataKey="value" stroke="#0ea5e9" dot={false} strokeWidth={2} />
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
                    <XAxis dataKey="x" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}


