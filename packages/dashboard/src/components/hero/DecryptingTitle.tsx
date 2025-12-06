'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface DecryptingTitleProps {
  text: string
  className?: string
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export default function DecryptingTitle({ text, className = '' }: DecryptingTitleProps) {
  const [displayText, setDisplayText] = useState(text.split('').map(() => ' '))
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!isInView) return

    let frame = 0
    const maxFrames = 25 // Faster than Gemini's approach

    const interval = setInterval(() => {
      frame++

      setDisplayText(
        text.split('').map((char, index) => {
          // Lock in progressively from left to right
          if (frame > (index + 1) * 1.5) return char
          // Still randomizing
          if (char === ' ') return ' '
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
      )

      if (frame >= maxFrames) {
        setDisplayText(text.split(''))
        clearInterval(interval)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [text, isInView])

  return (
    <motion.h1
      ref={ref}
      className={`font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayText.map((char, index) => (
        <span
          key={index}
          className={char === text[index] ? 'text-white' : 'text-neutral-500'}
        >
          {char}
        </span>
      ))}
    </motion.h1>
  )
}
