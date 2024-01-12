import * as React from "react"

function SvgCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg height="18px" version="1.1" viewBox="0 0 18 18" width="18px" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
        <g fill="#000000" id="Core" transform="translate(-549.000000, -45.000000)">
          <g id="check-box-outline" transform="translate(549.000000, 45.000000)">
            <path
              d="M4.9,7.1 L3.5,8.5 L8,13 L18,3 L16.6,1.6 L8,10.2 L4.9,7.1 L4.9,7.1 Z M16,16 L2,16 L2,2 L12,2 L12,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 C0,17.1 0.9,18 2,18 L16,18 C17.1,18 18,17.1 18,16 L18,8 L16,8 L16,16 L16,16 Z"
              id="Shape"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default SvgCheck
