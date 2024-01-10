import { z } from "zod"
import { publicProcedure, router } from "../createRouter"
import { FastifyReply } from "fastify/types/reply"
import { addDays, addMinutes } from "date-fns"

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
      const user = await ctx.prisma.user.findUnique({
        where: { orionLogin: input.username, password: input.password },
      })

      if (!user) {
        throw new Error("User with this username and password does not exist")
      }

      const accessToken = await ctx.res.jwtSign({ userId: user.id }, { expiresIn: "15m" })
      const refreshToken = await ctx.res.jwtSign(
        {
          userId: user.id,
          type: "refresh",
        },
        { expiresIn: "7d" }
      )

      ctx.res.setCookie("longAccessToken", accessToken, {
        domain: "localhost",
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        expires: addMinutes(new Date(), 15),
        secure: false,
        signed: true,
      })

      ctx.res.setCookie("longRefreshToken", refreshToken, {
        domain: "localhost",
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        expires: addDays(new Date(), 1),
        secure: false,
        signed: true,
      })
    }),
  logout: publicProcedure
    .input(z.void())
    .output(z.void())
    .mutation(async ({ ctx, input }) => {
      ctx.res.clearCookie("accessToken")
      ctx.res.clearCookie("refreshToken")
    }),
})
