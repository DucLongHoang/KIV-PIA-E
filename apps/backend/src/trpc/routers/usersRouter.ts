import { z } from "zod"
import { publicProcedure, router } from "../createRouter"
import { userSchema } from "../../../../shared"
import { Prisma } from "@prisma/client"

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
    .input(userSchema)
    .output(z.void())
    .mutation(async ({ ctx, input }) => {
      const userFromDb = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      })

      if (userFromDb) {
        throw new Error("User with this email already exists")
      }

      const userData: Prisma.UserUncheckedCreateInput = {
        orionLogin: input.orionLogin,
        email: input.email,
        fullName: input.fullName,
        password: input.password,
        role: input.role,
        departmentId: input.departmentId,
        superiorId: input.superiorId,
      }

      await ctx.prisma.user.create({
        data: userData,
      })
    }),
})
