/**
 * Provenix API Server Entry Point
 * Starts Fastify server with all routes and plugins
 */
import 'dotenv/config'
import { buildApp } from './app.js'

const start = async () => {
  const app = buildApp()

  try {
    const port = parseInt(process.env.PORT || '3001', 10)
    const host = process.env.HOST || '0.0.0.0'

    await app.listen({ port, host })
    app.log.info(`🚀 Provenix API listening on http://${host}:${port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
