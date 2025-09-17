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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Test Results</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-8">
        {items.map((item) => {
          const data = Array.isArray(item.raw_data) ? item.raw_data : []
          return (
            <div key={item.id} className="w-full h-64">
              <p className="mb-2 font-medium">{item.title || `Result ${item.id}`}</p>
              <ResponsiveContainer>
                <LineChart data={data}>
                  <Line type="monotone" dataKey="value" stroke="#2563eb" dot={false} />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )
        })}
      </div>
    </div>
  )
}


