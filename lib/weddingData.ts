// Replace this with real data fetched from the database (Prisma) once
// the admin dashboard is wired up. Kept as a typed static module for now
// so the frontend pages are fully functional out of the box.

export const wedding = {
  groom: {
    fullName: "Andra Wicaksono Putra",
    nickname: "Andra",
    parents: "Putra dari Bapak Hartono & Ibu Sulistyowati",
    instagram: "@andra.wp",
    story:
      "Anak pertama dari dua bersaudara, dibesarkan di Yogyakarta. Bekerja sebagai software engineer dan percaya bahwa hal-hal sederhana, dilakukan dengan konsisten, adalah bentuk cinta yang paling nyata.",
    photo: "/images/groom.jpg",
  },
  bride: {
    fullName: "Kalya Anindita Maheswari",
    nickname: "Kalya",
    parents: "Putri dari Bapak Soewondo & Ibu Retno Wulandari",
    instagram: "@kalya.am",
    story:
      "Anak kedua dari tiga bersaudara, tumbuh di Semarang. Seorang arsitek interior yang percaya bahwa rumah terbaik bukan soal ruangnya, tapi siapa yang mengisinya.",
    photo: "/images/bride.jpg",
  },
  weddingDateISO: "2027-02-14T08:00:00+07:00",
  quote:
    "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan, agar kamu tenang bersamanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. — QS. Ar-Rum: 21",
  events: [
    {
      type: "AKAD" as const,
      title: "Akad Nikah",
      day: "Sabtu",
      date: "14 Februari 2027",
      time: "08.00 — 09.30 WIB",
      venueName: "Kediaman Keluarga Mempelai Wanita",
      venueAddress: "Jl. Diponegoro No. 45, Semarang, Jawa Tengah",
      mapsUrl: "https://maps.google.com/?q=Semarang",
    },
    {
      type: "RESEPSI" as const,
      title: "Resepsi Pernikahan",
      day: "Sabtu",
      date: "14 Februari 2027",
      time: "11.00 — 14.00 WIB",
      venueName: "Grand Ballroom, Hotel Tentrem",
      venueAddress: "Jl. Gajahmada No. 123, Semarang, Jawa Tengah",
      mapsUrl: "https://maps.google.com/?q=Hotel+Tentrem+Semarang",
    },
  ],
  loveStory: [
    {
      title: "Pertama Bertemu",
      date: "Maret 2021",
      description:
        "Bertemu di sebuah acara peluncuran produk, duduk di meja yang sama secara tidak sengaja, dan mengobrol hingga acara selesai.",
      image: "/images/story-1.jpg",
    },
    {
      title: "Mulai Berpacaran",
      date: "Agustus 2021",
      description:
        "Setelah beberapa bulan dekat sebagai teman, Andra memberanikan diri mengungkapkan perasaannya di sebuah kedai kopi kecil.",
      image: "/images/story-2.jpg",
    },
    {
      title: "Lamaran",
      date: "Juni 2025",
      description:
        "Andra melamar Kalya di tempat pertama mereka bertemu, disaksikan oleh keluarga terdekat.",
      image: "/images/story-3.jpg",
    },
    {
      title: "Menikah",
      date: "14 Februari 2027",
      description:
        "Hari yang telah dinanti, dua keluarga dan dua hati bersatu dalam ikatan pernikahan.",
      image: "/images/story-4.jpg",
    },
  ],
  gifts: [
    {
      type: "BANK_TRANSFER" as const,
      bankName: "BCA",
      accountName: "Andra Wicaksono Putra",
      accountNumber: "1234567890",
    },
    {
      type: "QRIS" as const,
      qrImageUrl: "/images/qris.png",
    },
  ],
  music: {
    title: "Perfect — Ed Sheeran (Cover)",
    src: "/audio/wedding-theme.mp3",
  },
};

export type Wedding = typeof wedding;
