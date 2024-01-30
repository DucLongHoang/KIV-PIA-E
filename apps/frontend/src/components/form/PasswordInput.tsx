import { useState } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { FormInput } from "./FormInput"
import { PasswordHide, PasswordShow } from "src/styles/images"
import { theme } from "src/styles/stitches.config"
import { Flex } from "../Flex"
// import { PasswordInputRightContent } from "../form/PasswordInputRightContent"

interface Props {
  label: string
  error?: string
  placeholder?: string
  formRegisterProps?: UseFormRegisterReturn
}

export default function PasswordInput(props: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { formRegisterProps, label, error, placeholder } = props

  return (
    <FormInput
      label={label}
      error={error}
      rightContent={
        <Flex
          justify={"center"}
          align={"center"}
          style={{ padding: "10px" }}
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <PasswordHide height={theme.sizes.s10.value} />
          ) : (
            <PasswordShow height={theme.sizes.s10.value} />
          )}
        </Flex>
      }
    >
      <input type={isPasswordVisible ? "text" : "password"} placeholder={placeholder} {...formRegisterProps} />
    </FormInput>
  )
}
