import { z } from "zod"
import { protectedProcedure, router } from "../createRouter"

export const departmentsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.department.findMany()
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string(), managerId: z.number() }))
    // .output(z.void())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.department.create({
        data: input,
      })
    }),
})
