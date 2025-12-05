/**
 * Fastify Application Factory
 * Configures all plugins and routes
 */
import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

export function buildApp() {
  const app = Fastify({
    logger:
      process.env.NODE_ENV === 'development'
        ? {
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true,
                translateTime: 'HH:MM:ss',
                ignore: 'pid,hostname',
              },
            },
          }
        : true,
  })

  // Register CORS
  app.register(cors, {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
  })

  // Register JWT
  app.register(jwt, {
    secret: process.env.JWT_SECRET || 'development-secret-change-in-production',
  })

  // Health check endpoint
  app.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  })

  // Register route handlers
  app.register(import('./routes/auth.js'), { prefix: '/api/v1' })
  app.register(import('./routes/keys.js'), { prefix: '/api/v1' })
  app.register(import('./routes/sign.js'), { prefix: '/api/v1' })
  app.register(import('./routes/verify.js'), { prefix: '/api/v1' })
  app.register(import('./routes/manifests.js'), { prefix: '/api/v1' })
  app.register(import('./routes/billing.js'), { prefix: '/api/v1' })
  app.register(import('./routes/webhooks.js'), { prefix: '/api/v1' })

  return app
}
