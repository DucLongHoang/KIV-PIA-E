import { Prisma } from "@prisma/client"
import { WithId } from "../utils"

type Department = WithId<Prisma.DepartmentUncheckedCreateWithoutManagerInput>

export function getDepartments(): Department[] {
  return [
    {
      id: 0,
      name: "SECRETARIAT",
      // managerId: 0,
    },
    {
      id: 1,
      name: "KIV",
      // managerId: 1,
    },
    {
      id: 2,
      name: "KMA",
      // managerId: 2,
    },
    {
      id: 3,
      name: "KFY",
      // managerId: 3,
    },
  ]
}

type DepartmentUpdate = WithId<Prisma.DepartmentUncheckedUpdateInput>

export function updateDepartmentWithManagerId(): DepartmentUpdate[] {
  return [
    {
      id: 0,
      managerId: 0,
    },
    {
      id: 1,
      managerId: 1,
    },
    {
      id: 2,
      managerId: 2,
    },
    {
      id: 3,
      managerId: 3,
    },
  ]
}
