"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Eye from "lucide-react/dist/esm/icons/eye";
import Puzzle from "lucide-react/dist/esm/icons/puzzle";
import Waves from "lucide-react/dist/esm/icons/waves";
import FlaskConical from "lucide-react/dist/esm/icons/flask-conical";
import Link2 from "lucide-react/dist/esm/icons/link-2";

import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import LocalePageClient from "@/components/LocalePageClient";
import T from "@/components/T";

const OfferCTA = dynamic(() => import("@/components/offer/OfferCTA"), { ssr: false });
const TinkaBookSection = dynamic(
  () => import("@/components/sections/TinkaBookSection"),
  { ssr: false }
);

export default function Page() {
  const fx =
    "transition-shadow duration-300 ease-out hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_28px_6px_rgba(168,85,247,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400/70 rounded-md";

  return (
    <LocalePageClient>
      <main id="main-content">

        {/* HERO */}
        <section
          id="acasa"
          aria-label="Pagina principală – introducere"
          className="relative overflow-hidden border-b border-white/5"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center py-8 sm:py-12">

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  <span className="h-3.5 w-3.5 rounded-full bg-sky-400" />
                  <T path="hero.subtitle" />
                </div>

                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                  <T path="hero.title" />
                </h1>

                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
                  <T path="whatWeOffer.title" />
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className={`bg-sky-500 text-white hover:bg-sky-400 ${fx}`}>
                    <Link href="/solutions">
                      <T path="hero.ctaPrimary" />
                      <ArrowRight className="ms-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <OfferCTA className={`${fx} active:scale-95 transition-transform`} />
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.18),transparent_60%)]" />
                <Image
                  src="/image/hero-tinkaai.webp"
                  alt="TINKA AI – Soluții AI și Web Design în Moldova"
                  width={880}
                  height={700}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>

            </div>
