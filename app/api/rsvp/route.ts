import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// Server-side schema mirrors the client schema in components/RSVPForm.tsx.
// Never trust client validation alone — this route re-validates everything.
const rsvpSchema = z.object({
  name: z.string().min(3).max(100),
  whatsapp: z.string().min(9).max(20),
  attendance: z.enum(["ATTENDING", "NOT_ATTENDING"]),
  guestCount: z.coerce.number().min(1).max(5),
  message: z.string().max(500).optional(),
});

// Simple in-memory rate limit placeholder — replace with Redis (ioredis)
// sliding-window limiter before production deployment.
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const last = recentSubmissions.get(ip);
  if (last && now - last < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json({ error: "Terlalu banyak permintaan, coba lagi sebentar." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data tidak valid", issues: parsed.error.flatten() }, { status: 400 });
  }

  recentSubmissions.set(ip, now);

  try {
    // NOTE: weddingId would normally come from the active wedding's slug —
    // hardcoded lookup omitted here since this project is scoped to one wedding.
    const wedding = await prisma.wedding.findFirst();
    if (!wedding) {
      return NextResponse.json({ error: "Wedding belum dikonfigurasi" }, { status: 500 });
    }

    const guest = await prisma.guest.create({
      data: {
        weddingId: wedding.id,
        name: parsed.data.name,
        whatsapp: parsed.data.whatsapp,
        attendance: parsed.data.attendance,
        attendingQty: parsed.data.guestCount,
        message: parsed.data.message,
        source: "url",
      },
    });

    return NextResponse.json({ success: true, guestId: guest.id }, { status: 201 });
  } catch (err) {
    console.error("RSVP submission failed", err);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
