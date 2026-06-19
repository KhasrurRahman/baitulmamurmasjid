export const siteConfig = {
  name: "বাইতুল মামুর মসজিদ",
  nameEn: "Baitul Mamur Masjid",
  // ডোমেইন কেনার পর NEXT_PUBLIC_SITE_URL env var-এ আসল URL সেট করতে হবে (যেমন https://baitulmamur.at)
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-image.jpg",
  address: "Leystraße 33, 1200 Wien, Austria",
  plusCode: "69VH+C2 Vienna",
  rating: 5.0,
  reviewCount: 9,
  mapsQuery: "48.2435556,16.3775964",
  mapsViewUrl:
    "https://www.google.com/maps/place/Baitul+Mamur+Masjid+%D9%85%D8%B3%D8%AC%D8%AF+%D8%A7%D9%84%D8%A8%D9%8A%D8%AA+%D8%A7%D9%84%D9%85%D8%B9%D9%85%D9%88%D8%B1/@48.2435131,16.377498,17z",
  description:
    "বাইতুল মামুর মসজিদ ভিয়েনার ২০তম জেলায় (Leystraße 33, 1200 Wien) অবস্থিত একটি মসজিদ, যেখানে মুসলিম সম্প্রদায় নামাজ, দ্বীনি শিক্ষা ও সামাজিক কর্মকাণ্ডের জন্য একত্রিত হয়। মসজিদটি স্থায়ীভাবে ক্রয়ের লক্ষ্যে কমিউনিটি থেকে অনুদান সংগ্রহ করা হচ্ছে।",
  fund: {
    targetAmount: 250000,
    currency: "EUR",
  },
  // অনুদান মূলত অস্ট্রিয়া/ইউরোপ থেকে আসে — তাই শুধু ইউরোপীয় পেমেন্ট মাধ্যম রাখা হয়েছে (বিকাশ/নগদ প্রযোজ্য নয়)
  deposit: {
    bank: {
      label: "ব্যাংক ট্রান্সফার (SEPA)",
      accountName: "Baitul Mamur Masjid Verein",
      iban: "AT00 0000 0000 0000 0000",
      bic: "XXXXXXXX",
      bankName: "Erste Bank",
      qrImage: "/deposit/bank-qr.svg",
    },
    paypal: {
      label: "PayPal",
      account: "donate@baitulmamur.example",
      qrImage: "/deposit/paypal-qr.svg",
    },
    cash: {
      label: "নগদ (মসজিদে সরাসরি)",
      note: "জুমার নামাজের পর মসজিদ কমিটির কাছে সরাসরি জমা দিতে পারেন।",
      qrImage: "/deposit/cash-qr.svg",
    },
  },
  sheet: {
    donationsCsvUrl: process.env.SHEET_DONATIONS_CSV_URL ?? "",
    galleryCsvUrl: process.env.SHEET_GALLERY_CSV_URL ?? "",
    documentsCsvUrl: process.env.SHEET_DOCUMENTS_CSV_URL ?? "",
    revalidateSeconds: 3600,
  },
};

export type SiteConfig = typeof siteConfig;
