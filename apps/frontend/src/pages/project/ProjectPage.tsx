import { Spacer } from "../../components/Spacer"
import { AppLayout } from "../../components/layouts/appLayout/AppLayout"
import { theme } from "../../styles/stitches.config"
import { trpc } from "../../utils/trpc"
import RectPlaceholder from "../../components/placeholder/RectPlaceHolder"
import { useSafeNumberParam } from "../../hooks/params"
import { Project, User, Allocation, AllocationState, UserRole } from "shared"
import { ProjectPageContent } from "./ProjectPageContent"

export const ProjectPage = () => {
  const projectId = useSafeNumberParam("projectId")
  const allProjectsQuery = trpc.projects.getByUserId.useQuery()
  const projectQuery = trpc.projects.getById.useQuery({ projectId })
  const allocationsQuery = trpc.allocations.getByProjectId.useQuery({ projectId })
  const allUsersQuery = trpc.users.getAll.useQuery()
  const myselfQuery = trpc.users.myself.useQuery()

  const { data: usersData, isLoading: usersLoading } = allUsersQuery
  const { data: projectData, isLoading: projectLoading } = projectQuery
  const { data: allocationData, isLoading: allocationsLoading } = allocationsQuery
  const { data: allProjectsData, isLoading: allProjectsLoading } = allProjectsQuery
  const { data: myselfData, isLoading: myselfLoading } = myselfQuery

  if (
    !projectData ||
    projectLoading ||
    !allocationData ||
    allocationsLoading ||
    !usersData ||
    usersLoading ||
    !allProjectsData ||
    allProjectsLoading ||
    !myselfData ||
    myselfLoading
  ) {
    return (
      <AppLayout showTopMenu>
        <Spacer size={theme.spaces.s6} />
        <RectPlaceholder />
      </AppLayout>
    )
  }

  const { userRole, userId } = myselfData
  const users = usersData as User[]
  const filteredWorkers = users.filter((worker) =>
    allocationData.some((allocation) => allocation.workerId === worker.id)
  )
  const canEdit =
    userRole === UserRole.SECRETARIAT || projectData.managerId === userId || projectData.department.managerId === userId

  return (
    <AppLayout showTopMenu showCreateLink>
      <Spacer size={theme.spaces.s6} />
      <ProjectPageContent
        selectedProject={projectData}
        allProjects={allProjectsData}
        allocations={allocationData}
        workers={filteredWorkers}
        managerName={projectData.manager.fullName}
        departmentName={projectData.department.name}
        selfUserId={userId}
        canEdit={canEdit}
      />
    </AppLayout>
  )
}

export interface ProjectProps {
  selectedProject: Project
  allProjects: Project[]
  allocations: Allocation[]
  workers: User[]
  managerName: string
  departmentName: string
  selfUserId: number
  canEdit: boolean
}
