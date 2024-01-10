import { z } from "zod"
import { adminProcedure, protectedProcedure, publicProcedure, router } from "../createRouter"
import { UserRole } from "../../../../shared"

export const createUserInput = z.object({
  orionLogin: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  password: z.string(),
  role: z.nativeEnum(UserRole),
  departmentId: z.number(),
  superiorId: z.number().optional(),
})

export const authorizedProcedure = publicProcedure.input

export const usersRouter = router({
  myself: protectedProcedure
    .input(z.void())
    .output(
      z.object({ userName: z.string(), userLogin: z.string(), userRole: z.nativeEnum(UserRole), userId: z.number() })
    )
    .query(async ({ ctx }) => {
      return {
        userName: ctx.userName,
        userLogin: ctx.userLogin,
        userRole: ctx.userRole as UserRole,
        userId: ctx.userId,
      }
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany()
  }),
  getById: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.user.findUnique({
      where: { id: input.id },
    })
  }),
  create: adminProcedure
    .input(createUserInput)
    .output(z.void())
    .mutation(async ({ ctx, input }) => {
      const userFromDb = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      })

      if (userFromDb) {
        throw new Error("User with this email already exists")
      }

      await ctx.prisma.user.create({
        data: input,
      })
    }),
})
