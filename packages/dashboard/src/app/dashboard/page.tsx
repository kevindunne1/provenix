'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import UsageCard from '@/components/dashboard/UsageCard'
import FirstCallCelebration from '@/components/dashboard/FirstCallCelebration'
import ApiKeyCard from '@/components/dashboard/ApiKeyCard'

interface ApiKey {
  id: string
  keyPrefix: string
  name?: string
  createdAt: string
  lastUsedAt?: string
}

// TODO: Replace with real backend endpoint
interface UsageData {
  signing: { current: number; limit: number }
  verification: { current: number; limit: number }
  tier: string
}

export default function DashboardPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [newKey, setNewKey] = useState<string | null>(null)
  const [keyName, setKeyName] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  // TODO: Fetch from backend endpoint: GET /api/v1/usage
  const [usage] = useState<UsageData>({
    signing: { current: 127, limit: 200 }, // Mock data - Free tier
    verification: { current: 89, limit: 200 },
    tier: 'Free'
  })
  // const setUsage will be used when backend endpoint is ready

  // TODO: Backend should track first_api_call_success flag
  const [showCelebration, setShowCelebration] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://provenixapi-production.up.railway.app'

  useEffect(() => {
    const storedToken = localStorage.getItem('provenix_token')
    setToken(storedToken)

    if (storedToken) {
      fetchKeys(storedToken)
      // TODO: fetchUsage(storedToken)

      // Check if this is first time viewing dashboard after first API call
      const hasSeenCelebration = localStorage.getItem('provenix_seen_celebration')
      if (!hasSeenCelebration && usage.signing.current > 0) {
        setShowCelebration(true)
        localStorage.setItem('provenix_seen_celebration', 'true')
      }
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

  // TODO: Implement backend endpoint
  // async function fetchUsage(authToken: string) {
  //   try {
  //     const response = await fetch(`${API_URL}/api/v1/usage`, {
  //       headers: { 'Authorization': `Bearer ${authToken}` },
  //     })
  //     if (response.ok) {
  //       const data = await response.json()
  //       setUsage(data)
  //     }
  //   } catch (err) {
  //     console.error('Failed to fetch usage:', err)
  //   }
  // }

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
        setNewKey(data.key)
        setKeyName('')
        fetchKeys(token)
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
        fetchKeys(token)
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
      <FirstCallCelebration
        isFirstSuccess={showCelebration}
        onDismiss={() => setShowCelebration(false)}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-mono">Dashboard</h1>
            <p className="text-slate-600 mt-2">Monitor usage and manage API keys</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 transition font-medium"
          >
            Logout
          </button>
        </div>

        {/* Usage Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <UsageCard
            title="Signing Requests"
            current={usage.signing.current}
            limit={usage.signing.limit}
            label={`${usage.tier} Tier`}
          />
          <UsageCard
            title="Verification Requests"
            current={usage.verification.current}
            limit={usage.verification.limit}
            label={`${usage.tier} Tier`}
          />
        </div>

        {/* Upgrade CTA (if approaching limit) */}
        {(usage.signing.current / usage.signing.limit >= 0.8 ||
          usage.verification.current / usage.verification.limit >= 0.8) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary to-indigo-700 rounded-xl p-6 mb-8 text-white"
          >
            <h3 className="text-lg font-bold mb-2">Approaching Your Limit</h3>
            <p className="mb-4 opacity-90">
              Upgrade to Starter ($49/mo) for 5,000 requests and keep your app running smoothly.
            </p>
            <a
              href="/pricing"
              className="inline-block px-6 py-2 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition"
            >
              View Pricing
            </a>
          </motion.div>
        )}

        {/* New Key Display with new component */}
        {newKey && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <div className="bg-success/10 border-2 border-success rounded-lg p-6">
              <h3 className="text-lg font-semibold text-success mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                API Key Created Successfully
              </h3>
              <p className="text-sm text-neutral-700 mb-4">
                Copy this key now - it won't be shown again!
              </p>
              <ApiKeyCard apiKey={newKey} label="New API Key" />
              <button
                onClick={() => setNewKey(null)}
                className="mt-4 px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition font-medium"
              >
                Done
              </button>
            </div>
          </motion.div>
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
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={createKey}
              disabled={loading}
              className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
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
                <motion.div
                  key={key.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-6 py-4 flex items-center justify-between"
                >
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
                    className="px-4 py-2 text-error hover:text-red-800 font-medium transition"
                  >
                    Revoke
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Start Guide */}
        <div className="mt-8 bg-primary-light rounded-xl border border-primary/20 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Quick Start</h3>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto font-mono">
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
            className="inline-block mt-4 text-primary hover:text-primary-hover font-medium"
          >
            View Full Documentation →
          </a>
        </div>
      </div>
    </div>
  )
}
