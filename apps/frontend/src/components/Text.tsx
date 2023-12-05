import { ElementType, PropsWithChildren } from "react"
import { ColorType, CSSProp, fontVariants, styled, theme } from "../styles/stitches.config"

const StyledSpan = styled("span", {
  variants: {
    type: fontVariants,
  },
})

export type TextType = keyof typeof fontVariants

interface Props {
  type: TextType
  color?: ColorType
  css?: CSSProp
  as?: ElementType
}

export function Text(props: PropsWithChildren<Props>) {
  const { type, children, color, css, as } = props
  const cssColor = color ? theme.colors[color] : undefined

  return (
    <StyledSpan type={type} css={{ ...css, color: cssColor }} as={as}>
      {children}
    </StyledSpan>
  )
}

export default Text
