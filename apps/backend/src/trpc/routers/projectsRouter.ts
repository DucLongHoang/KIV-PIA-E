import { z } from "zod"
import { adminProcedure, protectedProcedure, router } from "../createRouter"
import { Project, projectSchema } from "../../../../shared"

export const createProjectInput = z.object({
  name: z.string(),
  description: z.string(),
  from: z.date(),
  to: z.date().optional(),
  departmentId: z.number(),
  managerId: z.number(),
})

const projectWithDepartmentAndManagerSchema = projectSchema.extend({
  department: z.object({ name: z.string(), managerId: z.number().nullable() }),
  manager: z.object({ fullName: z.string() }),
})

export const partialProjectUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  from: z.date().optional(),
  to: z.date().optional(),
})

export const projectsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.project.findMany()
  }),
  getById: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .output(z.nullable(projectWithDepartmentAndManagerSchema))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.project.findUnique({
        where: { id: input.projectId },
        include: { department: { select: { name: true, managerId: true } }, manager: { select: { fullName: true } } },
      })
      return result
    }),
  getByUserId: protectedProcedure
    .input(z.void())
    .output(z.array(projectWithDepartmentAndManagerSchema))
    .query(async ({ ctx }) => {
      if (ctx.userRole === "SECRETARIAT") {
        const result = await ctx.prisma.project.findMany({
          include: {
            manager: {
              select: {
                fullName: true,
              },
            },
            department: {
              select: {
                name: true,
                managerId: true,
              },
            },
          },
        })
        return result
      }

      // For other roles, fetch projects based on their relationship to the user.
      return await ctx.prisma.project.findMany({
        where: {
          OR: [
            {
              // The user is the manager of the project.
              managerId: ctx.userId,
            },
            {
              // The user is a subordinate working on the project.
              allocations: {
                some: {
                  worker: {
                    superiorId: ctx.userId,
                  },
                },
              },
            },
            {
              // The user is working on the project.
              allocations: {
                some: {
                  workerId: ctx.userId,
                },
              },
            },
          ],
        },
        include: {
          manager: {
            select: {
              fullName: true,
            },
          },
          department: {
            select: {
              name: true,
              managerId: true,
            },
          },
        },
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
  updateProject: protectedProcedure
    .input(z.object({ projectId: z.number(), updateData: partialProjectUpdateSchema }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.project.update({
        where: { id: input.projectId },
        data: input.updateData,
      })
    }),
})
