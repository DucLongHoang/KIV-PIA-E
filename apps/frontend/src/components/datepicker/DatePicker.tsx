import { useState } from "react"
import { SDatePicker } from "./DatePicker.styled"
import "react-datepicker/dist/react-datepicker.css"
import { SLabel } from "../form/FormInput.styled"
import { Spacer } from "../Spacer"
import { theme } from "../../styles/stitches.config"

interface DatePickerProps {
  label?: string
  onChange: (date: Date) => void
  selected?: Date | null
  minDate?: Date
  placeholder?: string
}

export const DatePicker = ({ label, selected, onChange, minDate, placeholder }: DatePickerProps) => {
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
      />
    </>
  )
}
