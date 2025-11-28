import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signAdminToken, setAdminCookie } from "@/lib/auth";

import * as bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";


export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password required" },
        { status: 400 }
      );
    }

    const user = await prisma.adminUser.findUnique({
      where: { username }
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signAdminToken(user.username);
    setAdminCookie(token);

    return NextResponse.json({ message: "Logged in" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
