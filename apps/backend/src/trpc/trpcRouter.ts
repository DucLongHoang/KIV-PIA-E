import { allocationsRouter } from "./routers/allocationsRouter"
import { projectsRouter } from "./routers/projectsRouter"
import { usersRouter } from "./routers/usersRouter"
import { createCallerFactory, router } from "./createRouter"
import { authRouter } from "./routers/authRouter"
import { departmentsRouter } from "./routers/departmentsRouter"

export const appRouter = router({
  users: usersRouter,
  projects: projectsRouter,
  allocations: allocationsRouter,
  auth: authRouter,
  departments: departmentsRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
