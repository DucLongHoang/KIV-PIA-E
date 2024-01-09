import { z } from "zod"
import { publicProcedure, router } from "../createRouter"
import { UserRole } from "../../../../shared"
import { Prisma } from "@prisma/client"

export const createUserInput = z.object({
  orionLogin: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  password: z.string(),
  role: z.nativeEnum(UserRole),
  departmentId: z.number(),
  superiorId: z.number().optional(),
})

export const usersRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany()
  }),
  getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.user.findUnique({
      where: { id: input.id },
    })
  }),
  create: publicProcedure
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
