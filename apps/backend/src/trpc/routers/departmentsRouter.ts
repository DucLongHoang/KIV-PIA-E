import { z } from "zod"
import { protectedProcedure, router } from "../createRouter"

export const departmentsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.department.findMany()
  }),
  getById: protectedProcedure
    .input(z.object({ departmentId: z.number() }))
    .output(z.object({ id: z.number(), name: z.string(), managerId: z.number().nullable() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.department.findUnique({ where: { id: input.departmentId } })

      if (!result) {
        throw new Error("Department not found")
      }

      return result
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string(), managerId: z.number() }))
    .output(z.void())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.department.create({
        data: input,
      })
    }),
})
