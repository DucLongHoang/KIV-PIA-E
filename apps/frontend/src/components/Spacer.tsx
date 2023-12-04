import { styled, theme } from "../styles/stitches.config"
import { ObjectValues } from "../utils/types"

const SSpacer = styled("span", {
  display: "block",
})

type Props = {
  size: ObjectValues<typeof theme.spaces>
}

export function Spacer(props: Props) {
  const { size } = props
  return <SSpacer css={{ width: size, minWidth: size, height: size, minHeight: size }} />
}
