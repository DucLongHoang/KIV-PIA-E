import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "../../../backend/src/trpc/trpcRouter"

export const trpc = createTRPCReact<AppRouter>({})
