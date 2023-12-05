import { useState } from "react"
// import { UseFormRegisterReturn } from "react-hook-form"
import { FormInput } from "./FormInput"
// import { PasswordInputRightContent } from "../form/PasswordInputRightContent"

interface Props {
  label: string
  error?: string
  placeholder?: string
  //   formRegisterProps?: UseFormRegisterReturn
}

export default function PasswordInput(props: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { /* formRegisterProps, */ label, error, placeholder } = props

  return (
    <FormInput
      label={label}
      error={error}
      //   rightContent={
      //     <PasswordInputRightContent isPasswordVisible={isPasswordVisible} setIsPasswordVisible={setIsPasswordVisible} />
      //   }
    >
      <input type={isPasswordVisible ? "text" : "password"} placeholder={placeholder} /* {...formRegisterProps} */ />
    </FormInput>
  )
}
