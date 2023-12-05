import { styled, theme } from "../../../../styles/stitches.config"
import * as Toolbar from "@radix-ui/react-toolbar"

export const SContainer = styled(Toolbar.Root, {
  backgroundColor: theme.colors.white,
  boxShadow: theme.shadows.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: theme.spaces.s14,

  // paddingRight: theme.spaces.s4,

  "@lg": {
    paddingLeft: theme.spaces.s6,
    paddingRight: theme.spaces.s6,
    height: theme.spaces.s17,
  },
})
