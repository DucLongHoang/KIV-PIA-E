import React, { PropsWithChildren, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { trpc } from "../../utils/trpc"
import { Loading } from "../../pages/Loading"
import { LINKS } from "../../constants/Links"
import { UserRole } from "shared"
import { toasts } from "../toast/toasts"

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const myselfQuery = trpc.users.myself.useQuery()
  const navigate = useNavigate()

  const { data: user, isLoading, isError } = myselfQuery

  useEffect(() => {
    if (isError || !user || user.userRole !== UserRole.SECRETARIAT) {
      toasts.error("Redirecting to home page")
      navigate(LINKS.home)
    }
  }, [isError, navigate, user])

  if (isLoading) {
    return <Loading />
  }

  return <>{children}</>
}
