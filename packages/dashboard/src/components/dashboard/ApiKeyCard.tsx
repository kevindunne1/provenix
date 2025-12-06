'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Eye, EyeOff, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ApiKeyCardProps {
  apiKey: string
  label?: string
  className?: string
}

export default function ApiKeyCard({ apiKey, label = 'API Key', className }: ApiKeyCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const maskedKey = apiKey.slice(0, 12) + '•'.repeat(apiKey.length - 12)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className={cn('bg-white rounded-lg border border-neutral-200 p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-900">{label}</h3>
        <div className="flex gap-2">
          <motion.button
            onClick={() => setIsVisible(!isVisible)}
            className="p-2 rounded-md hover:bg-neutral-100 transition-colors text-neutral-600"
            whileTap={{ scale: 0.95 }}
            title={isVisible ? 'Hide key' : 'Show key'}
          >
            {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </motion.button>
          <motion.button
            onClick={handleCopy}
            className={cn(
              'p-2 rounded-md transition-colors',
              isCopied
                ? 'bg-success text-white'
                : 'hover:bg-neutral-100 text-neutral-600'
            )}
            whileTap={{ scale: 0.95 }}
            title="Copy to clipboard"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      <div className="bg-neutral-900 rounded-md p-4 font-mono text-sm">
        <code className="text-green-400 break-all">
          {isVisible ? apiKey : maskedKey}
        </code>
      </div>

      <p className="text-xs text-neutral-500 mt-3">
        Keep this key secure. It provides full access to your Provenix account.
      </p>
    </div>
  )
}
