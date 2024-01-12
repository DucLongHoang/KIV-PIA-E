import { Prisma } from "@prisma/client"
import { WithId } from "../utils"
import * as argon2 from "argon2"

type User = WithId<Prisma.UserUncheckedCreateWithoutDepartmentInput>

export async function getUsers(): Promise<User[]> {
  return [
    {
      id: 0,
      orionLogin: "tcook",
      email: "tim.cook@example.com",
      fullName: "Tim Cook",
      password: await argon2.hash("123456"),
      role: "SECRETARIAT",
      // departmentId: 0,
    },
    {
      id: 1,
      orionLogin: "duclong",
      email: "duclonghoang.dlh@gmail.com",
      fullName: "Duc Long hoang",
      password: await argon2.hash("123456"),
      role: "SUPERIOR",
      // departmentId: 1,
    },
    {
      id: 2,
      orionLogin: "johny",
      email: "johny@gmail.com",
      fullName: "Johny Cage",
      password: await argon2.hash("123456"),
      role: "SUPERIOR",
      // departmentId: 2,
    },
    {
      id: 3,
      orionLogin: "kathy",
      email: "kathy@gmail.com",
      fullName: "Katherine Elizabeth",
      password: await argon2.hash("123456"),
      role: "SUPERIOR",
      // departmentId: 3,
    },
    {
      id: 4,
      orionLogin: "sarahc",
      email: "sarah.connor@example.com",
      fullName: "Sarah Connor",
      password: await argon2.hash("123456"),
      role: "SUBORDINATE",
      superiorId: 1,
      // departmentId: 1,
    },
    {
      id: 5,
      orionLogin: "markz",
      email: "mark.zuckerberg@example.com",
      fullName: "Mark Zuckerberg",
      password: await argon2.hash("123456"),
      role: "SUBORDINATE",
      superiorId: 1,
    },
    {
      id: 6,
      orionLogin: "elonm",
      email: "elon.musk@example.com",
      fullName: "Elon Musk",
      password: await argon2.hash("123456"),
      role: "SUBORDINATE",
      superiorId: 2,
    },
    {
      id: 7,
      orionLogin: "jdoe",
      email: "jane.doe@example.com",
      fullName: "Jane Doe",
      password: await argon2.hash("123456"),
      role: "SUBORDINATE",
      superiorId: 2,
    },
    {
      id: 8,
      orionLogin: "dsmith",
      email: "daniel.smith@example.com",
      fullName: "Daniel Smith",
      password: await argon2.hash("123456"),
      role: "SUBORDINATE",
      superiorId: 3,
    },
    {
      id: 9,
      orionLogin: "emwatson",
      email: "emma.watson@example.com",
      fullName: "Emma Watson",
      password: await argon2.hash("123456"),
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
