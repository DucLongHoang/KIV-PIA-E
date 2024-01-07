import { z } from "zod"

export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  from: z.date(),
  to: z.date().nullable(),
  managerId: z.number(),
  departmentId: z.number(),
})

export type Project = z.infer<typeof projectSchema>
