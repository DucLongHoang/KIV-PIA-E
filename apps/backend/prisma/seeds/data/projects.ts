import { Prisma } from "@prisma/client"
import { WithId } from "../utils"

type Project = WithId<Prisma.ProjectUncheckedCreateInput>

export function getProjects(): Project[] {
  return [
    {
      id: 1,
      name: "Project Titan",
      description: "A top-secret project to develop new technology.",
      from: new Date("2023-01-01T00:00:00Z"),
      to: new Date("2023-12-31T23:59:59Z"),
      managerId: 1,
    },
    {
      id: 2,
      name: "Project Atlas",
      description: "A large-scale project to map the entire world.",
      from: new Date("2023-02-01T00:00:00Z"),
      managerId: 2,
    },
  ]
}
