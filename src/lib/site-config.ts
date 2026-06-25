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
  // আসল তথ্য: "Aufruf zur Mitwirkung am Kauf..." চুক্তি ও আহ্বান পত্র অনুযায়ী (১৭.০৭.২০২৫ স্বাক্ষরিত)
  fund: {
    targetAmount: 570000,
    currency: "EUR",
    purchaseDeadline: "2029-07-31",
    renovationCost: 165000,
    monthlyPlanAmount: 100,
    planPeopleMin: 100,
    planPeopleMax: 150,
    founded: 2012,
    capacity: 180,
  },
  // অনুদান মূলত অস্ট্রিয়া/ইউরোপ থেকে আসে — তাই শুধু ইউরোপীয় পেমেন্ট মাধ্যম রাখা হয়েছে (বিকাশ/নগদ প্রযোজ্য নয়)
  // ব্যাংক তথ্য আসল — "Aufruf zur Mitwirkung am Kauf..." পত্রের শেষে দেওয়া অফিসিয়াল ব্যাংক তথ্য থেকে
  deposit: {
    bank: {
      label: "ব্যাংক ট্রান্সফার (SEPA)",
      accountName: "Austria-Bangladesh Cultural Center – Baitul Mamur Masjid",
      iban: "AT41 2011 1821 3061 1600",
      bic: "GIBAATWWXXX",
      bankName: "Erste Bank",
      qrImage: "/payment.png",
    },
  },
  sheet: {
    donationsCsvUrl: process.env.SHEET_DONATIONS_CSV_URL ?? "",
    documentsCsvUrl: process.env.SHEET_DOCUMENTS_CSV_URL ?? "",
    revalidateSeconds: 300,
  },
  // গ্যালারি: পাবলিক Google Drive ফোল্ডার আইডি — ফোল্ডারে নতুন ছবি/ভিডিও যুক্ত করলে সাইটে অটো দেখা যাবে, কোনো CSV/লিংক ম্যানেজ করার প্রয়োজন নেই
  // ছবি ও ভিডিও একই ফোল্ডারে থাকতে পারে — videosFolderId আলাদা না দিলে photosFolderId থেকেই ভিডিও খোঁজা হয়
  drive: (() => {
    const photosFolderId =
      process.env.NEXT_PUBLIC_DRIVE_PHOTOS_FOLDER_ID ?? "1E1qG58dE_PI65mqyBfKh7jskB3b1qVZ-";
    return {
      photosFolderId,
      videosFolderId: process.env.NEXT_PUBLIC_DRIVE_VIDEOS_FOLDER_ID ?? photosFolderId,
      // সার্ভার-সাইড-অনলি (NEXT_PUBLIC_ প্রিফিক্স নেই) — ব্রাউজার বান্ডলে যায় না, fetch সবসময় Server Component-এ হয়
      apiKey: process.env.DRIVE_API_KEY ?? "",
    };
  })(),
};

export type SiteConfig = typeof siteConfig;
