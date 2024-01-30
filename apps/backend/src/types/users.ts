import { z } from "zod"
import { projectSchema } from "./projects"

export enum UserRole {
  SECRETARIAT = "SECRETARIAT",
  SUPERIOR = "SUPERIOR",
  SUBORDINATE = "SUBORDINATE",
}

export const userSchema = z.object({
  id: z.number(),
  orionLogin: z.string(),
  role: z.nativeEnum(UserRole),
  email: z.string().email(),
  fullName: z.string(),
  password: z.string(),
  departmentId: z.number(),
  managedProjects: z.array(projectSchema),

  superiorId: z.number().optional(),
  subordinates: z.array(z.number()).optional(),
  managedDepartment: z.number().optional(),
})

export type User = z.infer<typeof userSchema>
