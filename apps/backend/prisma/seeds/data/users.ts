import { Prisma } from "@prisma/client"
import { WithId } from "../utils"

type User = WithId<Prisma.UserUncheckedCreateInput>

export function getUsers(): User[] {
  return [
    {
      id: 1,
      orionLogin: "duclong",
      email: "duclonghoang.dlh@gmail.com",
      fullName: "Duc Long hoang",
      password: "123456",
      workplace: "KIV",
    },
    {
      id: 2,
      orionLogin: "johny",
      email: "johny@gmail.com",
      fullName: "Johny Cage",
      password: "123456",
      workplace: "KMA",
    },
    {
      id: 3,
      orionLogin: "kathy",
      email: "kathy@gmail.com",
      fullName: "Katherine Elizabeth",
      password: "123456",
      workplace: "KFY",
    },
  ]
}
