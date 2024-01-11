import { styled, theme } from "../../styles/stitches.config"
import * as Dropdown from "@radix-ui/react-dropdown-menu"

export const STrigger = styled("button", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 0,

  height: "inherit",
  hover: {
    cursor: "pointer",
  },

  border: "none",
  outline: "none",
  backgroundColor: "transparent",
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
