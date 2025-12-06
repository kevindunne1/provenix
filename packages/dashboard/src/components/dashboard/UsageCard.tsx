'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface UsageCardProps {
  title: string
  current: number
  limit: number
  label: string
  className?: string
}

export default function UsageCard({ title, current, limit, label, className }: UsageCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const percentage = Math.min((current / limit) * 100, 100)

  // Spring physics for smooth animation
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 15,
    mass: 1
  })

  useEffect(() => {
    if (isInView) {
      springValue.set(percentage)
    }

    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })

    return () => unsubscribe()
  }, [isInView, percentage, springValue])

  // Color based on usage
  const getColor = () => {
    if (percentage >= 95) return 'bg-error'
    if (percentage >= 80) return 'bg-orange-500'
    return 'bg-primary'
  }

  const getTextColor = () => {
    if (percentage >= 95) return 'text-error'
    if (percentage >= 80) return 'text-orange-500'
    return 'text-primary'
  }

  return (
    <motion.div
      ref={ref}
      className={cn('bg-white rounded-lg border border-neutral-200 p-6', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-900">{title}</h3>
        <span className={cn('font-mono text-sm font-medium', getTextColor())}>
          {displayValue.toFixed(0)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-neutral-100 rounded-full overflow-hidden mb-3">
        <motion.div
          className={cn('h-full rounded-full transition-colors', getColor())}
          initial={{ width: '0%' }}
          style={{ width: `${displayValue}%` }}
        />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral-600 font-mono">
          {current.toLocaleString()} / {limit.toLocaleString()}
        </span>
        <span className="text-neutral-500">{label}</span>
      </div>

      {/* Warning message */}
      {percentage >= 80 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-neutral-200"
        >
          <p className={cn('text-xs font-medium', getTextColor())}>
            {percentage >= 95
              ? '⚠️ Approaching limit - Consider upgrading'
              : '⚡ High usage - Monitor closely'}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
