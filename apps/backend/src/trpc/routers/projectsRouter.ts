import { z } from "zod"
import { adminProcedure, protectedProcedure, publicProcedure, router } from "../createRouter"
import { projectSchema } from "../../../../shared"

export const createProjectInput = z.object({
  name: z.string(),
  description: z.string(),
  from: z.date(),
  to: z.date().nullable(),
  departmentId: z.number(),
  managerId: z.number(),
})

export const projectsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.project.findMany()
  }),
  getById: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .output(z.nullable(projectSchema))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.project.findUnique({ where: { id: input.projectId } })
      return result
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
  test: publicProcedure.input(z.object({ number: z.number() })).mutation((req) => {
    console.log("received this as input: " + req.input.number)
    return { number: req.input.number + 1 }
  }),
})
