"use client";

import { useEffect, useRef } from "react";

const ADS_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

declare global {
  interface Window {
    adsbygoogle?: Array<unknown>;
  }
}

export function GoogleAd() {
  const rendered = useRef(false);

  useEffect(() => {
    if (!ADS_ENABLED || !CLIENT || !SLOT) return;
    if (rendered.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      rendered.current = true;
    } catch (e) {
      // ignore
    }
  }, []);

  if (!ADS_ENABLED || !CLIENT || !SLOT) {
    return null;
  }

  return (
    <div className="my-3 animate-fadeIn">
      <ins
        className="adsbygoogle block rounded-2xl border border-slate-200 bg-slate-50"
        style={{ display: "block" }}
        data-ad-client={CLIENT}
        data-ad-slot={SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
