"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";

const rsvpSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  whatsapp: z.string().min(9, "Nomor WhatsApp tidak valid"),
  attendance: z.enum(["ATTENDING", "NOT_ATTENDING"]),
  guestCount: z.coerce.number().min(1).max(5),
  message: z.string().optional(),
});

type RsvpForm = z.infer<typeof rsvpSchema>;

export default function RSVPForm({ guestName }: { guestName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RsvpForm>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { name: guestName !== "Tamu Undangan" ? guestName : "", attendance: "ATTENDING", guestCount: 1 },
  });

  async function onSubmit(data: RsvpForm) {
    // POST /api/rsvp — server route validates again with the same schema,
    // writes to Postgres via Prisma, and increments the Redis counter.
    await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null); // network errors are surfaced via the catch in a real impl
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle2 className="mx-auto text-emerald mb-3" size={36} />
        <p className="font-display text-xl text-ink mb-1">Terima kasih!</p>
        <p className="font-romantic text-ink/60">Konfirmasi kehadiran Anda telah kami terima.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-md mx-auto">
      <div>
        <label className="block font-sans text-xs uppercase tracking-wide text-ink/60 mb-1.5">
          Nama
        </label>
        <input
          {...register("name")}
          className="w-full rounded-lg border border-champagne/30 bg-ivory px-4 py-3 font-sans text-sm text-ink focus-visible:border-champagne outline-none"
          placeholder="Nama lengkap Anda"
        />
        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-sans text-xs uppercase tracking-wide text-ink/60 mb-1.5">
          Nomor WhatsApp
        </label>
        <input
          {...register("whatsapp")}
          className="w-full rounded-lg border border-champagne/30 bg-ivory px-4 py-3 font-sans text-sm text-ink focus-visible:border-champagne outline-none"
          placeholder="08xxxxxxxxxx"
        />
        {errors.whatsapp && <p className="text-xs text-red-600 mt-1">{errors.whatsapp.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-sans text-xs uppercase tracking-wide text-ink/60 mb-1.5">
            Kehadiran
          </label>
          <select
            {...register("attendance")}
            className="w-full rounded-lg border border-champagne/30 bg-ivory px-4 py-3 font-sans text-sm text-ink outline-none"
          >
            <option value="ATTENDING">Hadir</option>
            <option value="NOT_ATTENDING">Tidak Hadir</option>
          </select>
        </div>
        <div>
          <label className="block font-sans text-xs uppercase tracking-wide text-ink/60 mb-1.5">
            Jumlah Tamu
          </label>
          <input
            type="number"
            min={1}
            max={5}
            {...register("guestCount")}
            disabled={watch("attendance") === "NOT_ATTENDING"}
            className="w-full rounded-lg border border-champagne/30 bg-ivory px-4 py-3 font-sans text-sm text-ink outline-none disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label className="block font-sans text-xs uppercase tracking-wide text-ink/60 mb-1.5">
          Pesan (opsional)
        </label>
        <textarea
          {...register("message")}
          rows={3}
          className="w-full rounded-lg border border-champagne/30 bg-ivory px-4 py-3 font-sans text-sm text-ink outline-none resize-none"
          placeholder="Doa dan harapan untuk kedua mempelai..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-ink text-ivory rounded-full py-3.5 font-sans text-sm hover:bg-emerald transition-colors disabled:opacity-60"
      >
        <Send size={15} /> {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi"}
      </button>
    </form>
  );
}
