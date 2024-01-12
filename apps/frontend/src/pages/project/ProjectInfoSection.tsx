import Text from "../../components/Text"
import { theme } from "../../styles/stitches.config"
import { SCardHeader, SInfoTable, SInfoTableHeader, SInfoTableRowCard } from "./ProjectPage.styled"
import { Button } from "../../components/button/Button"
import { Edit } from "../../styles/images"
import { formatDate } from "../../utils/date"
import { useModal } from "../../hooks/useModal"
import { ProjectInfoEdit } from "./ProjectInfoEdit"

export interface Props {
  projectId: number
  projectName: string
  canEdit: boolean
  managerName: string
  departmentName: string
  from: Date
  to: Date | null
}

export const ProjectInfoSection = ({
  canEdit,
  managerName,
  departmentName,
  from,
  to,
  projectId,
  projectName,
}: Props) => {
  const infoHeaders = ["Manager", "From", "To", "Department"]
  const infoValues = [managerName, formatDate(from, "------"), formatDate(to, "------"), departmentName]

  const { setModal } = useModal()
  const showEditInfoModal = () =>
    setModal({
      modal: <ProjectInfoEdit projectId={projectId} projectName={projectName} from={from} to={to} />,
      isFullscreenOnMobile: true,
    })

  return (
    <>
      <SCardHeader>
        <Text type="headerH3">Project info</Text>
        {canEdit && (
          <Button
            variant="iconButton"
            style={{ height: theme.sizes.s6.value, backgroundColor: theme.colors.background.value }}
            children={<Edit height={theme.sizes.s4.value} />}
            onClick={showEditInfoModal}
          />
        )}
      </SCardHeader>

      <SInfoTable>
        <SInfoTableHeader>
          {infoHeaders.map((header) => (
            <Text key={header} type="textsLarge">
              {header}
            </Text>
          ))}
        </SInfoTableHeader>

        <SInfoTableRowCard>
          {infoValues.map((value) => (
            <Text key={value} type="textsSmall">
              {value}
            </Text>
          ))}
        </SInfoTableRowCard>
      </SInfoTable>
    </>
  )
}
