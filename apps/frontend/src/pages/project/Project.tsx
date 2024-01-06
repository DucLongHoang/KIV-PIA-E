import { Spacer } from "../../components/Spacer"
import Text from "../../components/Text"
import { AppLayout } from "../../components/layouts/appLayout/AppLayout"
import { theme } from "../../styles/stitches.config"
import { Flex } from "../../components/Flex"
import * as DropDown from "@radix-ui/react-dropdown-menu"
import { SContent, STrigger } from "../../components/dropdown/Dropdown.styled"
import { trpc } from "../../utils/trpc"
import RectPlaceholder from "../../components/placeholder/RectPlaceHolder"
import { useSafeNumberParam } from "../../hooks/params"
import { Card, SAllocationCard, SWrapper } from "./Project.styled"

export const Project = () => {
  const projectId = useSafeNumberParam("projectId")
  const projectQuery = trpc.projects.getById.useQuery({ projectId })
  const allocationsQuery = trpc.allocations.getByProjectId.useQuery({ projectId })
  const workersQuery = trpc.users.getAll.useQuery()

  const { data: workersData, isLoading: workersLoading } = workersQuery
  const { data: projectData, isLoading: projectLoading } = projectQuery
  const { data: allocationData, isLoading: allocationsLoading } = allocationsQuery

  if (!projectData || projectLoading || !allocationData || allocationsLoading || !workersData || workersLoading) {
    return (
      <>
        <Spacer size={theme.spaces.s5} />
        <RectPlaceholder />
      </>
    )
  }

  const { id, name, description, from, to, managerId } = projectData
  const project = { id, name, description, from: new Date(from), to: !to ? null : new Date(to), managerId }

  const allocations = allocationData.map((allocation) => {
    const { id, projectId, workerId, scope, from, to, description } = allocation
    return {
      id,
      projectId,
      workerId,
      scope,
      from,
      to,
      description,
    } as AllocationType
  })

  const workers = workersData as UserType[]
  const filteredWorkers = workers.filter((worker) =>
    allocations.some((allocation) => allocation.workerId === worker.id)
  )

  return (
    <AppLayout>
      <Spacer size={theme.spaces.s6} />

      <ProjectContent project={project} allocations={allocations} workers={filteredWorkers} />
      <SAllocationCard />
    </AppLayout>
  )
}

type UserType = {
  id: number
  orionLogin: string
  email: string
  fullName: string
  password: string
  workplace: string
}

type ProjectType = {
  id: number
  name: string
  description?: string | null
  from: Date
  to?: Date | null
  managerId: number
}

type AllocationType = {
  id: number
  projectId: number
  workerId: number
  scope: number
  from: Date
  to?: Date | null
  description?: string | null
}

interface ProjectProps {
  project: ProjectType
  allocations: AllocationType[]
  workers: UserType[]
}

const ProjectContent = (props: ProjectProps) => {
  const { id, name, description, from, to, managerId } = props.project
  const allocations = props.allocations
  const workers = props.workers

  return (
    <SWrapper>
      <Card variant="header">
        <Flex direction={"row"} align={"center"} justify={"between"}>
          <Flex direction={"row"} align={"baseline"} justify={"center"}>
            <Text type="headerH2">{name}</Text>
            <Spacer size={theme.spaces.s1} />
            <Text type="headerH3">(id: {id})</Text>
          </Flex>
          <DropDown.Root>
            <STrigger>
              <Text type="textsSmall">{name}</Text>
            </STrigger>
            <SContent>Content</SContent>
          </DropDown.Root>
        </Flex>
      </Card>

      <Spacer size={theme.spaces.s6} />

      <Text type="headerH3">Description</Text>
      <Card variant="description">
        <Text type="textsLarge">{description}</Text>
      </Card>

      <Spacer size={theme.spaces.s10} />

      <Text type="headerH3">Allocations</Text>
      <Card variant="allocation">
        {workers.map((worker) => {
          const allocation = allocations.find((allocation) => allocation.workerId === worker.id)

          return (
            <SAllocationCard>
              <Text type="textsLarge">{worker.orionLogin}</Text>
              <Spacer size={theme.spaces.s1} />
              <Text type="textsLarge">{worker.fullName}</Text>
              <Spacer size={theme.spaces.s1} />
              <Text type="textsLarge">{allocation?.scope}</Text>
            </SAllocationCard>
          )
        })}
      </Card>
    </SWrapper>
  )
}
