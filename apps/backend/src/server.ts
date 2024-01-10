import Fastify from "fastify"
import cors from "@fastify/cors"
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import { appRouter } from "./trpc/trpcRouter"
import { createContext } from "./trpc/context"
import { authDecoratorDefaultConfig, authDecoratorPlugin } from "./fastify/authPlugin"
import { fastifyCookie } from "@fastify/cookie"
import { fastifyJwt } from "@fastify/jwt"
import { ok } from "assert"

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

  // fastify.register(fastifyCookie)
  // fastify.register(fastifyJwt, { secret: "long-secret" })

  fastify.post("/login", async (req, res) => {
    const user = { id: 1, name: "John Doe" }
    const token = await res.jwtSign(user)

    res
      .setCookie("token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      })
      .send({ ok: true, token: token })
  })

  fastify.get("/protected", async (req, res) => {
    try {
      await req.jwtVerify()
      res.send({ ok: true, message: "You are authorized" })
    } catch (err) {
      res.send(err)
    }
  })

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
