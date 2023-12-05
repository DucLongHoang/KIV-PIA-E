import * as React from "react"

function SvgError(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path data-name="Path 46" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 11a1 1 0 01-1-1V8a1 1 0 012 0v4a1 1 0 01-1 1zm1 4h-2v-2h2z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgError
