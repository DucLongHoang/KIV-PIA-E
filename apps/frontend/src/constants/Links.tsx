import { Maybe } from "../utils/types"

type LinkId = Maybe<string | number>

export const LINKS = {
  home: "/",
  login: "/login",
  create: "/create",

  project: (projectId: LinkId) => `/projects/${projectId}`,
}
