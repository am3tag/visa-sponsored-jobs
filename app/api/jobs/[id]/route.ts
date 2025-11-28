export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const prisma = await getPrisma();
  if (!process.env.DATABASE_URL) {
    // skip deletion during build
    return NextResponse.json({ message: "Build phase skip" });
  }

  try {
    await prisma.job.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json({ message: "Failed to delete" }, { status: 400 });
  }
}
