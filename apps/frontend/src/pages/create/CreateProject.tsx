import { useState } from "react"
import { Spacer } from "../../components/Spacer"
import { theme } from "../../styles/stitches.config"
import { SForm } from "../../components/form/FormInput.styled"
import { FormInput } from "../../components/form/FormInput"
import { Button } from "../../components/button/Button"
import { trpc } from "../../utils/trpc"
import { Dropdown } from "../../components/dropdown/Dropdown"
import { DatePicker } from "../../components/datepicker/DatePicker"
import { CreateProjectFormValues, useCreateProjectFormSchema } from "../../utils/formSchemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toasts } from "../../components/toast/toasts"
import { Department, Project, User } from "src/types"

interface CreateProjectProps {
  departments: Department[]
  projects: Project[]
  users: User[]
}
export const CreateProject = ({ users, projects, departments }: CreateProjectProps) => {
  const today = new Date()

  const [from, setFrom] = useState<Date | null>(null)
  const [to, setTo] = useState<Date | null>(null)

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [selectedManager, setSelectedManager] = useState<User | null>(null)

  const handleSelectManager = (managerName: string) => {
    const manager = users.find((user) => user.fullName === managerName)
    setSelectedManager(manager ?? null)
    form.setValue("manager", manager?.fullName ?? "")
  }

  const handleSelectDepartment = (departmentName: string) => {
    const department = departments.find((department) => department.name === departmentName)
    setSelectedDepartment(department ?? null)
    form.setValue("department", department?.name ?? "")
  }

  const handleFromDateChange = (date: Date) => {
    setFrom(date)
    form.setValue("from", date)
  }

  const handleToDateChange = (date: Date) => {
    setTo(date)
    form.setValue("to", date)
  }

  const projectsMutation = trpc.projects.createProject.useMutation()

  const departmentOptions = departments.map((department) => department.name)
  const userOptions = users.map((user) => user.fullName)

  const { schema } = useCreateProjectFormSchema()
  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  async function onSubmit(formValues: CreateProjectFormValues) {
    try {
      await projectsMutation.mutateAsync({
        name: formValues.name,
        description: formValues.description,
        departmentId: departments.find((department) => department.name === formValues.department)?.id ?? 1,
        managerId: users.find((user) => user.fullName === formValues.manager)?.id ?? 1,
        from: formValues.from,
        to: formValues.to,
      })
      toasts.success("Project created")
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      console.log(error)
      toasts.error("Oops, an error occurred")
    }
  }

  return (
    <SForm onSubmit={form.handleSubmit(onSubmit)}>
      <FormInput
        label={"Project name"}
        error={form.formState.errors.name?.message}
        children={<input placeholder="project-name" {...form.register("name")} />}
      />

      <Spacer size={theme.spaces.s4} />

      <FormInput
        label={"Project description"}
        error={form.formState.errors.description?.message}
        children={<input placeholder="project-description" {...form.register("description")} />}
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
        label={"Manager"}
        options={userOptions}
        placeholder={"manager"}
        error={form.formState.errors.manager?.message}
        formRegisterProps={form.register("manager")}
        selectedOption={selectedManager?.fullName}
        setSelectedOption={handleSelectManager}
      />

      <Spacer size={theme.spaces.s4} />

      <DatePicker
        label={"From"}
        selected={from}
        onChange={handleFromDateChange}
        minDate={today}
        error={form.formState.errors.from?.message}
        formRegisterProps={form.register("from")}
      />

      <Spacer size={theme.spaces.s4} />

      <DatePicker
        label={"To (optional)"}
        selected={to}
        onChange={handleToDateChange}
        minDate={from ?? today}
        formRegisterProps={form.register("to")}
      />

      <Spacer size={theme.spaces.s8} />

      <Button variant="secondary" isFullWidth type="submit" isSubmitting={form.formState.isSubmitting}>
        Create project
      </Button>
    </SForm>
  )
}
