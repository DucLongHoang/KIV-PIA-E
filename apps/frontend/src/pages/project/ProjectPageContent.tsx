import { Spacer } from "../../components/Spacer"
import { theme } from "../../styles/stitches.config"
import { SWrapper } from "./ProjectPage.styled"
import { useNavigate } from "react-router-dom"
import { LINKS } from "../../constants/Links"
import { ProjectProps } from "./ProjectPage"
import { ProjectHeaderSection } from "./ProjectHeaderSection"
import { ProjectInfoSection } from "./ProjectInfoSection"
import { ProjectDescriptionSection } from "./ProjectDescriptionSection"
import { ProjectAllocationSection } from "./ProjectAllocationSection"

export const ProjectPageContent = (props: ProjectProps) => {
  const navigate = useNavigate()
  const { name, description, from, to, id } = props.selectedProject
  const { allProjects, allocations, workers, selfUserId, managerName, departmentName, canEdit } = props

  const allProjectNames = allProjects.map((project) => project.name)

  const handleProjectChange = (projectName: string) => {
    const project = allProjects.find((project) => project.name === projectName)
    if (!project) return
    navigate(LINKS.project(project.id))
  }

  return (
    <SWrapper>
      <ProjectHeaderSection name={name} allProjectNames={allProjectNames} handleProjectChange={handleProjectChange} />

      <Spacer size={theme.spaces.s6} />

      <ProjectInfoSection
        projectName={name}
        projectId={id}
        canEdit={canEdit}
        managerName={managerName}
        departmentName={departmentName}
        from={from}
        to={to}
      />

      <Spacer size={theme.spaces.s10} />

      <ProjectDescriptionSection canEdit={canEdit} description={description} projectId={id} />

      <Spacer size={theme.spaces.s10} />

      <ProjectAllocationSection
        allocations={allocations}
        workers={workers}
        selfUserId={selfUserId}
        canEdit={canEdit}
        selectedProject={props.selectedProject}
      />
    </SWrapper>
  )
}
