import { Logout, ZCULogo } from "../../../../styles/images"
import { styled, theme } from "../../../../styles/stitches.config"
import * as Toolbar from "@radix-ui/react-toolbar"

export const SContainer = styled(Toolbar.Root, {
  backgroundColor: theme.colors.white,
  boxShadow: theme.shadows.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: theme.spaces.s14,

  "@lg": {
    paddingLeft: theme.spaces.s6,
    paddingRight: theme.spaces.s6,
    height: theme.spaces.s27,
  },
})

export const SLogo = styled(ZCULogo, {
  height: theme.sizes.s20,
  width: "auto",
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "contain",
})

export const SLogout = styled(Logout, {
  height: theme.sizes.s12,
  width: "auto",
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "contain",
})
