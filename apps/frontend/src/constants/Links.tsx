import { Maybe } from "../utils/types"

type LinkId = Maybe<string | number>

export const LINKS = {
  home: "/",
  login: "/login",
  register: "/register",
  projects: "/projects",

  project: (projectId: LinkId) => `/projects/${projectId}`,
}
