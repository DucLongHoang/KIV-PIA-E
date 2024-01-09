import { useState } from "react"
import { AppLayout } from "../../components/layouts/appLayout/AppLayout"
import { Spacer } from "../../components/Spacer"
import { theme } from "../../styles/stitches.config"
import { Flex } from "../../components/Flex"
import { SForm } from "../../components/form/FormInput.styled"
import { FormInput } from "../../components/form/FormInput"
import PasswordInput from "../../components/form/PasswordInput"
import { Button } from "../../components/button/Button"
import Text from "../../components/Text"
import { trpc } from "../../utils/trpc"
import RectPlaceholder from "../../components/placeholder/RectPlaceHolder"
import { Department, Project, User, UserRole } from "shared"
import { Dropdown } from "../../components/dropdown/Dropdown"

export const Create = () => {
  const departmentsQuery = trpc.departments.getAll.useQuery()
  const projectsQuery = trpc.projects.getAll.useQuery()
  const usersQuery = trpc.users.getAll.useQuery()

  const [createOption, setCreateOption] = useState<"user" | "project">("user")

  const { data: usersData, isLoading: usersLoading } = usersQuery
  const { data: projectsData, isLoading: projectsLoading } = projectsQuery
  const { data: departmentsData, isLoading: departmentsLoading } = departmentsQuery

  if (!projectsData || projectsLoading || !departmentsData || departmentsLoading || !usersData || usersLoading) {
    return (
      <AppLayout>
        <Spacer size={theme.spaces.s5} />
        <RectPlaceholder />
      </AppLayout>
    )
  }

  const departments = departmentsData as Department[]
  const projects = projectsData as Project[]
  const users = usersData as User[]

  return (
    <AppLayout>
      <Spacer size={theme.spaces.s40} />
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <Button
          variant="secondary"
          onClick={() => {
            setCreateOption(createOption === "user" ? "project" : "user")
          }}
        >
          {createOption === "user" ? "Create project" : "Create user"}
        </Button>

        <Spacer size={theme.spaces.s10} />

        <Text type="headerH1">Create {createOption}</Text>

        <Spacer size={theme.spaces.s10} />

        {createOption === "user" ? (
          <CreateUser users={users} projects={projects} departments={departments} />
        ) : (
          <CreateProject users={users} projects={projects} departments={departments} />
        )}
      </Flex>
    </AppLayout>
  )
}

interface CreateUserProps {
  departments: Department[]
  projects: Project[]
  users: User[]
}

const CreateUser = ({ users, projects, departments }: CreateUserProps) => {
  const [orion, setOrion] = useState("")
  const [password, setPassword] = useState("")

  const userRoles = Object.values(UserRole)

  const departmentOptions = departments.map((department) => department.name)

  const handleSubmit = () => {
    console.log("====================================")
    console.log("User created")
    console.log("====================================")
  }

  return (
    <SForm onSubmit={handleSubmit}>
      <FormInput label={"Orion login"} children={<input placeholder="orion-login" />} />

      <Spacer size={theme.spaces.s4} />

      <FormInput label={"Email"} children={<input placeholder="email" />} />

      <Spacer size={theme.spaces.s4} />

      <FormInput label={"Full name"} children={<input placeholder="full-name" />} />

      <Spacer size={theme.spaces.s4} />

      <PasswordInput label={"Password"} placeholder="******" />

      <Spacer size={theme.spaces.s4} />

      <Dropdown label={"Department"} options={departmentOptions} placeholder={"KIV"} />

      <Spacer size={theme.spaces.s4} />

      <Dropdown label={"User role"} options={userRoles} placeholder={"user-role"} />

      <Spacer size={theme.spaces.s8} />

      <Button variant="secondary" isFullWidth type="submit">
        Create user
      </Button>
    </SForm>
  )
}

interface CreateProjectProps {
  departments: Department[]
  projects: Project[]
  users: User[]
}

const CreateProject = ({ users, projects, departments }: CreateProjectProps) => {
  const departmentOptions = departments.map((department) => department.name)
  const userOptions = users.map((user) => user.fullName)

  const projectNames = projects.map((project) => project.name)

  const handleSubmit = () => {
    console.log("====================================")
    console.log("Project created")
    console.log("====================================")
  }

  return (
    <SForm onSubmit={handleSubmit}>
      <FormInput label={"Project name"} children={<input placeholder="project-name" />} />

      <Spacer size={theme.spaces.s4} />

      <FormInput label={"Project description"} children={<input placeholder="project-description" />} />

      <Spacer size={theme.spaces.s4} />

      <Dropdown label={"Department"} options={departmentOptions} placeholder={"KIV"} />

      <Spacer size={theme.spaces.s4} />

      <Dropdown label={"Manager"} options={userOptions} placeholder={"manager"} />

      <Spacer size={theme.spaces.s8} />

      <Button variant="secondary" isFullWidth type="submit">
        Create project
      </Button>
    </SForm>
  )
}
