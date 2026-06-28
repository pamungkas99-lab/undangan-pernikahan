"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Countdown from "./Countdown";
import { wedding } from "@/lib/weddingData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbRef.current) return;
    gsap.to(orbRef.current, {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: orbRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden bg-gradient-to-b from-blush/40 via-ivory to-ivory">
      {/* Parallax ambient glow — signature soft-luxury backdrop */}
      <div
        ref={orbRef}
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-rose-gold-light/30 via-champagne/20 to-transparent blur-3xl pointer-events-none"
      />

      <motion.p
        className="font-sans text-xs tracking-[0.3em] uppercase text-champagne mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Save The Date
      </motion.p>

      <motion.h1
        className="font-display text-5xl md:text-7xl text-ink text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
      >
        <span className="text-gradient-gold animate-shimmer">{wedding.groom.nickname}</span>
        <span className="text-ink/30 mx-3">&</span>
        <span className="text-gradient-gold animate-shimmer">{wedding.bride.nickname}</span>
      </motion.h1>

      <motion.p
        className="font-romantic italic text-lg text-ink/60 max-w-md text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        “{wedding.quote}”
      </motion.p>

      <Countdown />

      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-1 text-ink/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-sans text-[10px] uppercase tracking-wide">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
