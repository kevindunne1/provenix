/**
 * POST /api/v1/auth/signup
 * POST /api/v1/auth/login
 * Authentication endpoints for user signup and login
 */
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { ErrorCode, ErrorMessages } from '@provenix/shared'
import type { ErrorResponse } from '@provenix/shared'

const prisma = new PrismaClient()

interface SignupRequest {
  email: string
  password: string
}

interface LoginRequest {
  email: string
  password: string
}

interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    plan: string
    createdAt: string
  }
}

const authRoute: FastifyPluginAsync = async (app: FastifyInstance) => {
  /**
   * User signup
   */
  app.post<{
    Body: SignupRequest
    Reply: AuthResponse | ErrorResponse
  }>('/auth/signup', async (request, reply) => {
    try {
      const { email, password } = request.body

      // Validate input
      if (!email || !password) {
        return reply.status(400).send({
          error: {
            code: ErrorCode.INVALID_REQUEST,
            message: 'Email and password are required',
          },
        })
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return reply.status(400).send({
          error: {
            code: ErrorCode.INVALID_REQUEST,
            message: 'Invalid email format',
          },
        })
      }

      // Validate password strength (min 8 chars)
      if (password.length < 8) {
        return reply.status(400).send({
          error: {
            code: ErrorCode.INVALID_REQUEST,
            message: 'Password must be at least 8 characters',
          },
        })
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      })

      if (existingUser) {
        return reply.status(409).send({
          error: {
            code: ErrorCode.INVALID_REQUEST,
            message: 'User with this email already exists',
          },
        })
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10)

      // Create user
      const user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          passwordHash,
          plan: 'free', // Default to free tier
        },
      })

      // Generate JWT token
      const token = app.jwt.sign({
        userId: user.id,
        email: user.email,
      })

      return reply.status(201).send({
        token,
        user: {
          id: user.id,
          email: user.email,
          plan: user.plan,
          createdAt: user.createdAt.toISOString(),
        },
      })
    } catch (err) {
      request.log.error({ err }, 'Signup error')
      return reply.status(500).send({
        error: {
          code: ErrorCode.INTERNAL_ERROR,
          message: ErrorMessages[ErrorCode.INTERNAL_ERROR],
        },
      })
    }
  })

  /**
   * User login
   */
  app.post<{
    Body: LoginRequest
    Reply: AuthResponse | ErrorResponse
  }>('/auth/login', async (request, reply) => {
    try {
      const { email, password } = request.body

      // Validate input
      if (!email || !password) {
        return reply.status(400).send({
          error: {
            code: ErrorCode.INVALID_REQUEST,
            message: 'Email and password are required',
          },
        })
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      })

      if (!user) {
        return reply.status(401).send({
          error: {
            code: ErrorCode.UNAUTHORIZED,
            message: 'Invalid email or password',
          },
        })
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.passwordHash)
      if (!isValidPassword) {
        return reply.status(401).send({
          error: {
            code: ErrorCode.UNAUTHORIZED,
            message: 'Invalid email or password',
          },
        })
      }

      // Generate JWT token
      const token = app.jwt.sign({
        userId: user.id,
        email: user.email,
      })

      return reply.send({
        token,
        user: {
          id: user.id,
          email: user.email,
          plan: user.plan,
          createdAt: user.createdAt.toISOString(),
        },
      })
    } catch (err) {
      request.log.error({ err }, 'Login error')
      return reply.status(500).send({
        error: {
          code: ErrorCode.INTERNAL_ERROR,
          message: ErrorMessages[ErrorCode.INTERNAL_ERROR],
        },
      })
    }
  })
}

export default authRoute
