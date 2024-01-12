import * as React from "react"

function SvgCross(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg enable-background="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px" {...props}>
      <g id="background">
        <rect fill="none" height="32" width="32" />
      </g>
      <g id="cancel">
        <polygon points="2,26 6,30 16,20 26,30 30,26 20,16 30,6 26,2 16,12 6,2 2,6 12,16  " />
      </g>
    </svg>
  )
}

export default SvgCross
