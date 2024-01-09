import React, { useState } from "react"
import DatePicker from "react-datepicker"
import { styled, theme } from "../../styles/stitches.config"

export const SDatePicker = styled(DatePicker, {
  border: "unset",
  outline: "unset",
  backgroundColor: theme.colors.white,
  boxShadow: theme.shadows.default,

  minWidth: theme.spaces.s60,
  paddingTop: theme.spaces.s4,
  paddingBottom: theme.spaces.s4,
  paddingLeft: theme.spaces.s6,

  color: "rgb(117,117,117,1)",
  fontSize: "16px",
  fontFamily: "Poppins",
  fontWeight: 400,

  hover: {
    cursor: "pointer",
  },
})
