import { PrismaClient } from "@prisma/client"
import { getUsers } from "./data/users"
import { getAllocations } from "./data/allocations"
import { getProjects } from "./data/projects"

async function seedDb(prisma: PrismaClient) {
  for (const user of getUsers()) {
    await prisma.user.create({
      data: user,
    })
  }

  for (const project of getProjects()) {
    await prisma.project.create({
      data: project,
    })
  }

  for (const allocation of getAllocations()) {
    await prisma.allocation.create({
      data: allocation,
    })
  }
}

async function truncateDatabase(prisma: PrismaClient) {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

  for (const { tablename } of tablenames) {
    if (tablename === "_prisma_migrations") {
      continue
    }

    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ error })
    }
  }
}

async function run() {
  const prisma = new PrismaClient({ log: ["query"] })

  try {
    await truncateDatabase(prisma)
    await seedDb(prisma)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

// eslint-disable-next-line unicorn/prefer-module
if (require.main === module) {
  // exit node process on unhandled promise rejections
  process.on("unhandledRejection", (error) => {
    throw error
  })

  void run()
}
