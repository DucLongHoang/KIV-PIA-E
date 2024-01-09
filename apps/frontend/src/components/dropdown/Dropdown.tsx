import { SLabel } from "../form/FormInput.styled"
import { Spacer } from "../Spacer"
import { theme } from "../../styles/stitches.config"
import * as RadixDropdown from "@radix-ui/react-dropdown-menu"
import { SContent, SDropdownItem, STrigger } from "./Dropdown.styled"
import Text from "../Text"

export interface DropdownProps {
  options: string[]
  label?: string
  placeholder?: string
  selectedOption?: string
  setSelectedOption?: (option: string) => void
}

export const Dropdown = ({ label, options, placeholder, selectedOption, setSelectedOption }: DropdownProps) => {
  return (
    <>
      {label && (
        <>
          <SLabel>{label}</SLabel>
          <Spacer size={theme.spaces.s4} />
        </>
      )}

      <RadixDropdown.Root>
        <STrigger>
          <Text type="placeholders">{selectedOption ?? placeholder}</Text>
        </STrigger>
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
