import { PropsWithChildren, useEffect } from "react"
import { trpc } from "../../utils/trpc"
import { useNavigate } from "react-router-dom"
import { Loading } from "../../pages/Loading"
import { LINKS } from "../../constants/Links"
import { toasts } from "../toast/toasts"

export const AuthRoute = ({ children }: PropsWithChildren) => {
  const myselfQuery = trpc.users.myself.useQuery()
  const navigate = useNavigate()

  const { isLoading, isError } = myselfQuery

  useEffect(() => {
    if (isError) {
      toasts.error("Redirecting to login page")
      navigate(LINKS.login)
    }
  }, [isError, navigate])

  if (isLoading) {
    return <Loading />
  }

  return <>{children}</>
}
