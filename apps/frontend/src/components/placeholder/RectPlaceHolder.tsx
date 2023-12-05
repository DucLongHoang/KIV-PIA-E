import { useRef } from "react"
import ContentLoader from "react-content-loader"
import useMeasureDirty from "react-use/lib/useMeasureDirty"

const RectPlaceholder = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useMeasureDirty(ref)

  const height = width * 0.5

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <ContentLoader viewBox={`0 0 ${width} ${height}`}>
        <rect x="0" y="0" width={width} height={height} />
      </ContentLoader>
    </div>
  )
}

export default RectPlaceholder
