'use client'

import { useState, useEffect } from 'react'
import { analytics } from '@/lib/analytics'

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://provenixapi-production.up.railway.app'

  useEffect(() => {
    // Track when user lands on signup vs login
    if (isSignup) {
      analytics.signupStarted()
    }
  }, [isSignup])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const endpoint = isSignup ? '/api/v1/auth/signup' : '/api/v1/auth/login'

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()

        // Track success
        if (isSignup) {
          analytics.signupCompleted(data.user?.id || email)
        } else {
          analytics.loginSuccess(data.user?.id || email)
        }

        // Store token
        localStorage.setItem('provenix_token', data.token)
        // Redirect to dashboard
        window.location.href = '/dashboard'
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.error?.message || 'Authentication failed'
        setError(errorMessage)

        // Track failure
        if (!isSignup) {
          analytics.loginFailed(errorMessage)
        }
      }
    } catch (err) {
      const errorMessage = 'Network error. Please try again.'
      setError(errorMessage)

      if (!isSignup) {
        analytics.loginFailed(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Provenix</h1>
          <p className="text-slate-600">
            {isSignup ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
              {isSignup && (
                <p className="text-xs text-slate-500 mt-1">
                  Must be at least 8 characters
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {loading ? 'Processing...' : isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle Sign Up / Login */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignup(!isSignup)
                setError('')
              }}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              {isSignup
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 text-center text-sm text-slate-600">
          <p>
            <strong>Free tier:</strong> 100 API calls/month
          </p>
          <p className="mt-1">
            <strong>Paid tier:</strong> Unlimited calls at $49/month
          </p>
        </div>
      </div>
    </div>
  )
}
