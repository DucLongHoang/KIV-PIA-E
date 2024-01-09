import { Spacer } from "../../components/Spacer"
import { theme } from "../../styles/stitches.config"
import { SForm } from "../../components/form/FormInput.styled"
import { FormInput } from "../../components/form/FormInput"
import PasswordInput from "../../components/form/PasswordInput"
import { Button } from "../../components/button/Button"
import { trpc } from "../../utils/trpc"
import { Department, Project, User, UserRole } from "shared"
import { Dropdown } from "../../components/dropdown/Dropdown"
import { CreateUserFormValues, useCreateUserFormSchema } from "./formSchemes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"

interface CreateUserProps {
  departments: Department[]
  projects: Project[]
  users: User[]
}
export const CreateUser = ({ users, projects, departments }: CreateUserProps) => {
  const createUserMutation = trpc.users.create.useMutation()

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  const handleSelectDepartment = (departmentName: string) => {
    const department = departments.find((department) => department.name === departmentName)
    setSelectedDepartment(department ?? null)
  }

  const handleSelectRole = (roleName: string) => {
    const role = userRoles.find((userRole) => userRole === roleName)
    setSelectedRole(role ?? null)
  }

  const { schema } = useCreateUserFormSchema()
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  const userRoles = Object.values(UserRole)
  const departmentOptions = departments.map((department) => department.name)

  async function onSubmit(formValues: CreateUserFormValues) {
    try {
      console.log(formValues)

      await createUserMutation.mutateAsync({
        orionLogin: form.getValues("orionLogin"),
        email: form.getValues("email"),
        fullName: form.getValues("fullName"),
        password: form.getValues("password"),
        departmentId: selectedDepartment?.id ?? 1,
        role: selectedRole ?? UserRole.SUBORDINATE,
      })

      console.log("====================================")
      console.log("User created")
      console.log("====================================")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SForm
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit(onSubmit)
      }}
    >
      <FormInput
        label={"Orion login"}
        children={<input placeholder="orion-login" {...form.register("orionLogin")} />}
      />

      <Spacer size={theme.spaces.s4} />

      <FormInput label={"Email"} children={<input placeholder="email" {...form.register("email")} />} />

      <Spacer size={theme.spaces.s4} />

      <FormInput label={"Full name"} children={<input placeholder="full-name" {...form.register("fullName")} />} />

      <Spacer size={theme.spaces.s4} />

      <PasswordInput label={"Password"} placeholder="******" formRegisterProps={form.register("password")} />

      <Spacer size={theme.spaces.s4} />

      <Dropdown
        label={"Department"}
        options={departmentOptions}
        placeholder={"KIV"}
        selectedOption={selectedDepartment?.name}
        setSelectedOption={handleSelectDepartment}
      />
      <input type="hidden" {...form.register("departmentId")} value={selectedDepartment?.id} />

      <Spacer size={theme.spaces.s4} />

      <Dropdown
        label={"User role"}
        options={userRoles}
        placeholder={"user-role"}
        selectedOption={selectedRole?.toString()}
        setSelectedOption={handleSelectRole}
      />
      <input type="hidden" {...form.register("role")} value={selectedRole?.toString()} />

      <Spacer size={theme.spaces.s8} />

      <Button variant="secondary" type="submit" isFullWidth isSubmitting={form.formState.isSubmitting}>
        Create user
      </Button>
    </SForm>
  )
}
