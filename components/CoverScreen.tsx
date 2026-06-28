"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/lib/weddingData";

interface CoverScreenProps {
  guestName: string;
  onOpen: () => void;
}

export default function CoverScreen({ guestName, onOpen }: CoverScreenProps) {
  const [isOpening, setIsOpening] = useState(false);

  function handleOpen() {
    setIsOpening(true);
    // Wait for the seal-crack + envelope-lift sequence before revealing content
    window.setTimeout(onOpen, 1400);
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-ivory overflow-hidden"
        exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.2 } }}
      >
        {/* Ambient floating petals / texture */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-champagne/40"
              style={{ left: `${(i * 9.3) % 100}%`, top: `${(i * 17) % 100}%` }}
              animate={{ y: [0, -16, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center text-center px-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.p
            className="font-sans text-xs tracking-[0.3em] uppercase text-champagne mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            The Wedding Of
          </motion.p>

          <h1 className="font-display text-4xl md:text-6xl text-ink mb-2">
            {wedding.groom.nickname}
            <span className="text-champagne mx-3">&</span>
            {wedding.bride.nickname}
          </h1>

          <div className="w-16 h-px bg-champagne my-6" />

          {/* Envelope */}
          <motion.div
            className="relative w-64 h-44 mb-8"
            animate={isOpening ? { y: -20, opacity: 0 } : { y: [0, -6, 0] }}
            transition={
              isOpening
                ? { duration: 0.8, ease: "easeIn" }
                : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-blush to-rose-gold-light/40 border border-champagne/40 shadow-[0_20px_40px_-15px_rgba(26,23,20,0.25)]" />
            {/* envelope flap */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 bg-champagne-light origin-top"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
            {/* wax seal */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-emerald flex items-center justify-center shadow-lg"
              animate={
                isOpening
                  ? { scale: [1, 1.15, 0], rotate: [0, 8, -90], opacity: [1, 1, 0] }
                  : {}
              }
              transition={{ duration: 0.6, ease: "easeIn" }}
            >
              <span className="font-display text-champagne-light text-sm">
                {wedding.groom.nickname[0]}
                {wedding.bride.nickname[0]}
              </span>
            </motion.div>
          </motion.div>

          {guestName !== "Tamu Undangan" && (
            <div className="mb-8">
              <p className="font-romantic italic text-sm text-ink/60 mb-1">Kepada Yth.</p>
              <p className="font-display text-xl text-ink">{guestName}</p>
            </div>
          )}

          <motion.button
            onClick={handleOpen}
            disabled={isOpening}
            className="group relative px-8 py-3 rounded-full bg-ink text-ivory font-sans text-sm tracking-wide overflow-hidden disabled:opacity-60"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">
              {isOpening ? "Membuka..." : "Buka Undangan"}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-champagne to-champagne-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>

          <p className="font-romantic italic text-xs text-ink/50 mt-6">
            {new Date(wedding.weddingDateISO).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
