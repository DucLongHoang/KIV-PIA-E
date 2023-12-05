import { ComponentProps, PropsWithChildren } from "react"
import { PulseLoader } from "react-spinners"
import { CSSProp, fontVariants, styled, theme } from "../../styles/stitches.config"

const SButton = styled("button", {
  height: theme.sizes.s14,
  width: theme.sizes.s75,
  paddingLeft: theme.sizes.s8,
  paddingRight: theme.sizes.s8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: theme.shadows.medium,
  cursor: "pointer",
  "&:hover": {
    opacity: 0.85,
  },
  variants: {
    variant: {
      primary: {
        ...fontVariants.buttons,
        border: `3px solid ${theme.colors.secondary}`,
        backgroundColor: theme.colors.secondary,
        "&:active": {
          border: `3px solid ${theme.colors.secondaryTexts}`,
          backgroundColor: theme.colors.secondaryTexts,
          transform: "translate(2px, 2px)",
          opacity: 1,
        },
        "&:disabled": {
          ...fontVariants.disabledButtons,
          border: `3px solid ${theme.colors.lines}`,
          backgroundColor: theme.colors.lines,
          cursor: "not-allowed",
          transform: "translate(0px, 0px)",
          opacity: 1,
        },
      },
      secondary: {
        ...fontVariants.buttons,
        border: `3px solid ${theme.colors.secondary}`,
        backgroundColor: theme.colors.white,
        "&:active": {
          border: `3px solid ${theme.colors.secondaryTexts}`,
          backgroundColor: theme.colors.lines,
          transform: "translate(2px, 2px)",
          opacity: 1,
        },
        "&:disabled": {
          ...fontVariants.disabledButtons,
          border: `3px solid ${theme.colors.lines}`,
          backgroundColor: theme.colors.lines,
          cursor: "not-allowed",
          transform: "translate(0px, 0px)",
          opacity: 1,
        },
      },
    },
    isFullWidth: {
      true: {
        width: "100%",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

interface Props {
  variant?: "primary" | "secondary"
  disabled?: boolean
  isFullWidth?: boolean
  type?: Pick<ComponentProps<"button">, "type">["type"]
  onClick?: Pick<ComponentProps<"button">, "onClick">["onClick"]
  isSubmitting?: boolean
  style?: Pick<ComponentProps<"button">, "style">["style"]
  css?: CSSProp
}

export const Button = ({ children, isSubmitting, ...props }: PropsWithChildren<Props>) => (
  <SButton {...props} disabled={isSubmitting ? true : props.disabled}>
    {isSubmitting ? <PulseLoader size={theme.sizes.s4.value} color={theme.colors.textsDisabled.value} /> : children}
  </SButton>
)
