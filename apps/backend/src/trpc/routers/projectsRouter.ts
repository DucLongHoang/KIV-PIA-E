import { z } from "zod"
import { publicProcedure, router } from "../createRouter"

export const projectsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.project.findMany()
  }),
})
