"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const photos = [
  { src: "/images/gallery-1.jpg", span: "row-span-2" },
  { src: "/images/gallery-2.jpg", span: "" },
  { src: "/images/gallery-3.jpg", span: "" },
  { src: "/images/gallery-4.jpg", span: "row-span-2" },
  { src: "/images/gallery-5.jpg", span: "" },
  { src: "/images/gallery-6.jpg", span: "" },
  { src: "/images/gallery-7.jpg", span: "" },
  { src: "/images/gallery-8.jpg", span: "row-span-2" },
];

export default function Gallery() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".gallery-item");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 32, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: (i % 4) * 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
          },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  function next() {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % photos.length);
  }
  function prev() {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + photos.length) % photos.length);
  }

  return (
    <section className="relative py-24 px-6 bg-ivory">
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-center font-sans text-xs tracking-[0.3em] uppercase text-rose-gold mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Moments
        </motion.p>
        <h2 className="text-center font-display text-3xl md:text-4xl text-ink mb-14">Galeri</h2>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[180px] gap-3"
        >
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`gallery-item group relative overflow-hidden rounded-2xl bg-blush/40 ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={`Galeri ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => (e.currentTarget.style.opacity = "0")}
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn
                  size={22}
                  className="text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
              className="absolute top-6 right-6 text-ivory/70 hover:text-ivory"
              aria-label="Tutup"
            >
              <X size={26} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 md:left-10 text-ivory/70 hover:text-ivory"
              aria-label="Sebelumnya"
            >
              <ChevronLeft size={32} />
            </button>
            <motion.img
              key={activeIndex}
              src={photos[activeIndex].src}
              alt={`Galeri ${activeIndex + 1}`}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 md:right-10 text-ivory/70 hover:text-ivory"
              aria-label="Selanjutnya"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
