import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;



export async function GET() {
  const jobs = await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  const username = getAdminFromCookie();
  if (!username) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, company, location, salary, url, description } = body;

  if (!title || !company || !location || !url) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const job = await prisma.job.create({
    data: {
      title,
      company,
      location,
      salary: salary || null,
      url,
      description: description || null
    }
  });

  return NextResponse.json(job, { status: 201 });
}
