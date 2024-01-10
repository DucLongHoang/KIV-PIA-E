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

export const Login = () => {
  const loginMutation = trpc.auth.login.useMutation()

  const [orion, setOrion] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleSubmit() {
    const result = await loginMutation.mutateAsync({
      username: orion,
      password: password,
    })

    console.log(result)

    // navigate(LINKS.home)
  }

  return (
    <AppLayout>
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
    </AppLayout>
  )
}
