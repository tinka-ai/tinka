"use client"

import { useState } from "react"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CalendlyButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Butonul principal */}
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold"
      >
        Programează un call
        <ArrowRight className="ml-2 h-5 w-5" />
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
                  Programează Consultație Gratuită
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  30 minute · Online · Discutăm despre AI în compania ta
                </p>
              </div>
              <button
                onClick={() => setIsOpen(fals
