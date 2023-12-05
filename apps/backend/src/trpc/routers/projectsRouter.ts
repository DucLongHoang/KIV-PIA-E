import { z } from "zod"
import { publicProcedure, router } from "../createRouter"

export const projectsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.project.findMany()
  }),
  getById: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .output(
      z
        .object({
          id: z.number(),
          name: z.string(),
          description: z.string().nullable(),
          from: z.date(),
          to: z.date().nullable(),
          managerId: z.number(),
        })
        .nullable()
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.project.findUnique({ where: { id: input.projectId } })
      return result
    }),
})
