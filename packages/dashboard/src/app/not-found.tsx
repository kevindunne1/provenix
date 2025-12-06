import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
        <p className="text-2xl text-neutral-700 mb-8">Whatever you were looking for has no provenance.</p>
        <Link
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-hover transition-colors font-medium"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
