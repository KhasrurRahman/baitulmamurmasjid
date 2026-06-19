import type { Locale } from "./config";

export type DocumentEntry = {
  title: string;
  description: string;
  fileUrl?: string;
  driveLink?: string;
};

const de = {
  nav: {
    home: "Start",
    about: "Über die Moschee",
    fund: "Spendenstand",
    gallery: "Galerie",
    documents: "Dokumente",
  },
  common: {
    viewFullHistory: "Vollständige Historie ansehen →",
    viewAll: "Alle ansehen →",
    fullGallery: "Ganze Galerie →",
  },
  home: {
    tagline: "Austria-Bangladesh Cultural Center",
    ctaDonate: "Jetzt spenden",
    ctaAbout: "Mehr über die Moschee",
    fundTitle: "Spendenaktion: Kauf der Moschee",
    recentTitle: "Aktuelle Spenden",
    tableDate: "Datum",
    tableDonor: "Spender",
    tableMethod: "Methode",
    tableAmount: "Betrag",
    galleryTitle: "Galerie",
    galleryEmpty: "Noch kein Fotoordner verknüpft.",
  },
  about: {
    title: "Über die Moschee",
    description:
      "Die Baitul Mamur Moschee besteht seit 2012 im 20. Bezirk Wiens (Leystraße 33, 1200 Wien) und dient der muslimischen Gemeinschaft für die fünf täglichen Gebete, das Freitagsgebet, religiöse Bildung und soziale Aktivitäten. Aktuell läuft eine Spendenaktion, um die Immobilie dauerhaft zu erwerben und als Waqf (religiöse Stiftung) für die Muslime zu sichern.",
    addressLabel: "Adresse",
    ratingLabel: "Bewertung",
    reviewsSuffix: "Bewertungen",
    mapLink: "Eingang auf Google Maps ansehen →",
    factsTitle: "Auf einen Blick",
    facts: [
      "Gegründet 2012 (1433 n. H.)",
      "Kapazität: bis zu 180 Personen",
      "Rund um die Uhr geöffnet",
      "5 tägliche Pflichtgebete & Freitagsgebet (teils zweimal)",
      "Tarawih-Gebete im Ramadan",
      "Qur'an-Unterricht für Kinder und Erwachsene",
      "Seit über 12 Jahren tägliches kostenloses Iftar (~100 Mahlzeiten/Tag im Ramadan)",
    ],
  },
  fund: {
    title: "Spendenstand & Kauf der Moschee",
    subtitle:
      "Vollständige Historie und Fortschritt der Spendenaktion zum dauerhaften Kauf der Moschee.",
    historyTitle: "Vollständige Spendenhistorie",
    collected: "Gesammelt",
    target: "Ziel",
    remaining: "verbleibend",
    percentCollected: "% gesammelt",
    monthlyChart: "Monatliche Spenden",
    trendChart: "Gesamtverlauf",
    contextTitle: "Hintergrund & Anlass",
    contextText:
      "Gemäß dem am 17.07.2025 (12. Muharram 1447 n. H.) unterzeichneten Vertrag zwischen der Moscheeverwaltung und der verkaufenden Firma beträgt der Kaufpreis der Immobilie 570.000 € und bleibt bis zum 31.07.2029 unverändert. Die Moschee wurde zudem von August bis Oktober 2025 vollständig renoviert und modernisiert, mit Kosten von 165.000 €.",
    planTitle: "Aktueller Finanzierungsplan",
    planText:
      "Ziel ist es, 100 bis 150 Personen zu gewinnen, die sich verpflichten, monatlich mindestens 100 € zu spenden (entspricht einem Anteil) — bis zum Stichtag 31.07.2029. Wohlhabendere Personen sind eingeladen, großzügiger zu spenden. Alle Spenden gehen auf das offizielle Konto der Moschee.",
    factsTitle: "Kennzahlen",
    facts: [
      { label: "Kaufpreis der Immobilie", value: "570.000 €" },
      { label: "Frist für den Kaufpreis", value: "31.07.2029" },
      { label: "Bereits investiert in Renovierung (2025)", value: "165.000 €" },
      { label: "Angestrebte Spender", value: "100–150 Personen" },
      { label: "Mindestbeitrag pro Person", value: "100 €/Monat" },
    ],
  },
  deposit: {
    title: "Wohin spenden?",
    subtitle: "Spenden können über folgende Wege überwiesen werden (aus Österreich/Europa).",
    accountNameLabel: "Kontoinhaber",
    bankLabel: "Bank",
  },
  gallery: {
    title: "Galerie",
    subtitle:
      "Fotos und Videos der Moschee. Neue Inhalte im Drive-Ordner erscheinen automatisch hier.",
    photosTitle: "Fotos",
    videosTitle: "Videos",
    photosEmpty: "Noch kein Fotoordner verknüpft.",
    videosEmpty: "Noch keine Videos in diesem Ordner.",
  },
  documents: {
    title: "Dokumente",
    subtitle:
      "Kaufvertrag, Mietvertrag-Nachtrag, Spendenaufrufe und weitere wichtige Unterlagen zum Moscheekauf.",
    previewPlaceholder: "Vorschau folgt, sobald der Dokumentlink hinterlegt ist.",
    items: [
      {
        title: "Aufruf zur Mitwirkung am Kauf der Moschee (Deutsch)",
        description:
          "Offizielles Spendenaufruf-Schreiben mit Hintergrund, Finanzierungsplan und Bankverbindung. Datiert 27. Ramadan 1447 n. H. (16.03.2026).",
        fileUrl: "/docs/kauf_aufruf_de.pdf",
      },
      {
        title: "Aufruf zur Mitwirkung am Kauf der Moschee (Arabisch)",
        description: "Arabische Fassung des offiziellen Spendenaufrufs.",
        fileUrl: "/docs/kauf_aufruf_ar.pdf",
      },
      {
        title: "ক্রয়ে অংশগ্রহণের আহ্বান (বাংলা)",
        description: "বাংলা ভাষায় অফিসিয়াল আহ্বান পত্র।",
        fileUrl: "/docs/kauf_aufruf_bn.pdf",
      },
      {
        title: "Nachtrag zum Mietvertrag (17.07.2025)",
        description:
          "Nachtrag zum Mietvertrag vom 27.3.2012 zwischen PRIMAINVEST GmbH (Vermieterin) und Austria Bangladesch Cultural Center / Baitul Mamur Masjid (Mieterin) — inkl. Vorkaufsrecht zum Kaufpreis von 570.000 € bis 31.07.2029.",
        fileUrl: "/docs/mietvertrag_nachtrag.jpg",
      },
    ] as DocumentEntry[],
  },
  footer: {
    rights: "Alle Rechte vorbehalten.",
    developedBy: "Entwickelt von",
  },
  languageSwitch: {
    label: "Sprache",
  },
};

const bn: typeof de = {
  nav: {
    home: "হোম",
    about: "মসজিদ সম্পর্কে",
    fund: "ফান্ড ডিটেইলস",
    gallery: "গ্যালারি",
    documents: "ডকুমেন্টস",
  },
  common: {
    viewFullHistory: "সম্পূর্ণ হিস্টোরি দেখুন →",
    viewAll: "সব দেখুন →",
    fullGallery: "সম্পূর্ণ গ্যালারি →",
  },
  home: {
    tagline: "অস্ট্রিয়া-বাংলাদেশ কালচারাল সেন্টার",
    ctaDonate: "ফান্ডে অনুদান দিন",
    ctaAbout: "মসজিদ সম্পর্কে জানুন",
    fundTitle: "মসজিদ স্থায়ীভাবে ক্রয়ের ফান্ড",
    recentTitle: "সাম্প্রতিক অনুদান",
    tableDate: "তারিখ",
    tableDonor: "দাতা",
    tableMethod: "মাধ্যম",
    tableAmount: "পরিমাণ",
    galleryTitle: "গ্যালারি",
    galleryEmpty: "এখনো কোনো ছবির ফোল্ডার যুক্ত করা হয়নি।",
  },
  about: {
    title: "মসজিদ সম্পর্কে",
    description:
      "বাইতুল মামুর মসজিদ ভিয়েনার ২০তম জেলায় (Leystraße 33, 1200 Wien) ২০১২ সাল থেকে প্রতিষ্ঠিত, যেখানে মুসলিম সম্প্রদায় পাঁচ ওয়াক্ত নামাজ, জুমার নামাজ, দ্বীনি শিক্ষা ও সামাজিক কর্মকাণ্ডের জন্য একত্রিত হয়। মসজিদটি স্থায়ীভাবে ক্রয় করে মুসলিমদের জন্য ওয়াকফ (ধর্মীয় দাতব্য সম্পত্তি) করার লক্ষ্যে কমিউনিটি থেকে অনুদান সংগ্রহ করা হচ্ছে।",
    addressLabel: "ঠিকানা",
    ratingLabel: "রেটিং",
    reviewsSuffix: "টি রিভিউ",
    mapLink: "Google Maps-এ মসজিদের প্রবেশপথ দেখুন →",
    factsTitle: "এক নজরে",
    facts: [
      "প্রতিষ্ঠিত ২০১২ সাল (১৪৩৩ হিজরি)",
      "ধারণক্ষমতা: ১৮০ জন পর্যন্ত",
      "২৪ ঘণ্টা খোলা",
      "৫ ওয়াক্ত নামাজ ও জুমার নামাজ (কখনও কখনও দুইবার)",
      "রমজানে তারাবিহ নামাজ",
      "শিশু ও প্রাপ্তবয়স্কদের কুরআন শিক্ষা",
      "১২ বছরেরও বেশি সময় ধরে প্রতিদিন বিনামূল্যে ইফতার (রমজানে প্রায় ১০০ জনের জন্য)",
    ],
  },
  fund: {
    title: "ফান্ড ডিটেইলস ও মসজিদ ক্রয়",
    subtitle: "মসজিদ স্থায়ীভাবে ক্রয়ের জন্য সংগৃহীত প্রতিটি অনুদানের সম্পূর্ণ হিস্টোরি ও অগ্রগতি।",
    historyTitle: "সম্পূর্ণ দান হিস্টোরি",
    collected: "সংগৃহীত",
    target: "লক্ষ্য",
    remaining: "বাকি",
    percentCollected: "% সংগৃহীত",
    monthlyChart: "মাসিক অনুদান",
    trendChart: "সামগ্রিক ট্রেন্ড",
    contextTitle: "প্রেক্ষাপট ও উদ্দেশ্য",
    contextText:
      "১৭.০৭.২০২৫ তারিখে (১২ মহররম ১৪৪৭ হিজরি) মসজিদ কর্তৃপক্ষ ও সম্পত্তি বিক্রয়কারী প্রতিষ্ঠানের মধ্যে স্বাক্ষরিত চুক্তি অনুযায়ী, সম্পত্তির মূল্য ৫৭০,০০০ ইউরো, যা ৩১.০৭.২০২৯ পর্যন্ত অপরিবর্তিত থাকবে। এছাড়াও মসজিদটি আগস্ট থেকে অক্টোবর ২০২৫ সময়কালে সম্পূর্ণভাবে সংস্কার ও নবায়ন করা হয়েছে, যাতে ব্যয় হয়েছে ১৬৫,০০০ ইউরো।",
    planTitle: "বর্তমান অর্থসংগ্রহ পরিকল্পনা",
    planText:
      "লক্ষ্য হলো ১০০ থেকে ১৫০ জন ব্যক্তিকে অন্তর্ভুক্ত করা, যারা প্রতি মাসে কমপক্ষে ১০০ ইউরো করে দান করবেন (একটি অংশের সমমূল্য), ৩১.০৭.২০২৯ পর্যন্ত। সামর্থ্যবান ব্যক্তিদের আরও বেশি দান করার আহ্বান জানানো হচ্ছে। সমস্ত দান মসজিদের অফিসিয়াল ব্যাংক হিসাবে জমা হবে।",
    factsTitle: "মূল তথ্য",
    facts: [
      { label: "সম্পত্তির ক্রয়মূল্য", value: "৫৭০,০০০ ইউরো" },
      { label: "ক্রয়মূল্য পরিশোধের সময়সীমা", value: "৩১.০৭.২০২৯" },
      { label: "সংস্কারে ইতিমধ্যে বিনিয়োগ (২০২৫)", value: "১৬৫,০০০ ইউরো" },
      { label: "লক্ষ্যভুক্ত দাতা সংখ্যা", value: "১০০–১৫০ জন" },
      { label: "প্রতি ব্যক্তির সর্বনিম্ন অনুদান", value: "১০০ ইউরো/মাস" },
    ],
  },
  deposit: {
    title: "কোথায় টাকা জমা দেবেন",
    subtitle: "নিচের যেকোনো মাধ্যমে অনুদান পাঠাতে পারেন (অস্ট্রিয়া/ইউরোপ থেকে)।",
    accountNameLabel: "অ্যাকাউন্টের নাম",
    bankLabel: "ব্যাংক",
  },
  gallery: {
    title: "গ্যালারি",
    subtitle: "মসজিদের ছবি ও ভিডিও সংগ্রহ। নতুন ছবি/ভিডিও Drive ফোল্ডারে যুক্ত হলে এখানে সরাসরি দেখা যাবে।",
    photosTitle: "ছবি",
    videosTitle: "ভিডিও",
    photosEmpty: "এখনো কোনো ছবির ফোল্ডার যুক্ত করা হয়নি।",
    videosEmpty: "ভিডিও ফোল্ডার যুক্ত হলে এখানে দেখা যাবে — খুব শীঘ্রই আসছে।",
  },
  documents: {
    title: "ডকুমেন্টস",
    subtitle: "মসজিদ ক্রয় সম্পর্কিত দলিল, চুক্তিপত্র, আহ্বান পত্র ও অন্যান্য গুরুত্বপূর্ণ কাগজপত্র।",
    previewPlaceholder: "ডকুমেন্ট লিংক যুক্ত করা হলে এখানে প্রিভিউ দেখা যাবে",
    items: [
      {
        title: "মসজিদ ক্রয়ে অংশগ্রহণের আহ্বান (বাংলা)",
        description:
          "প্রেক্ষাপট, অর্থসংগ্রহ পরিকল্পনা ও ব্যাংক তথ্য সহ অফিসিয়াল আহ্বান পত্র। তারিখ: ২৭ রমজান ১৪৪৭ হিজরি (১৬.০৩.২০২৬)।",
        fileUrl: "/docs/kauf_aufruf_bn.pdf",
      },
      {
        title: "Aufruf zur Mitwirkung am Kauf der Moschee (জার্মান)",
        description: "অফিসিয়াল আহ্বান পত্রের জার্মান সংস্করণ।",
        fileUrl: "/docs/kauf_aufruf_de.pdf",
      },
      {
        title: "خطاب للمساهمة في شراء مسجد (আরবি)",
        description: "অফিসিয়াল আহ্বান পত্রের আরবি সংস্করণ।",
        fileUrl: "/docs/kauf_aufruf_ar.pdf",
      },
      {
        title: "ভাড়া চুক্তির সংযোজনী (Nachtrag zum Mietvertrag, ১৭.০৭.২০২৫)",
        description:
          "২৭.৩.২০১২ তারিখের ভাড়া চুক্তির সংযোজনী — PRIMAINVEST GmbH (ভাড়াদাতা) ও Austria Bangladesch Cultural Center / Baitul Mamur Masjid (ভাড়াটিয়া)-র মধ্যে — যাতে ৫৭০,০০০ ইউরো ক্রয়মূল্যে অগ্রক্রয়ের অধিকার (Vorkaufsrecht) ৩১.০৭.২০২৯ পর্যন্ত অন্তর্ভুক্ত আছে।",
        fileUrl: "/docs/mietvertrag_nachtrag.jpg",
      },
    ] as DocumentEntry[],
  },
  footer: {
    rights: "সর্বস্বত্ব সংরক্ষিত।",
    developedBy: "Developed by",
  },
  languageSwitch: {
    label: "ভাষা",
  },
};

export const dictionaries = { de, bn };

export type Dictionary = typeof de;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
