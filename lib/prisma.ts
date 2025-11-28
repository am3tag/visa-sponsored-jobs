import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (!globalThis.__prisma__) {
  if (process.env.DATABASE_URL) {
    globalThis.__prisma__ = new PrismaClient({
      log: ["error", "warn"],
    });
  } else {
    // dummy client during build
    globalThis.__prisma__ = {} as PrismaClient;
  }
}

prisma = globalThis.__prisma__;

export { prisma };
