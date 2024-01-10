import { TRPCClientError } from "@trpc/react-query"
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import { AppRouter } from "../../../backend/src/trpc/trpcRouter"

export const assertUnreachable = (arg: never): never => {
  throw new Error(`Didn't expect arg [${arg}] to get here`)
}

export type Maybe<T> = T | null | undefined

export type Prefixed<K extends string, T> = `${K}${Extract<T, boolean | number | string>}`

export type ObjectValues<TObject extends Record<string, unknown>> = TObject[keyof TObject]

export interface DateRange {
  from: Date
  to: Date
}

export type ButtonProps = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">

export function isTRPCError(error: unknown): error is TRPCClientError<AppRouter> {
  return error instanceof TRPCClientError
}
