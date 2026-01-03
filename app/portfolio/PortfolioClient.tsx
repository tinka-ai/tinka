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
    </main>
  );
}
