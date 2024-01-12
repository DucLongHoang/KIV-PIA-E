import { z } from "zod"
import { protectedProcedure, router } from "../createRouter"
import { allocationSchema, AllocationState } from "../../../../shared"

export const partialAllocationUpdateSchema = z.object({
  scope: z.string().optional(),
  description: z.string().optional(),
  from: z.date().optional(),
  to: z.date().optional(),
  allocationState: z.nativeEnum(AllocationState).optional(),
})

export const allocationsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.allocation.findMany()
  }),
  getByProjectId: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .output(z.array(allocationSchema))
    .query(async ({ ctx, input }) => {
      // SECRETARIAT can see all allocations
      if (ctx.userRole === "SECRETARIAT") {
        const adminQuery = await ctx.prisma.allocation.findMany({
          where: { projectId: input.projectId },
        })

        const result = adminQuery.map((allocation) => ({
          ...allocation,
          state: allocation.state as AllocationState,
        }))

        return result
      }

      const hardQuery = await ctx.prisma.project.findUnique({
        where: { id: input.projectId },
        include: {
          department: {
            select: { managerId: true },
          },
          allocations: {
            where: {
              OR: [
                { project: { managerId: ctx.userId } },
                { worker: { superiorId: ctx.userId } },
                { workerId: ctx.userId },
              ],
            },
          },
        },
      })

      if (!hardQuery || !hardQuery.department || !hardQuery.allocations) {
        throw new Error("Query failed")
      }

      const result = hardQuery.allocations.map((allocation) => ({
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
  updateAllocation: protectedProcedure
    .input(z.object({ projectId: z.number(), workerId: z.number(), updateData: partialAllocationUpdateSchema }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.allocation.updateMany({
        where: { projectId: input.projectId, workerId: input.workerId },
        data: {
          description: input.updateData.description,
          scope: input.updateData.scope ? parseFloat(input.updateData.scope) : undefined,
          from: input.updateData.from,
          to: input.updateData.to,
          state: input.updateData.allocationState,
        },
      })
    }),
  getAllocationScopeSumByUserId: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .output(z.number())
    .query(async ({ ctx, input }) => {
      const allocations = await ctx.prisma.allocation.findMany({
        where: { workerId: input.userId, state: "ACTIVE" },
      })

      const result = allocations.reduce((acc, curr) => acc + curr.scope, 0)

      return result
    }),
})
