import { PrismaClient } from "@prisma/client"
import { FastifyBaseLogger, FastifyReply, FastifyRequest } from "fastify"
import { Context, createContext } from "../../src/trpc/context"
import { mockDeep } from "jest-mock-extended"

// // Mock Prisma client
// const prismaMock = mockDeep<PrismaClient>()

// // Mock logger
// const loggerMock = {
//   log: jest.fn(),
//   // add other logger methods you might be using
// } as unknown as FastifyBaseLogger

// const requestMock = {
//   log: loggerMock,
// } as unknown as FastifyRequest

// // Mock response
// const responseMock = {} as unknown as FastifyReply

// export function createMockContext(): Context {
//   const context = createContext({ req: requestMock, res: responseMock })
//   return { logger: req.log, res, req, prisma: prismaMock }
// }
