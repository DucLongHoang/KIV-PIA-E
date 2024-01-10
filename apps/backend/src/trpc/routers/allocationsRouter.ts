import { z } from "zod"
import { protectedProcedure, router } from "../createRouter"
import { allocationSchema, AllocationState } from "../../../../shared"

export const allocationsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.allocation.findMany()
  }),
  getByProjectId: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .output(z.array(allocationSchema))
    .query(async ({ ctx, input }) => {
      const allocations = await ctx.prisma.allocation.findMany({
        where: { projectId: input.projectId },
      })

      const result = allocations.map((allocation) => ({
        ...allocation,
        state: allocation.state as AllocationState,
      }))

      return result
    }),
  getByUserId: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .output(z.array(allocationSchema))
    .query(async ({ ctx, input }) => {
      const allocations = await ctx.prisma.allocation.findMany({
        where: { workerId: input.userId },
      })

      const result = allocations.map((allocation) => ({
        ...allocation,
        state: allocation.state as AllocationState,
      }))

      return result
    }),
})
