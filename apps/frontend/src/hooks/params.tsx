import { useParams } from "react-router"

export const useNumberParam = (key: string) => {
  const params = useParams()
  const param = params[key]

  if (!param) {
    return
  }

  return Number.parseInt(param, 10)
}

export const useSafeNumberParam = (key: string) => {
  const param = useNumberParam(key)
  if (!param) {
    throw new Error(`${key} was not found in a URL parameter`)
  }

  if (Number.isNaN(param)) {
    throw new TypeError(`${key} is not a number (value: ${param})`)
  }

  return param
}
