import { z } from "zod"
import { publicProcedure, router } from "../createRouter"

export const loginInput = z.object({
  username: z.string(),
  password: z.string(),
})

export const loginOutput = z.object({
  token: z.string(),
})

export const authRouter = router({
  login: publicProcedure
    .input(loginInput)
    .output(loginOutput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { orionLogin: input.username, password: input.password },
      })

      if (!user) {
        throw new Error("Invalid credentials")
      }

      const token = await ctx.req.jwt.sign({ userId: user.id })

      ctx.res.setCookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "none",
      })

      return { token }
    }),
  logout: publicProcedure
    .input(z.void())
    .output(z.void())
    .mutation(async ({ ctx, input }) => {
      return
    }),
})
