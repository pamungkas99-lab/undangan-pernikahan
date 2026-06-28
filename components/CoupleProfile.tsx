"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { wedding } from "@/lib/weddingData";

function ProfileCard({
  person,
  align,
}: {
  person: typeof wedding.groom;
  align: "left" | "right";
}) {
  return (
    <motion.div
      className={`flex flex-col items-center text-center ${align === "left" ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}
      initial={{ opacity: 0, x: align === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-champagne/40 shadow-lg mb-5 bg-blush">
        {/* Replace with next/image once real photos are uploaded to Cloudinary */}
        <img
          src={person.photo}
          alt={person.fullName}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
      <h3 className="font-display text-2xl text-ink mb-1">{person.nickname}</h3>
      <p className="font-sans text-xs text-ink/50 mb-1">{person.fullName}</p>
      <p className="font-romantic italic text-sm text-ink/60 mb-3 max-w-xs">{person.parents}</p>
      <a
        href={`https://instagram.com/${person.instagram.replace("@", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-champagne hover:text-ink transition-colors mb-4"
      >
        <Instagram size={14} /> {person.instagram}
      </a>
      <p className="font-romantic text-base leading-relaxed text-ink/70 max-w-sm">{person.story}</p>
    </motion.div>
  );
}

export default function CoupleProfile() {
  return (
    <section className="relative py-24 px-6 bg-ivory">
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="text-center font-sans text-xs tracking-[0.3em] uppercase text-champagne mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Mempelai
        </motion.p>
        <h2 className="text-center font-display text-3xl md:text-4xl text-ink mb-16">
          Dengan Penuh Syukur
        </h2>

        <div className="grid md:grid-cols-2 gap-16 md:gap-10 relative">
          <ProfileCard person={wedding.groom} align="left" />
          <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 flex-col items-center h-full">
            <span className="font-display text-5xl text-champagne/50">&</span>
          </div>
          <ProfileCard person={wedding.bride} align="right" />
        </div>
      </div>
    </section>
  );
}
