"use client"

import { useState } from "react"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendlyButtonProps {
  buttonText?: string
  modalTitle?: string
  modalSubtitle?: string
}

export default function CalendlyButton({ 
  buttonText = "Programează un call",
  modalTitle = "Programează Consultație Gratuită",
  modalSubtitle = "30 minute · Online · Discutăm despre AI în compania ta"
}: CalendlyButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Butonul principal */}
      <Button 
        onClick={() => setIsOpen(true)}
        size="lg"
        className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
      >
        {buttonText}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {/* Modal cu Calendly */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl h-[90vh] bg-background rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-background/95 backdrop-blur">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {modalTitle}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {modalSubtitle}
                </p>
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
