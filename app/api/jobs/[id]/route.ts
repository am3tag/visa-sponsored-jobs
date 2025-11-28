import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookie } from "@/lib/auth";
export const dynamic = "force-dynamic";
export const revalidate = 0;


export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const username = getAdminFromCookie();
  if (!username) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.job.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (e) {
    return NextResponse.json({ message: "Failed to delete" }, { status: 400 });
  }
}
