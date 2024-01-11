import { PropsWithChildren } from "react"
import { styled, theme } from "../../styles/stitches.config"

export interface CardProps {
  variant?: "header" | "description" | "allocation"
}

export const SWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
})

export const SCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  boxShadow: theme.shadows.default,
  padding: theme.spaces.s10,

  variants: {
    isActive: {
      true: {
        backgroundColor: theme.colors.white,
      },
      false: {
        backgroundColor: theme.colors.gray,
      },
    },
    type: {
      header: {
        height: theme.sizes.s10,
        backgroundColor: theme.colors.transparent,
        boxShadow: "none",
        paddingTop: theme.spaces.s0,
        paddingBottom: theme.spaces.s0,
        paddingLeft: theme.spaces.s10,
        paddingRight: theme.spaces.s10,
      },
      description: {
        height: theme.sizes.s40,
      },
      allocation: {
        height: theme.sizes.s50,
      },
    },
  },

  defaultVariants: {
    isActive: "true",
  },
})

export const SAllocationCard = styled("div", {
  display: "flex",
  flexDirection: "row",

  justifyContent: "space-between",
})

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { variant, children } = props

  return <SCard type={variant}>{children}</SCard>
}
