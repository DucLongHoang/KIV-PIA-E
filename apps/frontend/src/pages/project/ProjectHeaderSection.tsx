import Text from "../../components/Text"
import { Flex } from "../../components/Flex"
import { Card } from "./ProjectPage.styled"
import { Dropdown } from "../../components/dropdown/Dropdown"

export interface ProjectHeaderSectionProps {
  name: string
  allProjectNames: string[]
  handleProjectChange: (projectName: string) => void
}

export const ProjectHeaderSection = ({ name, allProjectNames, handleProjectChange }: ProjectHeaderSectionProps) => {
  return (
    <Card variant="header">
      <Flex direction={"row"} align={"center"} justify={"between"}>
        <Flex direction={"row"} align={"baseline"} justify={"center"}>
          <Text type="headerH2">{name}</Text>
        </Flex>
        {<Dropdown selectedOption={name} options={allProjectNames} setSelectedOption={handleProjectChange} />}
      </Flex>
    </Card>
  )
}
