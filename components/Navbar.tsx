"use client";

import Link from "next/link";
import { Briefcase, UserCog } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Visa Sponsored Jobs"
            className="h-[3.5rem] w-auto"
          />
        </Link>

        <Link
          href="/admin"
          className="rounded-full border border-primary px-4 py-1.5 text-xs font-medium text-primary transition hover:bg-primary hover:text-white"
        >
          Post a Job
        </Link>
      </div>
    </header>
  );
}
