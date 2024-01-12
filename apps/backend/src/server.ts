import Fastify from "fastify"
import cors from "@fastify/cors"
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import { appRouter } from "./trpc/trpcRouter"
import { createContext } from "./trpc/context"
import { authDecoratorPlugin } from "./fastify/authPlugin"
import { authDecoratorDefaultConfig } from "./utils/auth"
import "dotenv/config"
import env from "./utils/env"

const fastify = Fastify({ logger: true })

async function start() {
  await fastify.register(cors, {
    origin: ["http://localhost:3000"],
    credentials: true,
  })

  // healthcheck route
  fastify.get("/healthcheck", (req, res) => {
    res.send({ message: "Success" })
  })

  await fastify.register(authDecoratorPlugin, authDecoratorDefaultConfig)

  await fastify.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: { router: appRouter, createContext },
  } as any)

  await fastify
    .listen({ port: env.SERVER_PORT, host: "localhost" })
    .then((address) => {
      console.log(`Server is running on http://localhost:${address}/`)
    })
    .catch((e) => {
      throw e
    })
}

start().catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})
