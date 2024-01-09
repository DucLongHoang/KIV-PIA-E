import { z } from "zod"
import { publicProcedure, router } from "../createRouter"
import { departmentSchema } from "../../../../shared"
import { Prisma } from "@prisma/client"

export const departmentsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.department.findMany()
  }),
})
