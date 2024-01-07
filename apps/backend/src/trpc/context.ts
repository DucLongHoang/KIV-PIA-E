// src/routers/context.ts
import { PrismaClient } from "@prisma/client"
import { inferAsyncReturnType } from "@trpc/server"
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify"

const prisma = new PrismaClient()

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  return { logger: req.log, res, req, prisma }
}

export type Context = inferAsyncReturnType<typeof createContext>

async function getUserFromRequest({ req }: CreateFastifyContextOptions) {
  // Your logic here
  return { id: "userId", role: "userRole" } // Example return value
}
