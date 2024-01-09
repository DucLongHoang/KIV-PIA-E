import { z } from "zod"
import { publicProcedure, router } from "../createRouter"

import { Prisma } from "@prisma/client"

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .output(z.void())
    .query(async ({ ctx }) => {
      return
    }),
})
