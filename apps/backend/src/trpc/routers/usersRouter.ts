import { publicProcedure, router } from "../createRouter"

export const usersRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany()
  }),
})
