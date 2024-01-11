import Text from "../../components/Text"
import { Button } from "../../components/button/Button"
import { Edit } from "../../styles/images"
import { theme } from "../../styles/stitches.config"
import { Card, SCardHeader } from "./ProjectPage.styled"

export interface Props {
  canEdit: boolean
  description: string | null
}

export const ProjectDescriptionSection = ({ canEdit, description }: Props) => {
  return (
    <>
      <SCardHeader>
        <Text type="headerH3">Description</Text>
        {canEdit && (
          <Button
            variant="iconButton"
            style={{ height: theme.sizes.s6.value, backgroundColor: theme.colors.background.value }}
            children={<Edit height={theme.sizes.s4.value} />}
          />
        )}
      </SCardHeader>
      <Card variant="description">
        <Text type="textsLarge">{description}</Text>
      </Card>
    </>
  )
}
