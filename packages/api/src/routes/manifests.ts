/**
 * GET /api/v1/manifests/:id
 * Public endpoint to fetch manifest by ID for verification
 */
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { ErrorCode, ErrorMessages } from '@provenix/shared'
import type { ErrorResponse } from '@provenix/shared'

const prisma = new PrismaClient()

interface ManifestResponse {
  manifestId: string
  manifest: {
    content: string
    hash: string
    timestamp: string
    metadata?: Record<string, unknown>
    version: string
  }
  signature: string
  createdAt: string
}

const manifestsRoute: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.get<{
    Params: { id: string }
    Reply: ManifestResponse | ErrorResponse
  }>('/manifests/:id', async (request, reply) => {
    try {
      const { id } = request.params

      // Fetch manifest from database
      const storedManifest = await prisma.manifest.findUnique({
        where: { id },
      })

      if (!storedManifest) {
        return reply.status(404).send({
          error: {
            code: ErrorCode.MANIFEST_NOT_FOUND,
            message: 'Manifest not found',
          },
        })
      }

      // Parse stored manifest JSON
      const manifestData = JSON.parse(storedManifest.manifestJson)

      return reply.send({
        manifestId: storedManifest.id,
        manifest: {
          content: manifestData.content,
          hash: manifestData.hash,
          timestamp: manifestData.timestamp,
          metadata: manifestData.metadata,
          version: manifestData.version,
        },
        signature: storedManifest.signature,
        createdAt: storedManifest.createdAt.toISOString(),
      })
    } catch (err) {
      request.log.error({ err }, 'Manifest fetch error')
      return reply.status(500).send({
        error: {
          code: ErrorCode.INTERNAL_ERROR,
          message: ErrorMessages[ErrorCode.INTERNAL_ERROR],
        },
      })
    }
  })
}

export default manifestsRoute
