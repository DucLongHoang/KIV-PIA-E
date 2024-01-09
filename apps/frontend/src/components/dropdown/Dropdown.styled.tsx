import { styled, theme } from "../../styles/stitches.config"
import * as Dropdown from "@radix-ui/react-dropdown-menu"

export const STrigger = styled(Dropdown.Trigger, {
  border: "unset",
  outline: "unset",
  backgroundColor: theme.colors.white,
  boxShadow: theme.shadows.default,

  minWidth: theme.spaces.s80,
  paddingInline: theme.spaces.s6,
  paddingTop: theme.spaces.s4,
  paddingBottom: theme.spaces.s4,
  height: "inherit",
  alignItems: "center",

  hover: {
    cursor: "pointer",
  },

  display: "none",
  "@lg": {
    display: "flex",
    justifyContent: "spaces-between",
  },
})

export const SContent = styled(Dropdown.Content, {
  minWidth: theme.spaces.s80,
  backgroundColor: theme.colors.white,
  boxShadow: theme.shadows.default,
  zIndex: 1,
})

export const SDropdownItem = styled(Dropdown.Item, {
  display: "flex",
  borderStyle: "solid",
  borderWidth: theme.sizes.spx,
  borderColor: theme.colors.transparent,

  "&:hover": {
    cursor: "pointer",
    borderColor: theme.colors.bad,
  },
})
