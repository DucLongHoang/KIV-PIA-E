import { Prisma } from "@prisma/client"
import { WithId } from "../utils"

type User = WithId<Prisma.UserUncheckedCreateWithoutDepartmentInput>

export function getUsers(): User[] {
  return [
    {
      id: 0,
      orionLogin: "tcook",
      email: "tim.cook@example.com",
      fullName: "Tim Cook",
      password: "123456",
      role: "SECRETARIAT",
      // departmentId: 0,
    },
    {
      id: 1,
      orionLogin: "duclong",
      email: "duclonghoang.dlh@gmail.com",
      fullName: "Duc Long hoang",
      password: "123456",
      role: "SUPERIOR",
      // departmentId: 1,
    },
    {
      id: 2,
      orionLogin: "johny",
      email: "johny@gmail.com",
      fullName: "Johny Cage",
      password: "123456",
      role: "SUPERIOR",
      // departmentId: 2,
    },
    {
      id: 3,
      orionLogin: "kathy",
      email: "kathy@gmail.com",
      fullName: "Katherine Elizabeth",
      password: "123456",
      role: "SUPERIOR",
      // departmentId: 3,
    },
    {
      id: 4,
      orionLogin: "sarahc",
      email: "sarah.connor@example.com",
      fullName: "Sarah Connor",
      password: "123456",
      role: "SUBORDINATE",
      superiorId: 1,
      // departmentId: 1,
    },
    {
      id: 5,
      orionLogin: "markz",
      email: "mark.zuckerberg@example.com",
      fullName: "Mark Zuckerberg",
      password: "123456",
      role: "SUBORDINATE",
      superiorId: 1,
    },
    {
      id: 6,
      orionLogin: "elonm",
      email: "elon.musk@example.com",
      fullName: "Elon Musk",
      password: "123456",
      role: "SUBORDINATE",
      superiorId: 2,
    },
    {
      id: 7,
      orionLogin: "jdoe",
      email: "jane.doe@example.com",
      fullName: "Jane Doe",
      password: "123456",
      role: "SUBORDINATE",
      superiorId: 2,
    },
    {
      id: 8,
      orionLogin: "dsmith",
      email: "daniel.smith@example.com",
      fullName: "Daniel Smith",
      password: "123456",
      role: "SUBORDINATE",
      superiorId: 3,
    },
    {
      id: 9,
      orionLogin: "emwatson",
      email: "emma.watson@example.com",
      fullName: "Emma Watson",
      password: "123456",
      role: "SUBORDINATE",
      superiorId: 3,
    },
  ]
}

type UserUpdate = WithId<Prisma.UserUncheckedUpdateInput>

export function updateUsersWithDepartmentId(): UserUpdate[] {
  return [
    {
      id: 0,
      departmentId: 0,
    },
    {
      id: 1,
      departmentId: 1,
    },
    {
      id: 2,
      departmentId: 2,
    },
    {
      id: 3,
      departmentId: 3,
    },
    {
      id: 4,
      departmentId: 1,
    },
    {
      id: 5,
      departmentId: 1,
    },
    {
      id: 6,
      departmentId: 2,
    },
    {
      id: 7,
      departmentId: 2,
    },
    {
      id: 8,
      departmentId: 3,
    },
    {
      id: 9,
      departmentId: 3,
    },
  ]
}
