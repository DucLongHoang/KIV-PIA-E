import Text from "../../components/Text"
import { Button } from "../../components/button/Button"
import { Edit } from "../../styles/images"
import { theme } from "../../styles/stitches.config"
import { Card, SCardHeader } from "./ProjectPage.styled"
import { useModal } from "../../hooks/useModal"
import { ProjectDescriptionEdit } from "./ProjectDescriptionEdit"

export interface Props {
  projectId: number
  canEdit: boolean
  description: string | null
}

export const ProjectDescriptionSection = ({ canEdit, description, projectId }: Props) => {
  const { setModal } = useModal()

  const showEditDescriptionModal = () =>
    setModal({
      modal: <ProjectDescriptionEdit description={description} projectId={projectId} />,
      isFullscreenOnMobile: true,
    })

  return (
    <>
      <SCardHeader>
        <Text type="headerH3">Description</Text>
        {canEdit && (
          <Button
            variant="iconButton"
            style={{ height: theme.sizes.s6.value, backgroundColor: theme.colors.background.value }}
            children={<Edit height={theme.sizes.s4.value} />}
            onClick={showEditDescriptionModal}
          />
        )}
      </SCardHeader>
      <Card variant="description">
        <Text type="textsLarge">{description}</Text>
      </Card>
    </>
  )
}
