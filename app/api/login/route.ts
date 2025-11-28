export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { signAdminToken, setAdminCookie } from "@/lib/auth";
import * as bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (!username || !password) {
    return NextResponse.json({ message: "Username and password required" }, { status: 400 });
  }

  const prisma = await getPrisma();
  if (!process.env.DATABASE_URL)
    return NextResponse.json({ message: "Build phase skip" });

  const user = await prisma.adminUser.findUnique({ where: { username } });
  if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  const token = signAdminToken(user.username);
  setAdminCookie(token);
  return NextResponse.json({ message: "Logged in" });
}
