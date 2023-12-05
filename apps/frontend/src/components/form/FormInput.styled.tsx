import { Error } from "../../styles/images"
import { fontVariants, styled, theme } from "../../styles/stitches.config"
import { Flex } from "../Flex"

export const SWrapper = styled("div", {
  width: "100%",

  "& input": {
    ...fontVariants.inputs,

    width: "100%",

    borderStyle: "solid",
    borderColor: theme.colors.white,
    borderWidth: theme.spaces.spx,

    backgroundColor: theme.colors.white,

    outline: "none",

    "&:focus": {
      borderColor: theme.colors.secondary,
    },

    "&::placeholder": {
      ...fontVariants.placeholders,
    },
  },

  variants: {
    hasError: {
      true: {
        "& input": {
          borderColor: theme.colors.errors,
          "&:focus": {
            borderColor: theme.colors.errors,
          },
        },
      },
    },
    hasRightContent: {
      true: {
        "& input": {
          paddingRight: theme.spaces.s16,
        },
      },
    },
    size: {
      default: {
        "& input": {
          paddingLeft: theme.spaces.s6,
          paddingRight: theme.spaces.s6,
          height: theme.spaces.s14,

          boxShadow: theme.shadows.medium,
        },
      },
      small: {
        "& input": {
          paddingLeft: "unset",
          paddingRight: "unset",
          height: "unset",

          boxShadow: "unset",
        },
      },
    },
  },

  defaultVariants: {
    size: "default",
  },
})

export const SInputWrapper = styled("div", {
  display: "flex",
  position: "relative",
  width: "100%",
})

export const SLabel = styled("label", {
  ...fontVariants.headerH5,
  marginLeft: theme.spaces.s6,
})

export const SErrorWrapper = styled(Flex, {
  color: theme.colors.errors,

  variants: {
    size: {
      default: {
        marginLeft: theme.spaces.s6,
      },
      small: {
        marginLeft: "initial",
      },
    },
  },

  defaultVariants: {
    size: "default",
  },
})

export const SErrorIcon = styled(Error, {
  flexShrink: 0,

  width: theme.spaces.s4,
  height: theme.spaces.s4,
})

export const SRightContentWrapper = styled("div", {
  position: "absolute",
  right: 0,
  top: 0,
  bottom: 0,
  width: theme.spaces.s14,
})

export const SForm = styled("form", { width: theme.spaces.s80 })
