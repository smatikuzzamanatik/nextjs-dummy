"use client";

import { useEffect, useRef, type ReactNode } from "react";

const PIXELS_PER_SECOND = 42;

interface TickerMotionProps {
  children: ReactNode;
  duplicate: ReactNode;
}

export function TickerMotion({ children, duplicate }: TickerMotionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const firstSet = firstSetRef.current;
    if (!track || !firstSet) return;

    const updateDuration = () => {
      const distance = firstSet.getBoundingClientRect().width;
      if (distance <= 0) return;

      track.style.setProperty(
        "--ticker-duration",
        `${distance / PIXELS_PER_SECOND}s`
      );
      track.dataset.ready = "true";
    };

    const observer = new ResizeObserver(updateDuration);
    observer.observe(firstSet);
    updateDuration();

    return () => observer.disconnect();
  }, []);

  return (
    <div
      role="region"
      aria-label="মূল্য আপডেট"
      className="ticker-container relative w-full overflow-hidden border-b border-border bg-card/60 backdrop-blur-xs select-none"
    >
      <div
        ref={trackRef}
        className="animate-marquee flex items-center whitespace-nowrap"
      >
        <div ref={firstSetRef} className="flex shrink-0 items-center">
          {children}
        </div>
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {duplicate}
        </div>
      </div>
    </div>
  );
}
