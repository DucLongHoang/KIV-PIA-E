import { UserRole } from "shared"
import z from "zod"

export const useCreateUserFormSchema = () => {
  const schema = z.object({
    orionLogin: z.string(),
    email: z.string().email(),
    fullName: z.string(),
    password: z.string(),
    role: z.nativeEnum(UserRole),
    departmentId: z.number(),
    superiorId: z.number(),
  })

  return { schema: schema }
}

export const useCreateProjectFormSchema = () => {
  const schema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    from: z.date(),
    to: z.date().nullable(),
    managerId: z.number(),
    departmentId: z.number(),
  })

  return { schema: schema }
}

export type CreateProjectFormValues = z.infer<ReturnType<typeof useCreateProjectFormSchema>["schema"]>
export type CreateUserFormValues = z.infer<ReturnType<typeof useCreateUserFormSchema>["schema"]>
