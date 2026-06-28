"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Gift } from "lucide-react";
import { wedding } from "@/lib/weddingData";

export default function GiftSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function copyAccount(text: string, index: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1800);
    });
  }

  return (
    <section className="relative py-24 px-6 bg-ivory">
      <div className="max-w-xl mx-auto text-center">
        <Gift className="mx-auto text-champagne mb-3" size={28} />
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">Hadiah Digital</h2>
        <p className="font-romantic text-ink/60 mb-12">
          Doa dan kehadiran Anda adalah hadiah terbaik. Namun jika ingin memberi tanda kasih,
          kami sediakan beberapa pilihan di bawah ini.
        </p>

        <div className="space-y-4">
          {wedding.gifts.map((gift, i) =>
            gift.type === "BANK_TRANSFER" ? (
              <motion.div
                key={i}
                className="bg-blush/30 border border-champagne/20 rounded-2xl p-6 flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-left">
                  <p className="font-sans text-xs text-champagne uppercase tracking-wide mb-1">
                    {gift.bankName}
                  </p>
                  <p className="font-display text-lg text-ink">{gift.accountNumber}</p>
                  <p className="font-sans text-xs text-ink/50">{gift.accountName}</p>
                </div>
                <button
                  onClick={() => copyAccount(gift.accountNumber!, i)}
                  className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-ink text-ivory hover:bg-emerald transition-colors"
                >
                  {copiedIndex === i ? <Check size={13} /> : <Copy size={13} />}
                  {copiedIndex === i ? "Disalin" : "Salin"}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={i}
                className="bg-blush/30 border border-champagne/20 rounded-2xl p-6 flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="font-sans text-xs text-champagne uppercase tracking-wide mb-3">
                  Scan QRIS
                </p>
                <div className="w-40 h-40 bg-ivory rounded-xl border border-champagne/30 flex items-center justify-center text-ink/30 text-xs">
                  QR Code
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
