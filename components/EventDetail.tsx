"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { wedding } from "@/lib/weddingData";

export default function EventDetail() {
  return (
    <section className="relative py-24 px-6 bg-ivory">
      <div className="max-w-3xl mx-auto">
        <motion.p
          className="text-center font-sans text-xs tracking-[0.3em] uppercase text-champagne mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Save The Date
        </motion.p>
        <h2 className="text-center font-display text-3xl md:text-4xl text-ink mb-16">
          Detail Acara
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {wedding.events.map((event, i) => (
            <motion.div
              key={event.title}
              className="bg-blush/30 border border-champagne/20 rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="font-display text-2xl text-ink mb-1">{event.title}</h3>
              <p className="font-romantic italic text-ink/60 mb-4">
                {event.day}, {event.date}
              </p>
              <p className="font-sans text-sm text-champagne mb-4">{event.time}</p>
              <div className="w-10 h-px bg-champagne/40 mx-auto mb-4" />
              <p className="font-sans text-sm text-ink/70 mb-1">{event.venueName}</p>
              <p className="font-sans text-xs text-ink/50 mb-5">{event.venueAddress}</p>
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-sans px-5 py-2.5 rounded-full bg-ink text-ivory hover:bg-emerald transition-colors"
              >
                <Navigation size={14} /> Buka Petunjuk Arah
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 rounded-2xl overflow-hidden border border-champagne/20 aspect-video flex items-center justify-center bg-blush/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-ink/40 gap-2">
            <MapPin size={28} />
            <span className="font-sans text-xs">Peta lokasi acara (embed Google Maps)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
