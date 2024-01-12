import { UserRole } from "shared"
import z from "zod"

export const useCreateUserFormSchema = () => {
  const schema = z.object({
    orionLogin: z.string().min(1, { message: "Orion login is required" }),
    email: z.string().email({ message: "Invalid email" }),
    fullName: z.string().min(1, { message: "Full name is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    role: z.nativeEnum(UserRole).refine((role) => role, { message: "Role is required" }),
    department: z.string().min(1, { message: "Department is required" }),
    superior: z.string().optional(),
  })

  return { schema: schema }
}

export const useCreateProjectFormSchema = () => {
  const schema = z.object({
    name: z.string().min(1, { message: "Project name is required" }),
    description: z.string().min(1, { message: "Project description is required" }),
    from: z.date().refine((date) => date, { message: "Project start date is required" }),
    to: z.date().optional(),
    manager: z.string().min(1, { message: "Manager is required" }),
    department: z.string().min(1, { message: "Department is required" }),
  })

  return { schema: schema }
}

export const useLoginFormSchema = () => {
  const schema = z.object({
    orionLogin: z.string().min(1, { message: "Orion login is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  })

  return { schema: schema }
}

export const useProjectUpdateFormSchema = () => {
  const schema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    from: z.date().optional(),
    to: z.date().optional(),
  })

  return { schema: schema }
}

export type CreateProjectFormValues = z.infer<ReturnType<typeof useCreateProjectFormSchema>["schema"]>
export type CreateUserFormValues = z.infer<ReturnType<typeof useCreateUserFormSchema>["schema"]>
export type LoginFormValues = z.infer<ReturnType<typeof useLoginFormSchema>["schema"]>
export type ProjectUpdateFormValues = z.infer<ReturnType<typeof useProjectUpdateFormSchema>["schema"]>
