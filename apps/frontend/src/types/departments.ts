import { z } from "zod"
import { userSchema } from "./users"
import { projectSchema } from "./projects"

export const departmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  managerId: z.number(),
  projects: z.array(projectSchema),
  departmentWorkers: z.array(userSchema),
})

export type Department = z.infer<typeof departmentSchema>
