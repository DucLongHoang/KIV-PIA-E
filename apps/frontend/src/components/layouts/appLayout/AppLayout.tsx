import { Loading } from "../../../pages/Loading"
import { trpc } from "../../../utils/trpc"
import { AppContainer } from "../../common/AppContainer"
import TopMenu from "./topMenu/TopMenu"

interface Props {
  children?: React.ReactNode
  showTopMenu?: boolean
}

export const AppLayout = (props: Props) => {
  const { children, showTopMenu } = props

  const myselfQuery = trpc.users.myself.useQuery()

  const { data: userData, isLoading, isError } = myselfQuery

  if (isLoading) {
    return <Loading />
  }

  if (isError || !userData) {
    return <Loading />
  }

  const { userName, userLogin, userRole } = userData

  return (
    <AppContainer>
      {showTopMenu && <TopMenu userLogin={userLogin} userName={userName} userRole={userRole} />}
      {children}
    </AppContainer>
  )
}
