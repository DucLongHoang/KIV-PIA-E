import { toast, ToastOptions } from "react-toastify"

const sharedOpts: ToastOptions = { hideProgressBar: true, theme: "colored" }

type ToastParams = Parameters<typeof toast>

function error(...args: ToastParams) {
  const [content, opts] = args
  return toast(content, { type: "error", ...sharedOpts, ...opts })
}

function success(...args: ToastParams) {
  const [content, opts] = args
  return toast(content, { type: "success", ...sharedOpts, ...opts })
}

function warning(...args: ToastParams) {
  const [content, opts] = args
  return toast(content, { type: "warning", ...sharedOpts, ...opts })
}

export const toasts = {
  error,
  success,
  warning,
}
