import { z } from "zod"
import { adminProcedure, protectedProcedure, router } from "../createRouter"
import { projectSchema } from "../../../../shared"

export const createProjectInput = z.object({
  name: z.string(),
  description: z.string(),
  from: z.date(),
  to: z.date().optional(),
  departmentId: z.number(),
  managerId: z.number(),
})

export const projectsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.project.findMany()
  }),
  getById: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .output(z.nullable(projectSchema))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.project.findUnique({ where: { id: input.projectId } })
      return result
    }),
  getByUserId: protectedProcedure.query(async ({ ctx }) => {
    const allocationsOfUser = await ctx.prisma.allocation.findMany({
      where: { workerId: ctx.userId },
    })
    const workedOnProjects = allocationsOfUser.map((allocation) => allocation.projectId)
    return await ctx.prisma.project.findMany({
      where: { id: { in: workedOnProjects } },
    })
  }),
  createProject: adminProcedure
    .input(createProjectInput)
    .output(z.void())
    .mutation(async ({ ctx, input }) => {
      const projectFromDb = await ctx.prisma.project.findUnique({
        where: { name: input.name },
      })

      if (projectFromDb) {
        throw new Error("Project with this name already exists")
      }

      await ctx.prisma.project.create({
        data: input,
      })
    }),
})
