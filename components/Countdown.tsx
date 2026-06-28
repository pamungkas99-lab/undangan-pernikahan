"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Download } from "lucide-react";
import { wedding } from "@/lib/weddingData";

function getTimeLeft(targetISO: string) {
  const diff = +new Date(targetISO) - +new Date();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(() => getTimeLeft(wedding.weddingDateISO));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(wedding.weddingDateISO)), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Hari", value: time.days },
    { label: "Jam", value: time.hours },
    { label: "Menit", value: time.minutes },
    { label: "Detik", value: time.seconds },
  ];

  function downloadICS() {
    const date = new Date(wedding.weddingDateISO);
    const pad = (n: number) => String(n).padStart(2, "0");
    const fmt = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(
        d.getUTCHours()
      )}${pad(d.getUTCMinutes())}00Z`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${fmt(date)}`,
      `SUMMARY:Pernikahan ${wedding.groom.nickname} & ${wedding.bride.nickname}`,
      `DESCRIPTION:${wedding.events[1]?.venueName ?? ""}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "undangan-pernikahan.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  function googleCalendarUrl() {
    const date = new Date(wedding.weddingDateISO);
    const end = new Date(date.getTime() + 3 * 60 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `Pernikahan ${wedding.groom.nickname} & ${wedding.bride.nickname}`,
      dates: `${fmt(date)}/${fmt(end)}`,
      location: wedding.events[1]?.venueAddress ?? "",
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3 md:gap-6 mb-8">
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            className="flex flex-col items-center glass rounded-2xl px-4 md:px-6 py-4 min-w-[70px] md:min-w-[90px]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="font-display text-2xl md:text-4xl text-ink">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-wider text-ink/50 mt-1">
              {u.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <a
          href={googleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-sans px-4 py-2 rounded-full border border-champagne text-ink hover:bg-champagne/10 transition-colors"
        >
          <Calendar size={14} /> Google Calendar
        </a>
        <button
          onClick={downloadICS}
          className="flex items-center gap-2 text-xs font-sans px-4 py-2 rounded-full border border-champagne text-ink hover:bg-champagne/10 transition-colors"
        >
          <Download size={14} /> Unduh .ics
        </button>
      </div>
    </div>
  );
}
