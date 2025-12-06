'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock signing function (simulates backend response)
const mockSign = async (_text: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))

  const hash = 'b3f2a1c9e4d8f7a6b2c5e1d9f3a7b4c8e2d6f9a3b7c1e5d8f2a6b9c3e7d1f5a8'
  const signature = '8d4e2f7a3b6c9e1d5f8a2b4c7e9d3f6a1b5c8e2d4f7a9c3e6d8f1b4a7c9e2d5f'

  return {
    success: true,
    data: {
      text_hash: hash,
      signature: signature,
      timestamp: new Date().toISOString(),
      verification_url: `https://provenix.dev/verify/${hash.slice(0, 8)}`,
      algorithm: 'Ed25519'
    }
  }
}

interface ScanBeamProps {
  isActive: boolean
}

function ScanBeam({ isActive }: ScanBeamProps) {
  if (!isActive) return null

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{
          duration: 0.6,
          ease: 'linear'
        }}
      />
    </motion.div>
  )
}

interface SignResult {
  text_hash: string
  signature: string
  timestamp: string
  verification_url: string
  algorithm: string
}

export default function CryptoPlayground() {
  const [inputText, setInputText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<SignResult | null>(null)
  const [showToast, setShowToast] = useState(false)

  const handleSign = async () => {
    if (!inputText.trim()) return

    setIsProcessing(true)
    setResult(null)
    setShowToast(false)

    try {
      const response = await mockSign(inputText)

      // Simulate streaming JSON output
      setResult(response.data)

      // Show success toast
      setTimeout(() => setShowToast(true), 300)
      setTimeout(() => setShowToast(false), 3000)

    } catch (error) {
      console.error('Signing failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="relative">
      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 z-50"
          >
            <div className="bg-success text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 font-mono text-sm">
              <Check className="w-4 h-4" />
              Verified with Ed25519
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Panel: Input */}
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-mono font-semibold text-neutral-700 mb-2">
              Input
            </label>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste AI generated text here..."
                className={cn(
                  "w-full h-64 p-4 font-mono text-sm bg-white border rounded-lg resize-none",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                  "placeholder:text-neutral-400",
                  isProcessing ? "border-primary" : "border-neutral-300"
                )}
                disabled={isProcessing}
              />
              <AnimatePresence>
                <ScanBeam isActive={isProcessing} />
              </AnimatePresence>
            </div>
          </div>

          <motion.button
            onClick={handleSign}
            disabled={!inputText.trim() || isProcessing}
            className={cn(
              "w-full px-6 py-4 rounded-lg font-semibold font-mono text-sm flex items-center justify-center gap-3 transition-all",
              inputText.trim() && !isProcessing
                ? "bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            )}
            whileTap={{ scale: inputText.trim() && !isProcessing ? 0.98 : 1 }}
          >
            <Lock className="w-5 h-5" />
            {isProcessing ? 'Signing...' : 'Sign Content'}
          </motion.button>
        </div>

        {/* Right Panel: Output */}
        <div className="space-y-4">
          <label className="block text-sm font-mono font-semibold text-neutral-700 mb-2">
            Signed Manifest
          </label>
          <div className="relative bg-neutral-900 rounded-lg p-4 h-64 overflow-auto font-mono text-xs">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1"
                >
                  <div className="text-neutral-400">{'{'}</div>
                  <div className="pl-4 text-neutral-300">
                    "text_hash": <span className="text-green-400">"{result.text_hash}"</span>,
                  </div>
                  <motion.div
                    className="pl-4 text-neutral-300"
                    initial={{ backgroundColor: 'rgba(79, 70, 229, 0)' }}
                    animate={{ backgroundColor: ['rgba(79, 70, 229, 0.2)', 'rgba(79, 70, 229, 0)'] }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    "signature": <span className="text-primary">"{result.signature}"</span>,
                  </motion.div>
                  <div className="pl-4 text-neutral-300">
                    "timestamp": <span className="text-yellow-400">"{result.timestamp}"</span>,
                  </div>
                  <div className="pl-4 text-neutral-300">
                    "verification_url": <span className="text-blue-400">"{result.verification_url}"</span>,
                  </div>
                  <div className="pl-4 text-neutral-300">
                    "algorithm": <span className="text-purple-400">"{result.algorithm}"</span>
                  </div>
                  <div className="text-neutral-400">{'}'}</div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-neutral-600 flex items-center justify-center h-full"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
                    </div>
                  ) : (
                    'Signed output will appear here...'
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Explainer text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm text-neutral-600 mt-6 font-mono"
      >
        This is a client-side demo. Real signing happens server-side with your API key.
      </motion.p>
    </div>
  )
}
