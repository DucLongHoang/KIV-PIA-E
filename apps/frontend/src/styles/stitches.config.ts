import "@fontsource/poppins/400.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import { createStitches } from '@stitches/react'
import type * as Stitches from "@stitches/react"

const spacings = {
    s0: "0",
    spx: "1px",
    s0_5: "2px",
    s1: "4px",
    s1_5: "6px",
    s2: "8px",
    s2_5: "10px",
    s3: "12px",
    s3_5: "14px",
    s4: "16px",
    s4_5: "18px",
    s5: "20px",
    s5_5: "22px",
    s6: "24px",
    s6_5: "26px",
    s7: "28px",
    s7_5: "30px",
    s8: "32px",
    s8_5: "34px",
    s9: "36px",
    s10: "40px",
    s10_5: "42px",
    s11: "44px",
    s11_5: "46px",
    s12: "48px",
    s12_5: "50px",
    s13_5: "54px",
    s14: "56px",
    s15: "60px",
    s15_5: "62px",
    s16: "64px",
    s17: "68px",
    s18: "72px",
    s20: "80px",
    s21: "84px",
    s23: "92px",
    s24: "96px",
    s25: "100px",
    s27: "108px",
    s27_5: "110px",
    s28: "112px",
    s30: "120px",
    s32: "128px",
    s35: "140px",
    s36: "144px",
    s38: "152px",
    s40: "160px",
    s41: "164px",
    s42: "168px",
    s44: "176px",
    s48: "192px",
    s50: "200px",
}

export const media = {
    xs: 360,
    sm: 576,
    md: 825,
    lg: 1024,
    xl: 1201,
    xxl: 1695,
  }

export const stitches = createStitches({
  theme: {
    spaces: spacings,
    sizes: spacings,
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      background: "#F6F8F9",
      good: "#affc5d",
      bad: "#ffa913",
    },
    fonts: {
      default: "Poppins",
    },
    fontWeights: {
      regular: 400,
      semiBold: 600,
      bold: 700,
    },
    fontSizes: {
      xSmall: "12px",
      small: "14px",
      regular: "16px",
      medium: "18px",
    },
  },
  media: {
    xs: `(min-width: ${media.xs}px)`,
    sm: `(min-width: ${media.sm}px)`,
    md: `(min-width: ${media.md}px)`,
    lg: `(min-width: ${media.lg}px)`,
    xl: `(min-width: ${media.xl}px)`,
  },
  utils: {
    hover: (css: Stitches.CSS) => ({
      "@media (hover: hover)": {
        "&:hover": css,
      },
    }),
  },
});

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme } = stitches;

export const globalStyles = globalCss({
  // Global styles (optional)
  'body, html': { padding: 0, margin: 0 },
  // ... more global styles
});
