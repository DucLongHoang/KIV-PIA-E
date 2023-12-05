import { z } from "zod"
import { publicProcedure, router } from "../createRouter"

export const usersRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany()
  }),
  getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.user.findUnique({
      where: { id: input.id },
    })
  }),
})
