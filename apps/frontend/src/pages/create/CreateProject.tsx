import { useState } from "react"
import { Spacer } from "../../components/Spacer"
import { theme } from "../../styles/stitches.config"
import { SForm } from "../../components/form/FormInput.styled"
import { FormInput } from "../../components/form/FormInput"
import { Button } from "../../components/button/Button"
import { trpc } from "../../utils/trpc"
import { Department, Project, User } from "shared"
import { Dropdown } from "../../components/dropdown/Dropdown"
import { DatePicker } from "../../components/datepicker/DatePicker"

interface CreateProjectProps {
  departments: Department[]
  projects: Project[]
  users: User[]
}
export const CreateProject = ({ users, projects, departments }: CreateProjectProps) => {
  const today = new Date()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const [from, setFrom] = useState<Date>(today)
  const [to, setTo] = useState<Date | null>(null)

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [selectedManager, setSelectedManager] = useState<User | null>(null)

  const handleSelectManager = (managerName: string) => {
    const manager = users.find((user) => user.fullName === managerName)
    setSelectedManager(manager ?? null)
  }

  const handleSelectDepartment = (departmentName: string) => {
    const department = departments.find((department) => department.name === departmentName)
    setSelectedDepartment(department ?? null)
  }

  const projectsMutation = trpc.projects.createProject.useMutation()

  const departmentOptions = departments.map((department) => department.name)
  const userOptions = users.map((user) => user.fullName)

  const projectNames = projects.map((project) => project.name)

  async function handleSubmit() {
    await projectsMutation.mutateAsync({
      name: name,
      description: description,
      departmentId: selectedDepartment?.id ?? 1,
      managerId: selectedManager?.id ?? 1,
      from: from,
      to: to,
    })
  }

  return (
    <SForm
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <FormInput
        label={"Project name"}
        children={<input placeholder="project-name" value={name} onChange={(value) => setName(value.target.value)} />}
      />

      <Spacer size={theme.spaces.s4} />

      <FormInput
        label={"Project description"}
        children={
          <input
            placeholder="project-description"
            value={description}
            onChange={(value) => setDescription(value.target.value)}
          />
        }
      />

      <Spacer size={theme.spaces.s4} />

      <Dropdown
        label={"Department"}
        options={departmentOptions}
        placeholder={"KIV"}
        selectedOption={selectedDepartment?.name}
        setSelectedOption={handleSelectDepartment}
      />

      <Spacer size={theme.spaces.s4} />

      <Dropdown
        label={"Manager"}
        options={userOptions}
        placeholder={"manager"}
        selectedOption={selectedManager?.fullName}
        setSelectedOption={handleSelectManager}
      />

      <Spacer size={theme.spaces.s4} />

      <DatePicker
        label={"From"}
        selected={from}
        onChange={(value) => {
          setFrom(value)
        }}
        minDate={today}
      />

      <Spacer size={theme.spaces.s4} />

      <DatePicker
        label={"To (optional)"}
        selected={to}
        onChange={(value) => {
          setTo(value)
        }}
        minDate={from}
      />

      <Spacer size={theme.spaces.s8} />

      <Button variant="secondary" isFullWidth type="submit">
        Create project
      </Button>
    </SForm>
  )
}
