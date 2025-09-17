import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">E‑Tongue for Herbs</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Explore herbal taste signatures and test results with a modern E‑Tongue platform.</p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/herbs"><Button>Explore Herbs</Button></Link>
          <Link to="/results"><Button className="bg-gray-900 hover:bg-gray-800">View Tests</Button></Link>
        </div>
      </div>
    </div>
  )
}


