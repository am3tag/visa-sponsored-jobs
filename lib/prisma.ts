import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.VERCEL === "1" && !process.env.DATABASE_URL) {
  // during build on Vercel: return dummy object
  prisma = {} as PrismaClient;
} else {
  const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

  prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: ["error", "warn"],
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
}

export { prisma };
