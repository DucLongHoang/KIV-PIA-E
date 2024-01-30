import Text from "../../components/Text"
import { formatDate } from "../../utils/date"
import { SAllocationCard, SAllocationTable } from "./ProjectPage.styled"
import { Button } from "../../components/button/Button"
import { theme } from "../../styles/stitches.config"
import { Edit } from "../../styles/images"
import { useModal } from "../../hooks/useModal"
import { ProjectionAllocationEdit } from "./ProjectAllocationEdit"
import { Allocation, AllocationState, Project, User } from "src/types"

export interface Props {
  selectedProject: Project
  allocations: Allocation[]
  workers: User[]
  selfUserId: number
  canEdit: boolean
}

export const ProjectAllocationSection = ({ allocations, workers, selfUserId, canEdit, selectedProject }: Props) => {
  const allocationHeaders = ["Name", "Orion login", "Task", "Status", "Scope", "From", "To", "Relationship", ""]

  const { setModal } = useModal()

  return (
    <>
      <Text type="headerH3">Allocations</Text>
      <SAllocationTable>
        <SAllocationCard>
          {allocationHeaders.map((header) => (
            <Text key={header} type="textsLarge">
              {header}
            </Text>
          ))}
        </SAllocationCard>

        {workers.map((worker) => {
          const allocation = allocations.find((allocation) => allocation.workerId === worker.id)
          if (!allocation) return null

          const allocationState = evaluateAllocationState(selectedProject, allocation)
          const relationship = evaluateRelationship(selfUserId, worker, selectedProject)

          const allocationValues = [
            worker.fullName,
            worker.orionLogin,
            allocation.description,
            allocationState,
            allocation.scope,
            formatDate(allocation.from, "------"),
            formatDate(allocation.to, "------"),
            relationship,
          ]

          const showEditAllocationModal = () =>
            setModal({
              modal: (
                <ProjectionAllocationEdit
                  projectId={selectedProject.id}
                  projectName={selectedProject.name}
                  worker={worker}
                  allocation={allocation}
                />
              ),
              isFullscreenOnMobile: true,
            })

          return (
            <SAllocationCard key={worker.id}>
              {allocationValues.map((value) => (
                <Text key={value} type="textsSmall">
                  {value}
                </Text>
              ))}

              {canEdit ? (
                <Button
                  variant="iconButton"
                  style={{ height: theme.sizes.s6.value }}
                  children={<Edit height={theme.sizes.s4.value} onClick={showEditAllocationModal} />}
                />
              ) : null}
            </SAllocationCard>
          )
        })}
      </SAllocationTable>
    </>
  )
}

export const evaluateAllocationState = (project: Project, allocation: Allocation): AllocationState => {
  // Check if the allocation is in the draft phase
  if (allocation.state === AllocationState.DRAFT || allocation.state === AllocationState.CANCELLED) {
    return allocation.state
  }

  // If the allocation has from and to dates, check if it is active or past
  if (allocation.from && allocation.to) {
    if (!project.to || allocation.to <= project.to) {
      return AllocationState.ACTIVE
    } else {
      return AllocationState.PAST
    }
  }

  return AllocationState.CANCELLED
}

export const evaluateRelationship = (selfId: number, worker: User, project: Project) => {
  if (selfId === worker.id) return "self"
  if (project.managerId === worker.id) return "manager"
  if (worker.superiorId === selfId) return "subordinate"
  return "project worker"
}
