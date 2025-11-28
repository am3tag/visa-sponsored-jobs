import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";

const ADS_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
const ADS_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  title: "Visa Sponsored Jobs",
  description: "Curated list of international roles with visa sponsorship."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {ADS_ENABLED && ADS_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <footer className="mt-10 border-t bg-white/70 py-6">
          <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Visa Sponsored Jobs.</p>
            <p>
              Made with 💙 by{" "}
              <a
                href="https://www.linkedin.com/in/girishameta/"
                target="_blank"
                className="font-medium text-primary hover:underline"
              >
                Girish Ameta
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
