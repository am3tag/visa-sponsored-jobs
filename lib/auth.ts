import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const TOKEN_COOKIE = "vsj_admin_token";

export function signAdminToken(username: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return jwt.sign({ sub: username, role: "admin" }, secret, { expiresIn: "7d" });
}

export function setAdminCookie(token: string) {
  cookies().set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60
  });
}

export function clearAdminCookie() {
  cookies().delete(TOKEN_COOKIE);
}

export function getAdminFromCookie(): string | null {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;
  if (!token) return null;
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  try {
    const payload = jwt.verify(token, secret) as { sub?: string; role?: string };
    if (payload.role === "admin" && payload.sub) return payload.sub;
    return null;
  } catch {
    return null;
  }
}
