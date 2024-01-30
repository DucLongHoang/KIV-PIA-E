import React, { PropsWithChildren, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { trpc } from "../../utils/trpc"
import { Loading } from "../../pages/Loading"
import { LINKS } from "../../constants/Links"
import { toasts } from "../toast/toasts"
import { UserRole } from "src/types"

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const myselfQuery = trpc.users.myself.useQuery()
  const navigate = useNavigate()

  const { data: userData, isLoading, isError } = myselfQuery

  useEffect(() => {
    if (isError || !userData || userData.userRole !== UserRole.SECRETARIAT) {
      toasts.error("Redirecting to home page")
      navigate(LINKS.home)
    }
  }, [isError, navigate, userData])

  if (isLoading) {
    return <Loading />
  }

  return <>{children}</>
}
