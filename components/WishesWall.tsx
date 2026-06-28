"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircleHeart } from "lucide-react";

interface WishItem {
  id: string;
  guestName: string;
  message: string;
  likeCount: number;
  adminReply?: string;
}

const initialWishes: WishItem[] = [
  {
    id: "1",
    guestName: "Dimas & Sari",
    message: "Selamat menempuh hidup baru! Semoga selalu bahagia dan dilimpahi keberkahan ❤️",
    likeCount: 12,
    adminReply: "Terima kasih banyak Dimas & Sari 🙏",
  },
  {
    id: "2",
    guestName: "Bunda Retno",
    message: "Bahagia selalu nak, jadi keluarga yang sakinah mawaddah warahmah.",
    likeCount: 8,
  },
];

export default function WishesWall() {
  const [wishes, setWishes] = useState(initialWishes);

  function handleLike(id: string) {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likeCount: w.likeCount + 1 } : w))
    );
  }

  return (
    <section className="relative py-24 px-6 bg-blush/30">
      <div className="max-w-2xl mx-auto">
        <motion.p
          className="text-center font-sans text-xs tracking-[0.3em] uppercase text-champagne mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Wishes
        </motion.p>
        <h2 className="text-center font-display text-3xl md:text-4xl text-ink mb-12">
          Ucapan & Doa
        </h2>

        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 mb-2">
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              className="bg-ivory rounded-2xl p-5 border border-champagne/15"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-sm text-ink">{wish.guestName}</span>
                <button
                  onClick={() => handleLike(wish.id)}
                  className="flex items-center gap-1 text-xs text-champagne hover:text-ink transition-colors"
                >
                  <Heart size={13} /> {wish.likeCount}
                </button>
              </div>
              <p className="font-romantic text-sm text-ink/70 leading-relaxed">{wish.message}</p>
              {wish.adminReply && (
                <div className="mt-3 flex items-start gap-2 bg-blush/40 rounded-lg px-3 py-2">
                  <MessageCircleHeart size={14} className="text-emerald mt-0.5 flex-shrink-0" />
                  <p className="font-sans text-xs text-ink/60 italic">{wish.adminReply}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <p className="text-center font-sans text-xs text-ink/40">
          Ucapan baru muncul secara realtime saat tamu mengisi RSVP di atas.
        </p>
      </div>
    </section>
  );
}
