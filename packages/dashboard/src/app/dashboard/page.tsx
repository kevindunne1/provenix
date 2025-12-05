'use client'

import { useState, useEffect } from 'react'

interface ApiKey {
  id: string
  keyPrefix: string
  name?: string
  createdAt: string
  lastUsedAt?: string
}

export default function DashboardPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [newKey, setNewKey] = useState<string | null>(null)
  const [keyName, setKeyName] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://provenixapi-production.up.railway.app'

  useEffect(() => {
    // Get token from localStorage
    const storedToken = localStorage.getItem('provenix_token')
    setToken(storedToken)

    if (storedToken) {
      fetchKeys(storedToken)
    } else {
      window.location.href = '/login'
    }
  }, [])

  async function fetchKeys(authToken: string) {
    try {
      const response = await fetch(`${API_URL}/api/v1/keys`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setKeys(data)
      } else if (response.status === 401) {
        localStorage.removeItem('provenix_token')
        window.location.href = '/login'
      }
    } catch (err) {
      console.error('Failed to fetch keys:', err)
    }
  }

  async function createKey() {
    if (!token) return

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/v1/keys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: keyName || undefined,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setNewKey(data.key) // Show the key once
        setKeyName('')
        fetchKeys(token) // Refresh list
      }
    } catch (err) {
      console.error('Failed to create key:', err)
    } finally {
      setLoading(false)
    }
  }

  async function deleteKey(id: string) {
    if (!token || !confirm('Are you sure you want to revoke this API key?')) return

    try {
      const response = await fetch(`${API_URL}/api/v1/keys/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchKeys(token) // Refresh list
      }
    } catch (err) {
      console.error('Failed to delete key:', err)
    }
  }

  function logout() {
    localStorage.removeItem('provenix_token')
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">API Keys</h1>
            <p className="text-slate-600 mt-2">Manage your Provenix API keys</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 transition"
          >
            Logout
          </button>
        </div>

        {/* New Key Display */}
        {newKey && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              ✅ API Key Created Successfully
            </h3>
            <p className="text-sm text-green-800 mb-4">
              Copy this key now - it won't be shown again!
            </p>
            <div className="bg-white rounded border border-green-300 p-4 font-mono text-sm break-all">
              {newKey}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(newKey)
                alert('Copied to clipboard!')
              }}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={() => setNewKey(null)}
              className="mt-4 ml-2 px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition"
            >
              Done
            </button>
          </div>
        )}

        {/* Create Key Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Create New API Key</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Key name (optional)"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={createKey}
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {loading ? 'Creating...' : 'Create Key'}
            </button>
          </div>
        </div>

        {/* Keys List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Your API Keys</h2>
          </div>

          {keys.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-500">
              No API keys yet. Create one to get started!
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {keys.map((key) => (
                <div key={key.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-sm text-slate-900">{key.keyPrefix}</div>
                    {key.name && (
                      <div className="text-sm text-slate-600 mt-1">{key.name}</div>
                    )}
                    <div className="text-xs text-slate-500 mt-1">
                      Created: {new Date(key.createdAt).toLocaleDateString()}
                      {key.lastUsedAt && (
                        <span className="ml-3">
                          Last used: {new Date(key.lastUsedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteKey(key.id)}
                    className="px-4 py-2 text-red-600 hover:text-red-800 font-medium transition"
                  >
                    Revoke
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Start Guide */}
        <div className="mt-8 bg-indigo-50 rounded-xl border border-indigo-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Quick Start</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto">
{`npm install @provenix/sdk

import { ProvenixClient } from '@provenix/sdk'

const client = new ProvenixClient({
  apiKey: 'YOUR_API_KEY',
  baseUrl: '${API_URL}'
})

const result = await client.sign('Your text here')
console.log(result.verificationUrl)`}
          </pre>
          <a
            href="/docs"
            className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View Full Documentation →
          </a>
        </div>
      </div>
    </div>
  )
}
