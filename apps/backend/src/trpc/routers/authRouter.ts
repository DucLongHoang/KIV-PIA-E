import { z } from "zod"
import { protectedProcedure, publicProcedure, router } from "../createRouter"
import { clearResponseAuth, createAccessTokenPayload, setResponseAuth } from "../../utils/auth"
import { TRPCError } from "@trpc/server"

export const loginInput = z.object({
  username: z.string(),
  password: z.string(),
})

export const loginOutput = z.void()

export const authRouter = router({
  login: publicProcedure
    .input(loginInput)
    .output(loginOutput)
    .mutation(async ({ ctx, input }) => {
      ctx.logger.info("Logging in user with username: " + input.username)

      const user = await ctx.prisma.user.findUnique({
        where: { orionLogin: input.username, password: input.password },
      })

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User with this username and password does not exist" })
      }

      const accessTokenPayload = createAccessTokenPayload(user)
      const refreshToken = await ctx.res.jwtSign({
        ...accessTokenPayload,
        type: "refresh",
      })

      await setResponseAuth(ctx.res, { accessTokenPayload, refreshToken })
    }),
  logout: protectedProcedure
    .input(z.void())
    .output(z.void())
    .mutation(async ({ ctx }) => {
      ctx.logger.info("Logging out user: " + ctx.req.accessTokenPayload?.userName)
      await clearResponseAuth(ctx.res)
      ctx.logger.info("Logged out")
    }),
})
