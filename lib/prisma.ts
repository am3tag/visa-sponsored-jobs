// lib/prisma.ts
import type { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | undefined;

export async function getPrisma() {
  if (prisma) return prisma;

  if (!process.env.DATABASE_URL) {
    // during build on Vercel, just return a stub
    return {} as PrismaClient;
  }

  const { PrismaClient } = await import("@prisma/client");
  const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

  prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: ["warn", "error"],
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }

  return prisma;
}
