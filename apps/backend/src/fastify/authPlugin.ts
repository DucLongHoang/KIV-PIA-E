import { FastifyBaseLogger, FastifyError, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import fp from "fastify-plugin"
import { fastifyCookie, FastifyCookieOptions } from "@fastify/cookie"
import { fastifyJwt } from "@fastify/jwt"
import { UserRole } from "../../../shared"

export type FnContext = { logger?: FastifyBaseLogger }

export function isFastifyError(error: unknown): error is FastifyError {
  return !!error && typeof error === "object" && "code" in error && "name" in error && "statusCode" in error
}

export interface AuthDecoratorOptions {
  accessTokenOptions: { secret: string; cookieName: string; lifetimeMinutes: number }
  cookieSecret: string
}

export interface AuthHookOptions {
  onAccessTokenExpired: (
    refreshToken: string,
    ctx?: FnContext
  ) => Promise<{ accessTokenPayload: TokenPayload; refreshToken: string }>
  setResponseAuth: (res: FastifyReply, tokens: Tokens) => Promise<void>
  refreshTokenCookieName: string
}

const authDecorator: FastifyPluginAsync<AuthDecoratorOptions> = async (fastify, options) => {
  const { accessTokenOptions, cookieSecret } = options

  await fastify.register(fastifyCookie, { secret: cookieSecret } as FastifyCookieOptions)
  await fastify.register(fastifyJwt, {
    secret: accessTokenOptions.secret,
    cookie: { cookieName: accessTokenOptions.cookieName, signed: true },
    sign: { expiresIn: `${accessTokenOptions.lifetimeMinutes}m` },
  })

  fastify.decorateRequest<TokenPayload | null>("accessTokenPayload", null)
}

export const checkAuth = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    req.accessTokenPayload = await req.jwtVerify<TokenPayload>()
  } catch (error) {
    throw error
  }
}

export interface TokenPayload {
  userId: number
  userName: string
  userLogin: string
  userRole: UserRole
}

export interface Tokens {
  accessTokenPayload: TokenPayload
  refreshToken: string
}

declare module "fastify" {
  interface FastifyRequest {
    accessTokenPayload: TokenPayload | null
  }
}

export const authDecoratorPlugin = fp(authDecorator, { fastify: ">=3.0.0", name: "fastify-auth" })
