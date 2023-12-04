import { AppContainer } from "../../common/AppContainer"
import TopMenu from "./topMenu/TopMenu"

interface Props {
  children?: React.ReactNode
}

export const AppLayout = (props: Props) => {
  return (
    <AppContainer>
      <TopMenu />
      {props.children}
    </AppContainer>
  )
}
