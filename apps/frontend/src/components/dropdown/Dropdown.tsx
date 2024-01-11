import { SLabel } from "../form/FormInput.styled"
import { Spacer } from "../Spacer"
import { theme } from "../../styles/stitches.config"
import * as RadixDropdown from "@radix-ui/react-dropdown-menu"
import { SContent, SDropdownItem, STrigger } from "./Dropdown.styled"
import Text from "../Text"
import { UseFormRegisterReturn } from "react-hook-form"
import { FormInput } from "../form/FormInput"

export interface DropdownProps {
  options: string[]
  label?: string
  error?: string
  placeholder?: string
  selectedOption?: string
  setSelectedOption?: (option: string) => void
  formRegisterProps?: UseFormRegisterReturn
}

export const Dropdown = ({
  label,
  error,
  options,
  placeholder,
  selectedOption,
  formRegisterProps,
  setSelectedOption,
}: DropdownProps) => {
  return (
    <>
      {label && (
        <>
          <SLabel>{label}</SLabel>
          <Spacer size={theme.spaces.s4} />
        </>
      )}

      <RadixDropdown.Root>
        <RadixDropdown.Trigger asChild>
          <STrigger>
            <FormInput error={error}>
              <input placeholder={placeholder} value={selectedOption} {...formRegisterProps} />
            </FormInput>
          </STrigger>
        </RadixDropdown.Trigger>
        <SContent>
          {options.map((option) => {
            return <DropdownItem key={option} option={option} setSelectedOption={setSelectedOption} />
          })}
          <RadixDropdown.Arrow />
        </SContent>
      </RadixDropdown.Root>
    </>
  )
}

interface DropdownItemProps {
  option: string
  setSelectedOption?: (option: string) => void
}

const DropdownItem = ({ option, setSelectedOption }: DropdownItemProps) => {
  return (
    <SDropdownItem onClick={() => setSelectedOption?.(option)}>
      <Text type="textsLarge">{option}</Text>
    </SDropdownItem>
  )
}
