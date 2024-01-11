import { useNavigate } from "react-router-dom"
import { LINKS } from "../../constants/Links"
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
import { LoginFormValues, useLoginFormSchema } from "../../utils/formSchemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const Login = () => {
  const navigate = useNavigate()
  const loginMutation = trpc.auth.login.useMutation()

  const { schema } = useLoginFormSchema()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  async function onSubmit(formValues: LoginFormValues) {
    try {
      await loginMutation.mutateAsync({
        username: formValues.orionLogin,
        password: formValues.password,
      })
      toasts.success("Logged in")
      navigate(LINKS.home)
    } catch (error) {
      if (isTRPCError(error)) {
        if (error.data?.code === "NOT_FOUND") {
          toasts.error("User with username: " + formValues.orionLogin + " not found")
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
        <SForm onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput
            label={"Orion login"}
            error={form.formState.errors.orionLogin ? "Orion login is required" : undefined}
            children={<input placeholder="orion-login" {...form.register("orionLogin")} />}
          />

          <Spacer size={theme.spaces.s4} />

          <PasswordInput
            label={"Password"}
            placeholder="******"
            error={form.formState.errors.password?.message}
            formRegisterProps={form.register("password")}
          />

          <Spacer size={theme.spaces.s4} />

          <Button variant="secondary" isFullWidth type="submit" isSubmitting={form.formState.isSubmitting}>
            Login
          </Button>
        </SForm>
      </Flex>
    </AuthLayout>
  )
}
