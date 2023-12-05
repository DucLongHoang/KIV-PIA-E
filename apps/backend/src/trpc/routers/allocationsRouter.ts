import { z } from "zod"
import { publicProcedure, router } from "../createRouter"

export const allocationsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.allocation.findMany()
  }),
  getByProjectId: publicProcedure.input(z.object({ projectId: z.number() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.allocation.findMany({
      where: { projectId: input.projectId },
    })
  }),
  getByUserId: publicProcedure.input(z.object({ userId: z.number() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.allocation.findMany({
      where: { workerId: input.userId },
    })
  }),
})
