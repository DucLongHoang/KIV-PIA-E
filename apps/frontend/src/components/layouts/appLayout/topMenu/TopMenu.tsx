import { SContainer, SLogo } from "./TopMenu.styled"
// import UserMenu from "./userMenu/UserMenu"
import { Flex } from "../../../Flex"
import Text from "../../../Text"
import { Link } from "react-router-dom"
import { LINKS } from "../../../../constants/Links"
import { UserRole } from "shared"
import { ZCULogo } from "../../../../styles/images"
import { theme } from "../../../../styles/stitches.config"
import { Dropdown } from "../../../dropdown/Dropdown"

interface Props {
  userLogin: string
  userName: string
  userRole: UserRole
  showProjectDropdown?: boolean
}

function TopMenu({ userLogin, userName, userRole, showProjectDropdown }: Props) {
  return (
    <SContainer>
      <Flex justify="between" align="center" style={{ height: "inherit", width: "100%" }}>
        <Flex direction="row">
          <Link to={LINKS.home}>
            <SLogo />
          </Link>
        </Flex>

        {showProjectDropdown && <Dropdown selectedOption={""} options={["Project 1", "Project 2"]} />}
        <Flex direction="column" align="end">
          <Text type="textsLarge">{userName}</Text>
          <Text type="textsSmall">{userLogin}</Text>
          <Text type="textsSmall">{userRole}</Text>
        </Flex>
      </Flex>
    </SContainer>
  )
}

export default TopMenu
