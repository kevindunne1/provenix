'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant?: 'primary' | 'secondary' | 'ghost'
  isPopular?: boolean
  additionalInfo?: string
  children?: React.ReactNode
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant = 'primary',
  isPopular = false,
  additionalInfo,
}: PricingCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (!isPopular) return

    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const buttonClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    secondary: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300',
    ghost: 'border-2 border-primary text-primary hover:bg-primary-light',
  }

  return (
    <motion.div
      className={cn(
        'bg-white rounded-xl shadow-md border p-8 flex flex-col relative',
        isPopular ? 'border-2 border-primary shadow-lg' : 'border-neutral-200'
      )}
      onMouseMove={handleMouseMove}
      style={{
        background: isPopular
          ? useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                rgba(79, 70, 229, 0.08),
                transparent 80%
              )
            `
          : undefined,
      }}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-neutral-900 mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-neutral-900">{price}</span>
          {price !== 'Custom' && <span className="text-neutral-600">/month</span>}
        </div>
        <p className="text-neutral-600 text-sm">{description}</p>
      </div>

      <div className="mb-6">
        <ul className="space-y-2 text-sm text-neutral-600">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-5 h-5 text-success mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {additionalInfo && (
        <p className="text-xs text-neutral-500 mb-4">{additionalInfo}</p>
      )}

      <motion.button
        className={cn(
          'mt-auto px-6 py-3 rounded-md transition-colors font-medium relative overflow-hidden',
          buttonClasses[buttonVariant]
        )}
        animate={
          isPopular
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(79, 70, 229, 0)',
                  '0 0 0 4px rgba(79, 70, 229, 0.1)',
                  '0 0 0 0 rgba(79, 70, 229, 0)',
                ],
              }
            : undefined
        }
        transition={
          isPopular
            ? {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }
            : undefined
        }
      >
        {isPopular && (
          <motion.div
            className="absolute inset-0 -translate-x-full"
            animate={{
              translateX: ['100%', '-100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />
        )}
        <span className="relative z-10">{buttonText}</span>
      </motion.button>
    </motion.div>
  )
}
