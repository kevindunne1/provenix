'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface FirstCallCelebrationProps {
  isFirstSuccess: boolean
  onDismiss?: () => void
}

export default function FirstCallCelebration({ isFirstSuccess, onDismiss }: FirstCallCelebrationProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!isFirstSuccess) return

    setShow(true)
    // Auto-dismiss after 10 seconds
    const timer = setTimeout(() => {
      setShow(false)
      onDismiss?.()
    }, 10000)
    return () => clearTimeout(timer)
  }, [isFirstSuccess, onDismiss])

  const handleDismiss = () => {
    setShow(false)
    onDismiss?.()
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
          <div className="bg-white rounded-lg shadow-2xl border-2 border-success p-6 relative">
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success icon */}
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="flex-shrink-0 w-12 h-12 bg-success rounded-full flex items-center justify-center"
              >
                <Check className="w-7 h-7 text-white" />
              </motion.div>

              <div className="flex-1">
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-bold text-neutral-900 mb-1 font-mono"
                >
                  System Operational
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-neutral-600 mb-3"
                >
                  Trust Established. Your first signature has been verified.
                </motion.p>

                {/* Minimal confetti effect representation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-2 text-xs text-neutral-500 font-mono"
                >
                  <span className="inline-block">✓ Ed25519</span>
                  <span className="inline-block">✓ SHA-256</span>
                  <span className="inline-block">✓ Immutable</span>
                </motion.div>
              </div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-success/5 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
