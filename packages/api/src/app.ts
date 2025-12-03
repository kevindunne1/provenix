/**
 * Fastify Application Factory
 * Configures all plugins and routes
 */
import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import pino from 'pino'

export function buildApp() {
  const app = Fastify({
    logger:
      process.env.NODE_ENV === 'development'
        ? pino({
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true,
                translateTime: 'HH:MM:ss',
                ignore: 'pid,hostname',
              },
            },
          })
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

  // TODO: Register route handlers
  // app.register(signRoute, { prefix: '/api/v1' })
  // app.register(verifyRoute, { prefix: '/api/v1' })
  // app.register(keysRoute, { prefix: '/api/v1' })

  return app
}
