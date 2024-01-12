import { Cross } from "../../styles/images"
import { CSSProp, styled, theme } from "../../styles/stitches.config"
import * as Modal from "@radix-ui/react-dialog"

export const SOverlay = styled(Modal.Overlay, {
  position: "fixed",
  inset: 0,
  backgroundColor: theme.colors.texts,
})

const defaultContentPositioning: CSSProp = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
}

export const SContent = styled(Modal.Content, {
  backgroundColor: theme.colors.white,
  boxShadow: theme.shadows.default,
  padding: theme.spaces.s14,
  maxHeight: "100%",

  "&:focus": { outline: "none" },
  overflow: "auto",

  position: "fixed",

  variants: {
    isFullscreenOnMobile: {
      true: {
        top: 0,
        left: 0,
        width: "stretch",
        height: "100%",

        "@sm": {
          ...defaultContentPositioning,
        },
      },
      false: {
        ...defaultContentPositioning,
      },
    },
  },

  defaultVariants: {
    isFullscreenOnMobile: "true",
  },
})

export const SCloseButton = styled("button", {
  all: "unset",

  position: "absolute",
  top: theme.spaces.s4,
  right: theme.spaces.s4,

  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  hover: {
    cursor: "pointer",
  },
})

export const SClose = styled(Cross, {
  width: theme.spaces.s6,
  height: theme.spaces.s6,
  color: theme.colors.errors,
})
