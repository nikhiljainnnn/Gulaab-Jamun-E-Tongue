import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-page section text-center">
      <h2 className="text-3xl font-semibold mb-2">Page not found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn-primary">Go home</Link>
    </section>
  )
}



