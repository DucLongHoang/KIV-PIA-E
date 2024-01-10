import { useState } from "react"
import { AppLayout } from "../../components/layouts/appLayout/AppLayout"
import { Spacer } from "../../components/Spacer"
import { theme } from "../../styles/stitches.config"
import { Flex } from "../../components/Flex"
import { Button } from "../../components/button/Button"
import Text from "../../components/Text"
import { trpc } from "../../utils/trpc"
import RectPlaceholder from "../../components/placeholder/RectPlaceHolder"
import { Department, Project, User } from "shared"
import { CreateUser } from "./CreateUser"
import { CreateProject } from "./CreateProject"

interface CreateProps {
  type?: "user" | "project"
}

export const Create = ({ type }: CreateProps) => {
  const departmentsQuery = trpc.departments.getAll.useQuery()
  const projectsQuery = trpc.projects.getAll.useQuery()
  const usersQuery = trpc.users.getAll.useQuery()

  const [createOption, setCreateOption] = useState<"user" | "project">("user")

  const { data: usersData, isLoading: usersLoading } = usersQuery
  const { data: projectsData, isLoading: projectsLoading } = projectsQuery
  const { data: departmentsData, isLoading: departmentsLoading } = departmentsQuery

  if (!projectsData || projectsLoading || !departmentsData || departmentsLoading || !usersData || usersLoading) {
    return (
      <AppLayout showTopMenu>
        <Spacer size={theme.spaces.s5} />
        <RectPlaceholder />
      </AppLayout>
    )
  }

  const departments = departmentsData as Department[]
  const projects = projectsData as Project[]
  const users = usersData as User[]

  return (
    <AppLayout showTopMenu>
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
