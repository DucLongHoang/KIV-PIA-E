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
    {
      id: 4,
      orionLogin: "sarahc",
      email: "sarah.connor@example.com",
      fullName: "Sarah Connor",
      password: "123456",
      workplace: "KIV",
    },
    {
      id: 5,
      orionLogin: "markz",
      email: "mark.zuckerberg@example.com",
      fullName: "Mark Zuckerberg",
      password: "123456",
      workplace: "KMA",
    },
    {
      id: 6,
      orionLogin: "elonm",
      email: "elon.musk@example.com",
      fullName: "Elon Musk",
      password: "123456",
      workplace: "KFY",
    },
    {
      id: 7,
      orionLogin: "jdoe",
      email: "jane.doe@example.com",
      fullName: "Jane Doe",
      password: "123456",
      workplace: "KKY",
    },
    {
      id: 8,
      orionLogin: "dsmith",
      email: "daniel.smith@example.com",
      fullName: "Daniel Smith",
      password: "123456",
      workplace: "KIV",
    },
    {
      id: 9,
      orionLogin: "emwatson",
      email: "emma.watson@example.com",
      fullName: "Emma Watson",
      password: "123456",
      workplace: "KMA",
    },
    {
      id: 10,
      orionLogin: "tcook",
      email: "tim.cook@example.com",
      fullName: "Tim Cook",
      password: "123456",
      workplace: "KFY",
    },
  ]
}
