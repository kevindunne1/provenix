'use client'

import { motion } from 'framer-motion'

export function RadialGlowBackground() {
  return (
    <motion.div
      className="fixed inset-0 z-[-1] overflow-hidden bg-white dark:bg-black transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* The main animated radial gradient glow */}
      <div
        className="
          absolute inset-0
          bg-radial
          from-indigo-900/20 via-transparent to-transparent
          dark:from-indigo-600/30 dark:via-transparent dark:to-transparent
          bg-[length:200%_200%]
          animate-glow
          transition-colors duration-500
        "
      />

      {/* Subtle grid pattern overlay for technical feel */}
      <div
        className="
          absolute inset-0
          [mask-image:radial-gradient(transparent,black)]
          bg-[size:50px_50px]
          bg-[url(/assets/faint-grid.svg)]
          opacity-5 dark:opacity-[0.03]
        "
      />
    </motion.div>
  )
}
