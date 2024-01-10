import { User } from "@prisma/client"
import { FastifyReply } from "fastify"
import { AuthDecoratorOptions, Tokens } from "../fastify/authPlugin"
import { CookieSerializeOptions } from "@fastify/cookie"
import { addDays, addMinutes } from "date-fns"
import { UserRole } from "../../../shared"

const cookiePrefix = "KIV-PIA-E"
const accessTokenName = `${cookiePrefix}_Auth-Access-Token`
const accessTokenLifetimeMinutes = 60

const refreshTokenName = `${cookiePrefix}_Auth-Refresh-Token`
const refreshTokenLifetimeDays = 1

const baseCookieOptions: CookieSerializeOptions = {
  path: "/",
  sameSite: "lax",
  secure: false,
  httpOnly: true,
  signed: true,
}

export const authDecoratorDefaultConfig: AuthDecoratorOptions = {
  cookieSecret: "cookie-secret",
  accessTokenOptions: {
    secret: "access-token-secret",
    lifetimeMinutes: 60,
    cookieName: accessTokenName,
  },
}

export const createAccessTokenPayload = (user: User) => {
  return {
    userId: user.id,
    userLogin: user.orionLogin,
    userName: user.fullName,
    userRole: user.role as UserRole,
  }
}

export const setResponseAuth = async (response: FastifyReply, { accessTokenPayload, refreshToken }: Tokens) => {
  const accessToken = await response.jwtSign(accessTokenPayload)
  const now = new Date()

  response.setCookie(accessTokenName, accessToken, {
    ...baseCookieOptions,
    expires: addMinutes(now, accessTokenLifetimeMinutes),
  })

  response.setCookie(refreshTokenName, refreshToken, {
    ...baseCookieOptions,
    expires: addDays(now, refreshTokenLifetimeDays),
  })
}

export const clearResponseAuth = async (response: FastifyReply) => {
  void response.clearCookie(accessTokenName, baseCookieOptions)
  void response.clearCookie(refreshTokenName, baseCookieOptions)
}
