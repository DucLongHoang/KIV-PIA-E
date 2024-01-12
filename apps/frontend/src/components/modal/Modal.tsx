import { ReactElement, ReactNode, useCallback, useState } from "react"
import * as ModalPrimitives from "@radix-ui/react-dialog"
import { SClose, SCloseButton, SContent, SOverlay } from "./Modal.styled"
import { ObjectValues } from "../../utils/types"
import { keyframes, theme } from "../../styles/stitches.config"

export const createFade = (from: number, to: number) =>
  keyframes({
    from: {
      opacity: from,
    },
    to: {
      opacity: to,
    },
  })

export const createFadeInAndOut = (
  from: number,
  to: number
): [ReturnType<typeof keyframes>, ReturnType<typeof keyframes>] => {
  return [createFade(from, to), createFade(to, from)]
}

const [fadeInOverlay, fadeOutOverlay] = createFadeInAndOut(0, 0.4)
const [fadeInContent, fadeOutContent] = createFadeInAndOut(0, 1)

export interface ModalContentProps {
  close: () => void
}

interface ContentProps {
  open?: boolean
  children?: ReactNode
  isFullscreenOnMobile?: boolean
  padding?: ObjectValues<typeof theme.spaces>
}

function Content({ children, open, isFullscreenOnMobile, padding }: ContentProps) {
  return (
    <ModalPrimitives.Portal>
      <SOverlay
        css={{
          noReducedMotion: {
            animation: `${open ? fadeInOverlay : fadeOutOverlay} 150ms ease-out forwards`,
          },
        }}
      />
      <SContent
        isFullscreenOnMobile={isFullscreenOnMobile}
        css={{
          noReducedMotion: {
            animation: `${open ? fadeInContent : fadeOutContent} 150ms ease-out forwards`,
          },
          padding,
        }}
      >
        {children}
        <ModalPrimitives.Close asChild>
          <SCloseButton aria-label="Close">
            <SClose />
          </SCloseButton>
        </ModalPrimitives.Close>
      </SContent>
    </ModalPrimitives.Portal>
  )
}

interface Props {
  trigger?: ReactElement
  children?: ReactNode | ((props: ModalContentProps) => ReactNode)
  openOnMount?: boolean
  onOpenChange?: (open: boolean) => void
  isFullscreenOnMobile?: boolean
  padding?: ObjectValues<typeof theme.spaces>
}

export default function Modal({
  trigger,
  children,
  openOnMount = false,
  onOpenChange,
  isFullscreenOnMobile,
  padding,
}: Props) {
  const [open, setOpen] = useState(openOnMount)

  const handleOpenChange = useCallback(
    (value: boolean) => {
      setOpen(value)
      onOpenChange?.(value)
    },
    [onOpenChange]
  )

  return (
    <ModalPrimitives.Root open={open} onOpenChange={handleOpenChange}>
      <ModalPrimitives.Trigger asChild>{trigger}</ModalPrimitives.Trigger>

      <Content open={open} isFullscreenOnMobile={isFullscreenOnMobile} padding={padding}>
        {children && typeof children === "function" ? children({ close: () => setOpen(false) }) : children}
      </Content>
    </ModalPrimitives.Root>
  )
}
