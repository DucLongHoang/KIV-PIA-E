import { TRPCError, initTRPC } from "@trpc/server"
import { Context } from "./context"
import superjson from "superjson"
import { checkAuth } from "../fastify/authPlugin"

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(async (opts) => {
  const { ctx } = opts

  ctx.logger.info("Checking auth")

  try {
    await checkAuth(ctx.req, ctx.res)
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No authorization found.",
    })
  }

  const tokenPayload = ctx.req.accessTokenPayload

  ctx.logger.info("Token payload: " + JSON.stringify(tokenPayload))

  if (!tokenPayload) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Invalid or missing token.",
    })
  }

  ctx.logger.info("Payload found")

  ctx.logger.info("Now checking for user")
  const user = await ctx.prisma.user.findUnique({ where: { orionLogin: tokenPayload.userLogin } })

  if (!user) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User does not exist.",
    })
  }

  ctx.logger.info("User with orionLogin: " + user.orionLogin + " found")

  return opts.next({
    ctx: {
      userName: user.fullName,
      userLogin: user.orionLogin,
      userRole: user.role,
      userId: user.id,
    },
  })
})

export const adminProcedure = protectedProcedure.use(async (opts) => {
  const { ctx } = opts

  const tokenPayload = ctx.req.accessTokenPayload
  const userRole = tokenPayload?.userRole

  ctx.logger.info("Check if user is SECRETARIAT.")

  if (!userRole || userRole !== "SECRETARIAT") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authorized to perform this action.",
    })
  }

  ctx.logger.info("User is SECRETARIAT. Proceeding with procedure.")
  return opts.next(opts)
})
