import { Spacer } from "../../components/Spacer"
import { theme } from "../../styles/stitches.config"
import { SForm } from "../../components/form/FormInput.styled"
import { FormInput } from "../../components/form/FormInput"
import PasswordInput from "../../components/form/PasswordInput"
import { Button } from "../../components/button/Button"
import { trpc } from "../../utils/trpc"
import { Department, Project, User, UserRole } from "shared"
import { Dropdown } from "../../components/dropdown/Dropdown"
import { CreateUserFormValues, useCreateUserFormSchema } from "../../utils/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toasts } from "../../components/toast/toasts"

interface CreateUserProps {
  departments: Department[]
  projects: Project[]
  users: User[]
}
export const CreateUser = ({ users, projects, departments }: CreateUserProps) => {
  const createUserMutation = trpc.users.create.useMutation()

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  const userRoles = Object.values(UserRole)
  const departmentOptions = departments.map((department) => department.name)
  const superiors = users.filter((user) => user.role === UserRole.SUPERIOR)
  const superiorOptions = superiors.map((user) => user.fullName)

  const handleSelectDepartment = (departmentName: string) => {
    const department = departments.find((department) => department.name === departmentName)
    setSelectedDepartment(department ?? null)
    form.setValue("department", department?.name ?? "")
  }

  const handleSelectRole = (roleName: string) => {
    const role = userRoles.find((userRole) => userRole === roleName)
    setSelectedRole(role ?? null)
    form.setValue("role", role ?? UserRole.SUBORDINATE)
  }

  const { schema } = useCreateUserFormSchema()
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  async function onSubmit(formValues: CreateUserFormValues) {
    try {
      console.log(formValues)

      await createUserMutation.mutateAsync({
        orionLogin: form.getValues("orionLogin"),
        email: form.getValues("email"),
        fullName: form.getValues("fullName"),
        password: form.getValues("password"),
        departmentId: departments.find((department) => department.name === formValues.department)?.id ?? 1,
        role: form.getValues("role"),
        superiorId: superiors.find((superior) => superior.fullName === formValues.superior)?.id,
      })
      toasts.success("User created")
    } catch (error) {
      console.log(error)
      toasts.error("Oops, an error occurred")
    }
  }

  return (
    <SForm onSubmit={form.handleSubmit(onSubmit)}>
      <FormInput
        label={"Orion login"}
        error={form.formState.errors.orionLogin?.message}
        children={<input placeholder="orion-login" {...form.register("orionLogin")} />}
      />

      <Spacer size={theme.spaces.s4} />

      <FormInput
        label={"Email"}
        error={form.formState.errors.email?.message}
        children={<input placeholder="email" {...form.register("email")} />}
      />

      <Spacer size={theme.spaces.s4} />

      <FormInput
        label={"Full name"}
        error={form.formState.errors.fullName?.message}
        children={<input placeholder="full-name" {...form.register("fullName")} />}
      />
      <Spacer size={theme.spaces.s4} />

      <PasswordInput
        label={"Password"}
        placeholder="******"
        error={form.formState.errors.password?.message}
        formRegisterProps={form.register("password")}
      />

      <Spacer size={theme.spaces.s4} />

      <Dropdown
        label={"Department"}
        options={departmentOptions}
        placeholder={"department"}
        error={form.formState.errors.department?.message}
        formRegisterProps={form.register("department")}
        selectedOption={selectedDepartment?.name}
        setSelectedOption={handleSelectDepartment}
      />

      <Spacer size={theme.spaces.s4} />

      <Dropdown
        label={"User role"}
        options={userRoles}
        placeholder={"user-role"}
        error={form.formState.errors.role?.message}
        formRegisterProps={form.register("role")}
        selectedOption={selectedRole?.toString()}
        setSelectedOption={handleSelectRole}
      />

      {selectedRole !== UserRole.SUBORDINATE ? (
        <Spacer size={theme.spaces.s8} />
      ) : (
        <>
          <Spacer size={theme.spaces.s4} />

          <Dropdown
            label={"Superior"}
            options={superiorOptions}
            placeholder={"superior"}
            error={form.formState.errors.superior?.message}
            formRegisterProps={form.register("superior")}
            selectedOption={form.getValues("superior")}
            setSelectedOption={(superior) => form.setValue("superior", superior)}
          />
          <Spacer size={theme.spaces.s8} />
        </>
      )}

      <Button variant="secondary" type="submit" isFullWidth isSubmitting={form.formState.isSubmitting}>
        Create user
      </Button>
    </SForm>
  )
}
