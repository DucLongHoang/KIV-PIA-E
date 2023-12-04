import { AssignmentState, Prisma } from "@prisma/client"
import { WithId } from "../utils"

type Allocation = WithId<Prisma.AllocationUncheckedCreateInput>

export function getAllocations(): Allocation[] {
  return [
    {
      id: 1,
      projectId: 1, // Assuming this is the ID of Project Titan
      workerId: 1, // Assuming this is the ID of Duc Long hoang
      from: new Date("2023-01-15T00:00:00Z"),
      to: new Date("2023-06-30T23:59:59Z"),
      scope: 0.5, // Part-time allocation
      description: "Working on initial phase of Project Titan",
      state: AssignmentState.ACTIVE,
    },
    {
      id: 2,
      projectId: 2, // Assuming this is the ID of Project Atlas
      workerId: 2, // Assuming this is the ID of Johny Cage
      from: new Date("2023-03-01T00:00:00Z"),
      to: new Date("2023-12-31T23:59:59Z"),
      scope: 1.0, // Full-time allocation
      description: "Leading the mapping initiative",
      state: AssignmentState.ACTIVE,
    },
  ]
}
