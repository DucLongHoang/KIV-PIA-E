import React, { cloneElement, PropsWithChildren, ReactElement, ReactNode } from "react"
import { CSSProp, theme } from "../../styles/stitches.config"
import Text from "../Text"
import { SErrorIcon, SErrorWrapper, SInputWrapper, SLabel, SRightContentWrapper, SWrapper } from "./FormInput.styled"
import { Spacer } from "../Spacer"

type Props = {
  label?: ReactNode
  error?: string
  css?: CSSProp

  rightContent?: ReactNode
  smallInline?: boolean
}

export function FormInput(props: PropsWithChildren<Props>) {
  const { children, label, error, css, rightContent, smallInline } = props

  return (
    <SWrapper css={css} hasError={!!error} hasRightContent={!!rightContent} size={smallInline ? "small" : "default"}>
      {label && (
        <>
          <SLabel>{label}</SLabel>

          <Spacer size={theme.spaces.s4} />
        </>
      )}

      <SInputWrapper>
        {cloneElement(children as ReactElement, {})}

        {rightContent && <SRightContentWrapper>{rightContent}</SRightContentWrapper>}
      </SInputWrapper>

      {error && (
        <>
          <Spacer size={smallInline ? theme.spaces.s2 : theme.spaces.s3} />

          <SErrorWrapper align="center" justify="start" size={smallInline ? "small" : "default"}>
            <SErrorIcon />

            <Spacer size={smallInline ? theme.spaces.s1 : theme.spaces.s3} />

            <Text
              type="headerH5Negative"
              css={{
                // TODO: this will be clamped to 2 lines and will be truncated in future
                ellipsis: {},
              }}
            >
              {error}
            </Text>
          </SErrorWrapper>
        </>
      )}
    </SWrapper>
  )
}
