export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Provenix Dashboard</h1>
        <p className="text-gray-600 mb-8">
          AI detection is guesswork. Provenance is evidence.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">🚧 Under Construction</h2>
          <p className="text-gray-700">
            Dashboard implementation awaits discovery validation.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Features planned: API key management, usage stats, recent manifests
          </p>
        </div>
      </div>
    </main>
  )
}
