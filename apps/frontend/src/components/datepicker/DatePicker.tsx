import { SDatePicker } from "./DatePicker.styled"
import "react-datepicker/dist/react-datepicker.css"
import { SErrorIcon, SErrorWrapper, SLabel } from "../form/FormInput.styled"
import { Spacer } from "../Spacer"
import { theme } from "../../styles/stitches.config"
import { UseFormRegisterReturn } from "react-hook-form"
import Text from "../Text"

interface DatePickerProps {
  label?: string
  onChange: (date: Date) => void
  selected?: Date | null
  minDate?: Date
  placeholder?: string
  error?: string
  formRegisterProps?: UseFormRegisterReturn
}

export const DatePicker = ({
  label,
  selected,
  onChange,
  minDate,
  placeholder,
  error,
  formRegisterProps,
}: DatePickerProps) => {
  return (
    <>
      {label && (
        <>
          <SLabel>{label}</SLabel>
          <Spacer size={theme.spaces.s4} />
        </>
      )}
      <SDatePicker
        isClearable
        dateFormat={"dd.MM.yyyy"}
        selected={selected}
        onChange={onChange}
        minDate={minDate}
        placeholderText={placeholder}
      >
        <input type="hidden" value={selected?.toString()} {...formRegisterProps} />
      </SDatePicker>

      {error && (
        <>
          <Spacer size={theme.spaces.s3} />

          <SErrorWrapper align="center" justify="start" size={"default"}>
            <SErrorIcon />

            <Spacer size={theme.spaces.s3} />

            <Text
              type="headerH5Negative"
              css={{
                // TODO: this will be clamped to 2 lines and will be truncated in future
                ellipsis: {},
              }}
            >
              {error}
            </Text>
          </SErrorWrapper>
        </>
      )}
    </>
  )
}
