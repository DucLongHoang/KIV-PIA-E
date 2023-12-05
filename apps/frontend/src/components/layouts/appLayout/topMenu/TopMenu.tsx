import { SContainer } from "./TopMenu.styled"
// import UserMenu from "./userMenu/UserMenu"
import { Flex } from "../../../Flex"
import Text from "../../../Text"
import { Link } from "react-router-dom"
import { LINKS } from "../../../../constants/Links"

interface Props {
  hideProjectSelect?: boolean
}

function TopMenu({ hideProjectSelect }: Props) {
  const user = {
    id: 1,
    orionLogin: "duclong",
    email: "duclonghoang.dlh@gmail.com",
    fullName: "Duc Long hoang",
    password: "123456",
    workplace: "KIV",
  }
  const { orionLogin, fullName } = user

  return (
    <SContainer>
      <Flex justify="between" align="center" style={{ height: "inherit", width: "100%" }}>
        <Flex direction="row">
          <Link to={LINKS.home}>
            <Text type="headerH1">LOGO</Text>
          </Link>
        </Flex>

        <Flex direction="column" align="end">
          <Text type="textsLarge">{fullName}</Text>
          <Text type="textsSmall">{orionLogin}</Text>
        </Flex>
      </Flex>
    </SContainer>
  )
}

export default TopMenu
