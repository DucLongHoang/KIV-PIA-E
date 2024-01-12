import React from "react"
import { ModalContext } from "../components/modal/ModalProvider"

export const useModal = () => {
  return React.useContext(ModalContext)
}
