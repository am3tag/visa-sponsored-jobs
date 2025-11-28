import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.DATABASE_URL) {
  const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

  prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: ["error", "warn"],
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
} else {
  // fallback mock for build phase
  prisma = {} as PrismaClient;
}

export { prisma };
