"use client";

import * as React from "react";

declare global {
  interface Window { $crisp: unknown[]; CRISP_WEBSITE_ID: string }
}

export function LiveChat() {
  React.useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
    if (!id) return;
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = id;
    const s = document.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);
  return null;
}


