//pagina principala
"use client";

import type React from "react";
import { LocaleLink as Link } from "@/components/ui/locale-link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import Eye from "lucide-react/dist/esm/icons/eye";
import Puzzle from "lucide-react/dist/esm/icons/puzzle";
import Waves from "lucide-react/dist/esm/icons/waves";
import FlaskConical from "lucide-react/dist/esm/icons/flask-conical";
import Link2 from "lucide-react/dist/esm/icons/link-2";

import Footer from "@/components/ui/footer";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import T from "@/components/T";
import AiPortraitHero from "@/components/sections/AiPortraitHero";
import { Reveal } from "@/components/ui/reveal";
import { TRANSCRIBER_ENABLED } from "@/lib/featureFlags";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ⚡ OPTIMIZARE – încărcăm JS doar când e nevoie */
const TinkaTranscriberSection = dynamic(
  () => import("@/components/sections/TinkaTranscriberSection"),
  { ssr: false, loading: () => null }
);

export default function Page() {
  const fx =
    "transition-shadow duration-300 ease-out hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_28px_6px_rgba(168,85,247,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400/70 rounded-md";

  return (
    <>
      <main id="main-content">

        {/* HERO */}
        <section id="acasa" aria-label="Pagina principală – introducere">
          <AiPortraitHero />
        </section>

        {/* WHY AI */}
        <section id="experiente" className="py-12 sm:py-16 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                <T path="whyAI.title" />
              </h2>
            </Reveal>

            <motion.ul
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={gridVariants}
            >
              <Feature fx={fx} pulseIndex={0} icon={<Puzzle className="h-6 w-6" />} title={<T path="whyAI.benefit1.title" />} text={<T path="whyAI.benefit1.description" />} link="/solutions" learnMore={<T path="hero.cta" />} />
              <Feature fx={fx} pulseIndex={1} icon={<Waves className="h-6 w-6" />} title={<T path="whyAI.benefit2.title" />} text={<T path="whyAI.benefit2.description" />} link="/solutions" learnMore={<T path="hero.cta" />} />
              <Feature fx={fx} pulseIndex={2} icon={<Eye className="h-6 w-6" />} title={<T path="whyAI.benefit3.title" />} text={<T path="whyAI.benefit3.description" />} link="/solutions" learnMore={<T path="hero.cta" />} />
              <Feature fx={fx} pulseIndex={3} icon={<FlaskConical className="h-6 w-6" />} title={<T path="whyAI.benefit4.title" />} text={<T path="whyAI.benefit4.description" />} link="/solutions" learnMore={<T path="hero.cta" />} />
            </motion.ul>
          </div>
        </section>

        {/* TINKA TRANSCRIBER – lazy loading (ascuns temporar, vezi lib/featureFlags.ts) */}
        {TRANSCRIBER_ENABLED && <TinkaTranscriberSection fx={fx} />}

        {/* FAQ */}
        <section id="faq" className="py-12 sm:py-16 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Reveal>
              <h3 className="text-2xl font-bold text-gray-200">
                <T path="contact.faq.title" />
              </h3>

              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="f1" className={`border-b border-white/10 ${fx}`}>
                  <AccordionTrigger><T path="contact.faq.question1.q" /></AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <T path="contact.faq.question1.a" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="f2" className={`border-b border-white/10 ${fx}`}>
                  <AccordionTrigger><T path="contact.faq.question2.q" /></AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <T path="contact.faq.question2.a" />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Reveal>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

    </>
  );
}

function Feature({ fx, icon, title, text, link, learnMore, pulseIndex = 0 }: any) {
  const reduceMotion = useReducedMotion();
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
  };

  return (
    <motion.li
      variants={itemVariants}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
      className={`p-5 rounded-xl border border-white/10 bg-white/5 ${fx}`}
    >
      <div className="flex items-center gap-3">
        <div
          className="ai-pulse-icon grid h-9 w-9 place-items-center rounded-md bg-white/8 text-sky-400"
          style={{ animationDelay: `${pulseIndex * 0.18}s` }}
        >
          {icon}
        </div>
        <h3 className="font-semibold text-gray-300 text-lg">{title}</h3>
      </div>

      <p className="mt-2 text-sm text-gray-300">{text}</p>

      <Link
        href={link}
        className="mt-3 inline-flex items-center gap-2 text-sky-300 text-sm hover:text-white transition-colors"
      >
        <Link2 className="h-4 w-4" />
        {learnMore}
      </Link>
    </motion.li>
  );
}
