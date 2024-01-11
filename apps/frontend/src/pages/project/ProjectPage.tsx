import { Spacer } from "../../components/Spacer"
import Text from "../../components/Text"
import { AppLayout } from "../../components/layouts/appLayout/AppLayout"
import { theme } from "../../styles/stitches.config"
import { Flex } from "../../components/Flex"
import { trpc } from "../../utils/trpc"
import RectPlaceholder from "../../components/placeholder/RectPlaceHolder"
import { useSafeNumberParam } from "../../hooks/params"
import { Card, SAllocationCard, SWrapper } from "./ProjectPage.styled"
import { Project, User, Allocation } from "shared"
import { Dropdown } from "../../components/dropdown/Dropdown"
import { useNavigate } from "react-router-dom"
import { LINKS } from "../../constants/Links"

export const ProjectPage = () => {
  const projectId = useSafeNumberParam("projectId")
  const allProjectsQuery = trpc.projects.getByUserId.useQuery()
  const projectQuery = trpc.projects.getById.useQuery({ projectId })
  const allocationsQuery = trpc.allocations.getByProjectId.useQuery({ projectId })
  const workersQuery = trpc.users.getAll.useQuery()

  const { data: workersData, isLoading: workersLoading } = workersQuery
  const { data: projectData, isLoading: projectLoading } = projectQuery
  const { data: allocationData, isLoading: allocationsLoading } = allocationsQuery
  const { data: allProjectsData, isLoading: allProjectsLoading } = allProjectsQuery

  if (
    !projectData ||
    projectLoading ||
    !allocationData ||
    allocationsLoading ||
    !workersData ||
    workersLoading ||
    !allProjectsData ||
    allProjectsLoading
  ) {
    return (
      <AppLayout showTopMenu>
        <Spacer size={theme.spaces.s6} />
        <RectPlaceholder />
      </AppLayout>
    )
  }

  const workers = workersData as User[]
  const filteredWorkers = workers.filter((worker) =>
    allocationData.some((allocation) => allocation.workerId === worker.id)
  )

  return (
    <AppLayout showTopMenu showCreateLink>
      <Spacer size={theme.spaces.s6} />
      <ProjectPageContent
        selectedProject={projectData}
        allProjects={allProjectsData}
        allocations={allocationData}
        workers={filteredWorkers}
      />
    </AppLayout>
  )
}

interface ProjectProps {
  selectedProject: Project
  allProjects: Project[]
  allocations: Allocation[]
  workers: User[]
}

const ProjectPageContent = (props: ProjectProps) => {
  const navigate = useNavigate()
  const { id, name, description, from, to, managerId } = props.selectedProject
  const allProjects = props.allProjects
  const allocations = props.allocations
  const workers = props.workers

  const allProjectNames = allProjects.map((project) => project.name)
  const handleProjectChange = (projectName: string) => {
    const project = allProjects.find((project) => project.name === projectName)
    if (!project) return
    navigate(LINKS.project(project.id))
  }

  return (
    <SWrapper>
      <Card variant="header">
        <Flex direction={"row"} align={"center"} justify={"between"}>
          <Flex direction={"row"} align={"baseline"} justify={"center"}>
            <Text type="headerH2">{name}</Text>
            <Spacer size={theme.spaces.s1} />
            <Text type="headerH3">(id: {id})</Text>
          </Flex>
          {<Dropdown selectedOption={name} options={allProjectNames} setSelectedOption={handleProjectChange} />}
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
            <SAllocationCard key={worker.id}>
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
