export const dynamic = "force-dynamic";
export const runtime = "nodejs";       // force runtime execution only
export const preferredRegion = "auto";


import { NextResponse } from "next/server";
import { clearAdminCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;



export async function POST() {
  clearAdminCookie();
  return NextResponse.json({ message: "Logged out" });
}
