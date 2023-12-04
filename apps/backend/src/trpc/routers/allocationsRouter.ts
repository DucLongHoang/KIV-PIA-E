import { z } from "zod"
import { publicProcedure, router } from "../createRouter"

export const allocationsRouter = router({
  getAllocationByProjectId: publicProcedure.input(z.object({ projectId: z.number() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.allocation.findMany({
      where: { projectId: input.projectId },
    })
  }),
})
