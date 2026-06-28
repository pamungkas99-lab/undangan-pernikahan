"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/weddingData";

export default function LoveStory() {
  return (
    <section className="relative py-24 px-6 bg-blush/30">
      <div className="max-w-2xl mx-auto">
        <motion.p
          className="text-center font-sans text-xs tracking-[0.3em] uppercase text-champagne mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Journey
        </motion.p>
        <h2 className="text-center font-display text-3xl md:text-4xl text-ink mb-16">
          Kisah Cinta Kami
        </h2>

        <div className="gold-thread pl-14 space-y-14">
          {wedding.loveStory.map((item, i) => (
            <motion.div
              key={item.title}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <div className="absolute -left-14 top-1 w-12 h-12 rounded-full bg-ivory border-2 border-champagne flex items-center justify-center">
                <span className="font-display text-sm text-champagne">{i + 1}</span>
              </div>
              <div className="bg-ivory rounded-2xl p-6 shadow-sm border border-champagne/15">
                <span className="font-sans text-xs uppercase tracking-wide text-champagne">
                  {item.date}
                </span>
                <h3 className="font-display text-xl text-ink mt-1 mb-2">{item.title}</h3>
                <p className="font-romantic text-base text-ink/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
