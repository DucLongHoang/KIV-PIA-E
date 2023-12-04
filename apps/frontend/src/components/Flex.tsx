import { styled } from "../styles/stitches.config"

export const Flex = styled("div", {
  display: "flex",

  variants: {
    justify: {
      around: { justifyContent: "space-around" },
      between: { justifyContent: "space-between" },
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      stretch: { justifyContent: "stretch" },
      none: {},
    },
    wrap: {
      wrap: { flexWrap: "wrap" },
      wrapReverse: { flexWrap: "wrap-reverse" },
      nowrap: { flexWrap: "nowrap" },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      baseline: { alignItems: "baseline" },
      none: {},
    },
    direction: {
      row: { flexDirection: "row" },
      column: { flexDirection: "column" },
      columnReverse: { flexDirection: "column-reverse" },
      rowReverse: { flexDirection: "row-reverse" },
    },
  },
  defaultVariants: {
    direction: "row",
    align: "none",
    wrap: "nowrap",
    justify: "none",
  },
})
