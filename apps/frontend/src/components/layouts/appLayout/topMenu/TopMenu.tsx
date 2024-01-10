import { SContainer, SLogo, SLogout } from "./TopMenu.styled"
import { Flex } from "../../../Flex"
import Text from "../../../Text"
import { Link, useNavigate } from "react-router-dom"
import { LINKS } from "../../../../constants/Links"
import { UserRole } from "shared"
import { trpc } from "../../../../utils/trpc"
import { Button } from "../../../button/Button"
import { theme } from "../../../../styles/stitches.config"
import { Spacer } from "../../../Spacer"
import { toasts } from "../../../toast/toasts"

interface Props {
  userLogin: string
  userName: string
  userRole: UserRole
  showCreateLink?: boolean
}

function TopMenu({ userLogin, userName, userRole, showCreateLink }: Props) {
  const logoutMutation = trpc.auth.logout.useMutation()
  const navigate = useNavigate()

  const isAdmin = userRole === UserRole.SECRETARIAT

  const handleLogout = async () => {
    await logoutMutation.mutateAsync()
    toasts.success("You have been logged out")
    navigate(LINKS.login)
  }

  return (
    <SContainer>
      <Flex justify="between" align="center" style={{ height: "inherit", width: "100%" }}>
        <Flex direction="row">
          <Link to={LINKS.home}>
            <SLogo />
          </Link>
        </Flex>

        <Flex direction="row" align="center">
          {isAdmin && showCreateLink && (
            <>
              <Link to={LINKS.create}>
                <Text type="textsSmall">Create</Text>
              </Link>
              <Spacer size={theme.spaces.s4} />
            </>
          )}
          <Flex direction="column" align="end">
            <Text type="textsLarge">{userName}</Text>
            <Text type="textsSmall">{userLogin}</Text>
            <Text type="textsSmall">{userRole}</Text>
          </Flex>
          <Spacer size={theme.spaces.s4} />
          <Button variant="iconButton" children={<SLogout />} onClick={handleLogout} />
        </Flex>
      </Flex>
    </SContainer>
  )
}

export default TopMenu
