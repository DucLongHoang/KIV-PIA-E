import { z } from "zod"

export enum AllocationState {
  DRAFT = "DRAFT",
  CANCELLED = "CANCELLED",
  PAST = "PAST",
  ACTIVE = "ACTIVE",
}

export const allocationSchema = z.object({
  id: z.number(),
  projectId: z.number(),
  workerId: z.number(),
  from: z.date(),
  to: z.date().nullable(),
  scope: z.number(),
  description: z.string().nullable(),
  state: z.nativeEnum(AllocationState),
})

export type Allocation = z.infer<typeof allocationSchema>
