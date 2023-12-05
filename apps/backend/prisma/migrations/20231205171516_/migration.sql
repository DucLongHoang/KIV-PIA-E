/*
  Warnings:

  - Changed the type of `state` on the `Allocation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AllocationState" AS ENUM ('DRAFT', 'CANCELLED', 'PAST', 'ACTIVE');

-- AlterTable
ALTER TABLE "Allocation" DROP COLUMN "state",
ADD COLUMN     "state" "AllocationState" NOT NULL;

-- DropEnum
DROP TYPE "AssignmentState";
