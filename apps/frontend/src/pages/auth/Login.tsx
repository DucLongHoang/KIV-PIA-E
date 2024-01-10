import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LINKS } from "../../constants/Links"
import { AppLayout } from "../../components/layouts/appLayout/AppLayout"
import { Flex } from "../../components/Flex"
import { SForm } from "../../components/form/FormInput.styled"
import { FormInput } from "../../components/form/FormInput"
import PasswordInput from "../../components/form/PasswordInput"
import { Spacer } from "../../components/Spacer"
import { theme } from "../../styles/stitches.config"
import { Button } from "../../components/button/Button"
import { trpc } from "../../utils/trpc"
import { toasts } from "../../components/toast/toasts"
import { isTRPCError } from "../../utils/types"
import { AuthLayout } from "../../components/layouts/appLayout/AuthLayout"

export const Login = () => {
  const loginMutation = trpc.auth.login.useMutation()

  const [orion, setOrion] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleSubmit() {
    try {
      await loginMutation.mutateAsync({
        username: orion,
        password: password,
      })
      toasts.success("Logged in")
      navigate(LINKS.home)
    } catch (error) {
      if (isTRPCError(error)) {
        if (error.data?.code === "NOT_FOUND") {
          toasts.error("User with username: " + orion + " not found")
        }
        if (error.data?.code === "UNAUTHORIZED") {
          toasts.error("Incorrect password")
        }
      }
      toasts.error("Something went wrong.")
    }
  }

  return (
    <AuthLayout>
      <Spacer size={theme.spaces.s40} />
      <Flex justify={"center"} align={"center"}>
        <SForm
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <FormInput
            label={"Orion login"}
            children={<input placeholder="orion-login" value={orion} onChange={(e) => setOrion(e.target.value)} />}
          />

          <Spacer size={theme.spaces.s4} />

          {/* <PasswordInput label={"Password"} placeholder="******"/> */}
          <FormInput
            label={"Password"}
            children={<input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />}
          />

          <Spacer size={theme.spaces.s4} />

          <Button variant="secondary" isFullWidth type="submit">
            Login
          </Button>
        </SForm>
      </Flex>
    </AuthLayout>
  )
}
