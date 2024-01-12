import { createContext, PropsWithChildren, ReactNode } from "react"
import { useState, useCallback } from "react"
import { ObjectValues } from "../../utils/types"
import { theme } from "../../styles/stitches.config"
import Modal from "./Modal"

interface ModalProps {
  modal: ReactNode
  onOpenChange?: (open: boolean) => void
  isFullscreenOnMobile?: boolean
  padding?: ObjectValues<typeof theme.spaces>
}

interface UseModalProps {
  setModal: (modalProps: ModalProps | null) => void
  hideModal: () => void
}

const ModalContext = createContext<UseModalProps>({
  setModal: () => {},
  hideModal: () => {},
})

const ModalProvider = (props: PropsWithChildren) => {
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)

  const hideModal = useCallback(() => {
    setModalProps(null)
  }, [setModalProps])

  return (
    <ModalContext.Provider value={{ hideModal, setModal: setModalProps }} {...props}>
      {props.children}
      {modalProps && (
        <Modal
          openOnMount={true}
          onOpenChange={(open) => {
            if (modalProps.onOpenChange) {
              modalProps.onOpenChange(open)
            }
            if (!open) {
              hideModal()
            }
          }}
          isFullscreenOnMobile={modalProps.isFullscreenOnMobile}
          padding={modalProps.padding}
        >
          {modalProps.modal}
        </Modal>
      )}
    </ModalContext.Provider>
  )
}

export { ModalProvider, ModalContext }
