import React from "react"
import { styled, theme } from "../../styles/stitches.config"
import { Spacer } from "../Spacer"
import RectPlaceholder from "./RectPlaceHolder"

const SWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(${theme.spaces.s80}, 1fr))`,
  columnGap: theme.sizes.s6,
  rowGap: theme.sizes.s6,
})

const HomePlaceholder = () => {
  return (
    <>
      <Spacer size={theme.spaces.s12} />
      <SWrapper>
        <RectPlaceholder />
        <RectPlaceholder />
        <RectPlaceholder />
      </SWrapper>
    </>
  )
}

export default HomePlaceholder
