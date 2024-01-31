import { expect, test } from "@jest/globals"
import { AppRouter, createCaller } from "../src/trpc/trpcRouter"
import { createContext } from "../src/trpc/context"
import { inferProcedureInput } from "@trpc/server"

// test("Test", async () => {
//   const ctx = await createContext({ req: {}, res: {} })
//   const caller = createCaller(ctx)

//   const input: inferProcedureInput<AppRouter["auth"]["login"]> = {
//     username: "duclong",
//     password: "123456",
//   }

//   const login = await caller.auth.login(input)

//   expect(login).toThrowError({})
// })
