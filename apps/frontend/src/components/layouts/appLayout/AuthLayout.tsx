import { PropsWithChildren } from "react"
import { AppContainer } from "../../common/AppContainer"

export function AuthLayout(props: PropsWithChildren) {
  return <AppContainer>{props.children}</AppContainer>
}
