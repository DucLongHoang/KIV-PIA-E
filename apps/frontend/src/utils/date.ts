import { format } from "date-fns"

export const formatDate = (date: Date | string) => {
  return format(new Date(date), "dd.MM.yyyy")
}

export const formatIsoDateTime = (date: Date | string) => {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss")
}
