import Fastify from "fastify"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"
import cookie from "@fastify/cookie"
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import { appRouter } from "./trpc/trpcRouter"
import { createContext } from "./trpc/context"

const fastify = Fastify({ logger: true })

async function start() {
  await fastify.register(cors, {
    origin: ["http://localhost:3000"],
  })

  // Register JWT and cookie plugins
  await fastify.register(jwt, { secret: "your-secret-key" })
  await fastify.register(cookie)

  // healthcheck route
  fastify.get("/healthcheck", (req, res) => {
    res.send({ message: "Success" })
  })

  // fastify.post("/login", async (req, res) => {
  //   // Implement user credential verification
  //   // On success:
  //   const token = fastify.jwt.sign({ user: "user-data" })
  //   res.setCookie("token", token, { httpOnly: true })
  //   res.send({ message: "Login successful" })
  // })

  await fastify.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: { router: appRouter, createContext },
  } as any)

  await fastify
    .listen({ port: 5000 })
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
