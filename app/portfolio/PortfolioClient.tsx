"use client";

import Link from "next/link";
import T from "@/components/T";

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

          {/* TINKA AI Transcriber */}
          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl">🎙</span>
                <h3 className="mt-2 font-bold text-white text-lg">TINKA AI Transcriber</h3>
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

          {/* Coming Soon */}
          <div className="rounded-2xl border border-white/5 bg-white/2 p-6 flex flex-col gap-4 opacity-50">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl">🚀</span>
                <h3 className="mt-2 font-bold text-white text-lg">TINKA CRM</h3>
                <p className="text-xs text-gray-500 mt-0.5">CRM inteligent</p>
              </div>
              <span className="text-xs rounded-full border border-white/10 bg-white/5 text-gray-500 px-2 py-0.5">
                <T path="portfolioPage.comingSoon" />
              </span>
            </div>
            <p className="text-sm text-gray-500 flex-1">
              <T path="portfolioPage.comingSoonDesc" />
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
