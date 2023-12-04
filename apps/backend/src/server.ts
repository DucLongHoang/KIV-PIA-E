// src/server.ts
import Fastify from "fastify"
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import { appRouter } from "./trpc/trpcRouter"
import { createContext } from "./trpc/context"

const fastify = Fastify({ logger: true })

fastify.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
})

const start = async () => {
  try {
    await fastify.listen(5000)
    console.log(`Server is running on http://localhost:5000/`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
