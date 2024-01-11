import * as Separator from "@radix-ui/react-separator"
import { styled, theme } from "../styles/stitches.config"

export default styled(Separator.Root, {
  variants: {
    color: {
      dark: {
        backgroundColor: theme.colors.lines,
      },
      light: {
        backgroundColor: theme.colors.white,
      },
      gray: {
        backgroundColor: theme.colors.gray,
      },
    },

    size: {
      normal: {
        "&[data-orientation=horizontal]": { height: 1, width: "100%" },
        "&[data-orientation=vertical]": { height: "100%", width: 1 },
      },
      large: {
        "&[data-orientation=horizontal]": { height: 2, width: "100%" },
        "&[data-orientation=vertical]": { height: "100%", width: 2 },
      },
      extraLarge: {
        "&[data-orientation=horizontal]": { height: 3, width: "100%" },
        "&[data-orientation=vertical]": { height: "100%", width: 3 },
      },
    },
  },

  defaultVariants: {
    color: "dark",
    size: "normal",
  },
})
