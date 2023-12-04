import { allocationsRouter } from "./routers/allocationsRouter"
import { projectsRouter } from "./routers/projectsRouter"
import { usersRouter } from "./routers/usersRouter"
import { router } from "./createRouter"

export const appRouter = router({
  users: usersRouter,
  projects: projectsRouter,
  allocations: allocationsRouter,
})

export type AppRouter = typeof appRouter
