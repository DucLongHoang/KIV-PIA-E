import { AppContainer } from "../../common/AppContainer"
import TopMenu from "./topMenu/TopMenu"

interface Props {
  children?: React.ReactNode
  showTopMenu?: boolean
}

export const AppLayout = (props: Props) => {
  const { children, showTopMenu } = props

  return (
    <AppContainer>
      {showTopMenu && <TopMenu />}
      {children}
    </AppContainer>
  )
}
