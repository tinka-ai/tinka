"use client";

import Link from "next/link";
import T from "@/components/T";
import { TRANSCRIBER_ENABLED } from "@/lib/featureFlags";

const PORTFOLIO_URL = "https://tinkaweb.md";

export default function PortfolioClient() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-28 pb-16">
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          <T path="portfolioPage.title" />
        </h1>

        <p className="mt-3 text-muted-foreground text-base md:text-lg">
          <T path="portfolioPage.subtitle" />
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card/70 px-4 py-2 text-sm hover:bg-muted/40 transition-colors"
          >
            <T path="portfolioPage.openButton" />
          </Link>

          <p className="text-xs text-muted-foreground leading-5 max-w-2xl">
            <T path="portfolioPage.note" />
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/40 overflow-hidden">
        <iframe
          title="TINKA AI Portfolio"
          src={PORTFOLIO_URL}
          className="w-full"
          style={{ height: "78vh" }}
          loading="lazy"
        />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        <T path="portfolioPage.fallback" />{" "}
        <Link href={PORTFOLIO_URL} target="_blank" rel="noreferrer" className="underline">
          {PORTFOLIO_URL}
        </Link>
      </p>

      {/* ── TINKORA — Produsele TINKA AI ── */}
      <div className="mt-16 border-t border-white/5 pt-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Tinkora
          </span>
          <h2 className="text-2xl font-bold text-white">
            <T path="portfolioPage.tinkoraTitle" />
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* TINKA Transcriber — ascuns temporar, vezi lib/featureFlags.ts */}
          {TRANSCRIBER_ENABLED && (
          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl">🎙</span>
                <h3 className="mt-2 font-bold text-white text-lg">TINKA Transcriber</h3>
                <p className="text-xs text-amber-400 mt-0.5">Audio → Text cu AI local</p>
              </div>
              <span className="text-xs rounded-full border border-green-500/30 bg-green-500/10 text-green-400 px-2 py-0.5">
                <T path="portfolioPage.available" />
              </span>
            </div>
            <p className="text-sm text-gray-400 flex-1">
              <T path="portfolioPage.transcriberDesc" />
            </p>
            <div className="flex gap-2 pt-2">
              <Link
                href="/download"
                className="flex-1 text-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm py-2 hover:bg-amber-500/20 transition-colors"
              >
                <T path="portfolioPage.downloadBtn" />
              </Link>
              <Link
                href="/cumparare"
                className="flex-1 text-center rounded-lg bg-amber-500 text-black text-sm font-bold py-2 hover:bg-amber-400 transition-colors"
              >
                199 MDL
              </Link>
            </div>
          </div>
          )}

          {/* TinkaBook */}
          <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/5 to-transparent p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl">📅</span>
                <h3 className="mt-2 font-bold text-white text-lg">TinkaBook</h3>
                <p className="text-xs text-sky-400 mt-0.5">Programări online</p>
              </div>
              <span className="text-xs rounded-full border border-green-500/30 bg-green-500/10 text-green-400 px-2 py-0.5">
                <T path="portfolioPage.available" />
              </span>
            </div>
            <p className="text-sm text-gray-400 flex-1">
              <T path="portfolioPage.tinkaBookDesc" />
            </p>
            <Link
              href="https://tinkabook.md"
              target="_blank"
              rel="noreferrer"
              className="text-center rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-400 text-sm py-2 hover:bg-sky-500/20 transition-colors"
            >
              <T path="portfolioPage.visitBtn" />
            </Link>
          </div>

          {/* VIALA */}
          <div className="rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-950/40 via-blue-950/30 to-transparent p-6 flex flex-col gap-4 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Logo */}
                <img
                  src="/image/viala-logo-dark.png"
                  alt="VIALA"
                  className="h-8 w-auto object-contain"
                  onError={(e) => { e.currentTarget.style.display="none" }}
                />
                <p className="text-xs text-cyan-400 mt-2 font-medium tracking-wider uppercase">
                  AI Care for Human Connection
                </p>
              </div>
              <span className="text-xs rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 px-2 py-0.5 flex-shrink-0 ml-2">
                <T path="portfolioPage.inDevelopment" />
              </span>
            </div>

            <p className="text-sm text-gray-300 flex-1 leading-relaxed">
              <T path="portfolioPage.vialaDesc" />
            </p>

            {/* Teaser */}
            <div className="rounded-lg border border-cyan-500/15 bg-cyan-500/5 px-3 py-2 text-xs text-cyan-300/70 italic">
              <T path="portfolioPage.vialaTease" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
