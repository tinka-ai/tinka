"use client";

import { useEffect, useState } from "react";
import T from "@/components/T";

export default function HeroTitle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <h1
        data-mounted={mounted}
        className="hero-title-motion text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent will-change-transform"
      >
        <T path="hero.title" />
      </h1>
      <style>{`
        .hero-title-motion {
          background-size: 200% auto;
          opacity: 0;
          transform: translateY(14px);
          filter: blur(6px);
          transition:
            opacity 700ms cubic-bezier(0.23, 1, 0.32, 1),
            transform 700ms cubic-bezier(0.23, 1, 0.32, 1),
            filter 700ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .hero-title-motion[data-mounted="true"] {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0px);
          animation: heroGradientShift 9s ease-in-out 700ms infinite;
        }
        @keyframes heroGradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-title-motion {
            transform: none;
            filter: none;
            transition: opacity 300ms ease;
          }
          .hero-title-motion[data-mounted="true"] {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
