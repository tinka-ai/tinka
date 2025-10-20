"use client"

import { useState } from "react"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendlyButtonProps {
  buttonText?: string
  modalTitle?: string
  modalSubtitle?: string
  className?: string
}

export default function CalendlyButton({
  buttonText = "Programează un call",
  modalTitle = "Programează o consultație telefonică gratuită",
  modalSubtitle = "30 de minute · Online · Discutăm despre AI în compania ta",
  className = "",
}: CalendlyButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Butonul principal (dark gradient + glow) */}
      <Button
        onClick={() => setIsOpen(true)}
        title={buttonText}
        aria-label={buttonText}
        className={[
          // stilul cerut
          "group inline-flex items-center gap-2 rounded-lg",
          "bg-[linear-gradient(180deg,rgba(22,26,39,.95),rgba(10,12,20,.95))]",
          "text-white border border-white/10",
          "shadow-[inset_0_1px_0_rgba(255,255,255,.06)]",
          "ring-1 ring-white/5 hover:ring-primary-foreground/50",
          "hover:shadow-[0_0_0_1px_rgba(99,102,241,.25),0_0_28px_6px_rgba(99,102,241,.15)]",
          "px-6 py-3 transition-all duration-200",
          // feedback suplimentar
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          "hover:-translate-y-[1px] active:translate-y-0",
          className,
        ].join(" ")}
      >
        {buttonText}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Button>

      {/* Modal cu Calendly */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] bg-background rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-background/95 backdrop-blur">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{modalTitle}</h2>
                <p className="text-sm text-muted-foreground mt-1">{modalSubtitle}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors group"
                aria-label="Închide"
              >
                <X className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </div>

            {/* Calendly Iframe */}
            <div className="h-[calc(100%-88px)]">
              <iframe
                src="https://calendly.com/tinka-ai-srl/30min?hide_gdpr_banner=1&hide_event_type_details=1&background_color=000000&text_color=ffffff&primary_color=3b82f6"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Programează consultație"
                className="calendly-inline-widget"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
