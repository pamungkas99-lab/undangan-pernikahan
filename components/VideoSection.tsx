"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

const VIDEO_ID = "dQw4w9WgXcQ"; // replace with the real pre-wedding video ID

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative py-24 px-6 bg-blush/30">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          className="font-sans text-xs tracking-[0.3em] uppercase text-rose-gold mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Cinematic
        </motion.p>
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-12">Pre-Wedding</h2>

        <motion.div
          className="relative rounded-[28px] overflow-hidden glass shadow-[0_30px_60px_-20px_rgba(26,23,20,0.25)] aspect-video"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
              title="Pre-Wedding Video"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Putar video"
            >
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="Pre-Wedding thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/40 transition-colors" />
              <motion.div
                className="relative z-10 w-16 h-16 rounded-full bg-ivory/90 flex items-center justify-center"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="text-ink ml-0.5" size={22} fill="currentColor" />
              </motion.div>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
