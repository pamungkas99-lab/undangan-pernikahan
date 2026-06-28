"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import CoverScreen from "@/components/CoverScreen";
import Hero from "@/components/Hero";
import CoupleProfile from "@/components/CoupleProfile";
import LoveStory from "@/components/LoveStory";
import EventDetail from "@/components/EventDetail";
import Gallery from "@/components/Gallery";
import VideoSection from "@/components/VideoSection";
import RSVPForm from "@/components/RSVPForm";
import WishesWall from "@/components/WishesWall";
import GiftSection from "@/components/GiftSection";
import MusicPlayer from "@/components/MusicPlayer";
import Footer from "@/components/Footer";

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestName = decodeURIComponent(searchParams.get("to") ?? "Tamu Undangan").replace(/\+/g, " ");

  const [isOpened, setIsOpened] = useState(false);

  return (
    <main className="relative">
      {!isOpened && <CoverScreen guestName={guestName} onOpen={() => setIsOpened(true)} />}

      {isOpened && (
        <>
          <MusicPlayer autoplay={isOpened} />
          <Hero />
          <CoupleProfile />
          <LoveStory />
          <Gallery />
          <VideoSection />
          <EventDetail />
          <section className="py-24 px-6 bg-blush/30">
            <h2 className="text-center font-display text-3xl md:text-4xl text-ink mb-12">
              Konfirmasi Kehadiran
            </h2>
            <RSVPForm guestName={guestName} />
          </section>
          <WishesWall />
          <GiftSection />
          <Footer />
        </>
      )}
    </main>
  );
}

export default function InvitationPage() {
  return (
    <Suspense fallback={null}>
      <InvitationContent />
    </Suspense>
  );
}

