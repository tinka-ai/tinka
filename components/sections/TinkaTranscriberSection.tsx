"use client";
// components/sections/TinkaTranscriberSection.tsx

import Link from "next/link";
import { Download, ShoppingCart, Mic, Wifi, Lock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import T from "@/components/T";
import { useLocale } from "@/contexts/locale-context";

export default function TinkaTranscriberSection({ fx }: { fx: string }) {
  const { t } = useLocale() as any;
  const tr = t?.transcriber;

  if (!tr) return null;

  return (
    <section
      id="tinka-transcriber"
      aria-label="TINKA AI Transcriber"
      className="py-12 sm:py-16 border-b border-white/5"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-400 mb-3">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <T path="transcriber.badge" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              <T path="transcriber.title" />{" "}
              <span className="text-amber-400">
                <T path="transcriber.titleHighlight" />
              </span>
            </h2>
            <p className="mt-2 text-gray-400 max-w-xl">
              <T path="transcriber.subtitle" />
            </p>
          </div>

          {/* Price badge */}
          <div className="flex-shrink-0 text-center rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-4">
            <div className="text-3xl font-bold text-amber-400">490</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">MDL / <T path="transcriber.priceLabel" /></div>
            <div className="text-xs text-green-400 mt-1">🎁 <T path="transcriber.trial" /></div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left — Features */}
          <div className="space-y-4">
            {[
              { icon: <Mic className="h-5 w-5 text-amber-400" />, key: "feature1" },
              { icon: <Wifi className="h-5 w-5 text-amber-400" />, key: "feature2" },
              { icon: <Lock className="h-5 w-5 text-amber-400" />, key: "feature3" },
              { icon: <FileText className="h-5 w-5 text-amber-400" />, key: "feature4" },
            ].map(({ icon, key }) => (
              <div key={key} className={`flex items-start gap-4 p-4 rounded-xl border border-white/8 bg-white/3 ${fx}`}>
                <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-md bg-amber-500/10">
                  {icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-200 text-sm">
                    <T path={`transcriber.features.${key}.title`} />
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    <T path={`transcriber.features.${key}.desc`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — CTA card */}
          <div className={`rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent p-6 space-y-4 ${fx}`}>

            {/* Formats */}
            <div className="flex flex-wrap gap-2">
              {["MP3", "WAV", "M4A", "OGG", "FLAC", "MP4"].map(f => (
                <span key={f} className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-gray-300">
                  {f}
                </span>
              ))}
            </div>

            {/* OS + Trial */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>💻 Windows 10/11</span>
              <span>🎁 <T path="transcriber.trial" /></span>
              <span>⚡ <T path="transcriber.offline" /></span>
            </div>

            <div className="h-px bg-white/5" />

            {/* Buttons */}
            <div className="space-y-3">
              <Button asChild className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold">
                <Link href="/download">
                  <Download className="h-4 w-4 mr-2" />
                  <T path="transcriber.downloadBtn" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                <Link href="/cumparare">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  <T path="transcriber.buyBtn" />
                </Link>
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              <T path="transcriber.licenseNote" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
