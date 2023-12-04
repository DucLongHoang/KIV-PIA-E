import { SContainer } from "./TopMenu.styled"
// import UserMenu from "./userMenu/UserMenu"
import { Flex } from "../../../Flex"
import { Div } from "../../../Div"

interface Props {
  hideProjectSelect?: boolean
}

function TopMenu({ hideProjectSelect }: Props) {
  return (
    <SContainer>
      <Flex align="center" justify="center" css={{ height: "inherit" }}>
        <Flex align="center" justify="center" css={{ "@lg": { display: "none" } }}></Flex>
      </Flex>

      <Flex css={{ height: "inherit" }}>
        <Div css={{ display: "none", "@lg": { display: "flex" } }}></Div>
      </Flex>
    </SContainer>
  )
}

export default TopMenu
