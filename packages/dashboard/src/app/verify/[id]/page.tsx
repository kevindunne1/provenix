'use client'

import { use, useEffect, useState } from 'react'

interface Manifest {
  content: string
  hash: string
  timestamp: string
  metadata?: Record<string, unknown>
  version: string
}

interface ManifestData {
  manifest: Manifest
  signature: string
  manifestId: string
  createdAt: string
}

export default function VerifyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [manifestData, setManifestData] = useState<ManifestData | null>(null)

  useEffect(() => {
    async function fetchManifest() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://provenixapi-production.up.railway.app'
        const response = await fetch(`${apiUrl}/api/v1/manifests/${id}`)

        if (!response.ok) {
          if (response.status === 404) {
            setError('Manifest not found. Please check the ID and try again.')
          } else {
            setError('Failed to load manifest. Please try again later.')
          }
          setLoading(false)
          return
        }

        const data = await response.json()
        setManifestData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load manifest')
      } finally {
        setLoading(false)
      }
    }

    fetchManifest()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-slate-600">Loading manifest...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h1 className="text-2xl font-bold text-slate-900">Verification Error</h1>
            </div>
            <p className="text-slate-600 mb-6">{error}</p>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-500">
                <strong>Manifest ID:</strong> <code className="bg-white px-2 py-1 rounded text-xs">{id}</code>
              </p>
            </div>
            <div className="mt-6">
              <a
                href="https://provenix.dev"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Provenix
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Success state (when API is implemented)
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Provenix Verification</h1>
          <p className="text-slate-600">Cryptographic provenance for text</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
          {manifestData && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Verification Details</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-slate-500">Manifest ID</span>
                    <p className="font-mono text-sm text-slate-900 bg-slate-50 p-2 rounded">{manifestData.manifestId}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500">Created</span>
                    <p className="text-slate-900">{new Date(manifestData.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500">Content Hash</span>
                    <p className="font-mono text-sm text-slate-900 bg-slate-50 p-2 rounded break-all">{manifestData.manifest.hash}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500">Signature</span>
                    <p className="font-mono text-xs text-slate-900 bg-slate-50 p-2 rounded break-all">{manifestData.signature}</p>
                  </div>
                </div>
              </div>

              {manifestData.manifest.metadata && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Metadata</h3>
                  <pre className="bg-slate-50 p-4 rounded-lg text-sm overflow-auto">
                    {JSON.stringify(manifestData.manifest.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>

        <div className="text-center text-sm text-slate-500">
          <p>
            Powered by <a href="https://provenix.dev" className="text-indigo-600 hover:text-indigo-700">Provenix</a> — Deterministic provenance, not probabilistic detection
          </p>
        </div>
      </div>
    </div>
  )
}
