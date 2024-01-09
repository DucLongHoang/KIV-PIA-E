import { z } from "zod"
import { publicProcedure, router } from "../createRouter"

export const departmentsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.department.findMany()
  }),
  create: publicProcedure
    .input(z.object({ name: z.string(), managerId: z.number() }))
    // .output(z.void())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.department.create({
        data: input,
      })
    }),
})
