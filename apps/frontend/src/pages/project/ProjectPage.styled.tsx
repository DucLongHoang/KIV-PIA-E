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

export const SCardHeader = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
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
        backgroundColor: theme.colors.transparent,
        boxShadow: "none",
        paddingTop: theme.spaces.s0,
        paddingBottom: theme.spaces.s0,
        paddingLeft: theme.spaces.s10,
        paddingRight: theme.spaces.s10,
      },
      description: {},
      allocation: {
        height: theme.sizes.s50,
      },
    },
  },

  defaultVariants: {
    isActive: "true",
  },
})

export const SInfoTable = styled("div", {
  backgroundColor: theme.colors.white,
  display: "grid",
  boxShadow: theme.shadows.default,
  padding: theme.spaces.s10,
  gridTemplateColumns: "1fr 1fr 1fr  auto",
  gridColumnGap: theme.spaces.s3.value,
})

export const SInfoTableHeader = styled("div", {
  display: "contents",
  borderBottom: `2px solid ${theme.colors.gray.value}`,
  paddingBottom: theme.spaces.s2,
  marginBottom: theme.spaces.s3,
})

export const SInfoTableRowCard = styled("div", {
  display: "contents",
  padding: theme.spaces.s1,
  borderBottom: `1px solid ${theme.colors.gray}`,
  "&:last-child": {
    borderBottom: "none",
  },
  "&:hover": {
    backgroundColor: theme.colors.gray,
  },
})

export const SAllocationTable = styled("div", {
  backgroundColor: theme.colors.white,
  display: "grid",
  boxShadow: theme.shadows.default,
  padding: theme.spaces.s10,
  gridTemplateColumns: "auto 1fr auto 1fr 1fr 1fr 1fr 1fr auto",
  gridColumnGap: theme.spaces.s3.value,
})

export const SAllocationTableHeader = styled("div", {
  display: "contents",
  borderBottom: `2px solid ${theme.colors.gray.value}`,
  paddingBottom: theme.spaces.s2,
  marginBottom: theme.spaces.s3,
})

export const SAllocationCard = styled("div", {
  display: "contents",
  padding: theme.spaces.s1,
  borderBottom: `1px solid ${theme.colors.gray}`,
  "&:last-child": {
    borderBottom: "none",
  },
  "&:hover": {
    backgroundColor: theme.colors.gray,
  },
})

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { variant, children } = props

  return <SCard type={variant}>{children}</SCard>
}
