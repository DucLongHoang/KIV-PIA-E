import { z } from "zod"
import { publicProcedure, router } from "../createRouter"
import { projectSchema } from "shared"

export const projectsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.project.findMany()
  }),
  getById: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .output(projectSchema.nullable())
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.project.findUnique({ where: { id: input.projectId } })
      return result
    }),
})
