"use client";

import dynamic from "next/dynamic";
import * as React from "react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface HeroVideoProps {
  url?: string;
  poster?: string;
}

export function HeroVideo({ url, poster }: HeroVideoProps) {
  // Temporary stock video if none provided
  const src = url ??
    "https://storage.googleapis.com/coverr-main/mp4/Footwork-1.mp4"; // placeholder sports-style b-roll

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <ReactPlayer
        url={src}
        playing
        muted
        loop
        width="100%"
        height="100%"
        playsinline
        config={{ file: { attributes: { poster } } }}
        className="!absolute !top-0 !left-0 !h-full !w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
    </div>
  );
}


