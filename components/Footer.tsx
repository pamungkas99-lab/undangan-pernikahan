import { Instagram, MessageCircle, Mail } from "lucide-react";
import { wedding } from "@/lib/weddingData";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory py-16 px-6 text-center">
      <p className="font-romantic italic text-lg mb-2 text-champagne-light">
        Terima kasih atas doa dan restu Anda
      </p>
      <h3 className="font-display text-2xl mb-6">
        {wedding.groom.nickname} & {wedding.bride.nickname}
      </h3>
      <div className="flex justify-center gap-5 mb-8">
        <a href={`https://instagram.com/${wedding.groom.instagram.replace("@", "")}`} aria-label="Instagram">
          <Instagram size={18} className="hover:text-champagne transition-colors" />
        </a>
        <a href="https://wa.me/6281234567890" aria-label="WhatsApp">
          <MessageCircle size={18} className="hover:text-champagne transition-colors" />
        </a>
        <a href="mailto:hello@andrakalya.id" aria-label="Email">
          <Mail size={18} className="hover:text-champagne transition-colors" />
        </a>
      </div>
      <p className="font-sans text-xs text-ivory/40">
        © {new Date().getFullYear()} {wedding.groom.nickname} & {wedding.bride.nickname}. Made with love.
      </p>
    </footer>
  );
}
