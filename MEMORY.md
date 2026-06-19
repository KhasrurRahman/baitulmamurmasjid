# MEMORY — অগ্রগতি ট্র্যাকার

> এই ফাইল প্রতি সেশনে Claude নিজেই আপডেট করবে (নির্দেশনা: CLAUDE.md দেখুন)। সবচেয়ে সাম্প্রতিক অবস্থা সবার উপরে।

## অবস্থা: Favicon + social share (OG/Twitter card) মেটাডেটা সেট করা হয়েছে — domain কেনা ও real Sheet/asset বসানো বাকি
তারিখ: 2026-06-19

### সাম্প্রতিক আপডেট: Favicon ও social-share মেটা ট্যাগ
- `sharp` (ইতিমধ্যে next-এর dependency হিসেবে ইনস্টল ছিল) দিয়ে স্ক্রিপ্ট চালিয়ে `public/logo.png` থেকে `src/app/icon.png` (512x512, সাদা ব্যাকগ্রাউন্ডে প্যাডেড লোগো) এবং `src/app/apple-icon.png` (180x180) জেনারেট করা হয়েছে — Next.js App Router-এর ফাইল-কনভেনশন অনুযায়ী এগুলো অটো favicon/apple-touch-icon হিসেবে সার্ভ হয় (`npm run build`-এ `/icon.png`, `/apple-icon.png` রুট দেখা গেছে)। পুরনো ডিফল্ট `src/app/favicon.ico` ডিলিট করা হয়েছে যাতে কনফ্লিক্ট না হয়।
- **OG শেয়ার ইমেজ**: `public/og-image.jpg` (1200x630) — `banner.jpeg`-এর উপর dark gradient + সাদা রাউন্ডেড ব্যাজে লোগো + "Baitul Mamur Masjid" / ঠিকানা টেক্সট কম্পোজ করে sharp দিয়ে বানানো হয়েছে। এই ইমেজ জেনারেট করার নোড স্ক্রিপ্টটা কোথাও সেভ করা নেই (one-off bash কমান্ডে চালানো হয়েছিল) — ভবিষ্যতে আবার বানাতে চাইলে নতুন করে sharp স্ক্রিপ্ট লিখতে হবে, বা ম্যানুয়ালি ডিজাইন টুলে বানিয়ে `public/og-image.jpg`-এ বসিয়ে দেওয়া যায়।
- `src/lib/site-config.ts`-এ `siteUrl` (env var `NEXT_PUBLIC_SITE_URL`, ডিফল্ট `http://localhost:3000`) এবং `ogImage: "/og-image.jpg"` যুক্ত করা হয়েছে।
- `src/app/layout.tsx`-এ পূর্ণ metadata: `metadataBase`, title template, `openGraph` (locale `bn_BD`, siteName, og:image সহ), `twitter` (`summary_large_image` card), `icons` (icon/apple), এবং আলাদা `viewport` export-এ `themeColor: "#065f46"`। বিল্ড করে `<head>`-এ og:title/og:image/icon লিংক যাচাই করা হয়েছে — সব ঠিকভাবে রেন্ডার হচ্ছে।
- **জরুরি বাকি কাজ**: ডোমেইন কেনার পর `.env.local`-এ `NEXT_PUBLIC_SITE_URL=https://<আসল-ডোমেইন>` সেট করতে হবে — এখন localhost ফলব্যাকে আছে, তাই WhatsApp/Messenger প্রিভিউ লোকাল URL দেখাবে যতক্ষণ প্রোডাকশনে ডিপ্লয় করে env var সেট না হয়।

### আগের আপডেট: ফুটার ডেভেলপার ক্রেডিট
- `Footer.tsx`-এ "Developed by Khasrur Rahman" প্লেইন টেক্সট লিংক (আইকন ছাড়া, ইউজারের অনুরোধে) — লিংক: https://www.linkedin.com/in/khasrur-rahmna/ (নতুন ট্যাবে খোলে, `rel="noopener noreferrer"`)। কপিরাইট লাইনের পাশে/নিচে (মোবাইলে স্ট্যাক, ডেস্কটপে সাইড-বাই-সাইড) বসানো হয়েছে।

### সাম্প্রতিক আপডেট: মোবাইল রেসপন্সিভনেস
- `Navbar` client component-এ রূপান্তর করে real hamburger মেনু যুক্ত করা হয়েছে (`md:` ব্রেকপয়েন্টে আগের horizontal লিংক লিস্ট, তার নিচে collapsible mobile dropdown, লোগো সাইজ মোবাইলে ছোট)।
- `FundProgress`: কার্ড padding (`p-4 sm:p-6`), অঙ্কের ফন্ট সাইজ, চার্ট height (`h-48 sm:h-56`) এবং Recharts `margin`/`YAxis width=40` কমিয়ে ছোট স্ক্রিনে চার্ট ক্লিপিং এড়ানো হয়েছে।
- হোম পেজের সব সেকশনের vertical padding (`py-8 sm:py-12`), heading সাইজ (`text-xl sm:text-2xl`) এবং সেকশন হেডার রো (heading + "সব দেখুন" লিংক) `flex-wrap` করা হয়েছে যাতে ছোট স্ক্রিনে লিংক হিডিং-এর সাথে ওভারল্যাপ না করে।
- `/fund`, `/about`, `/gallery`, `/documents` পেজেও একই প্যাটার্নে padding/heading/iframe height রেসপন্সিভ করা হয়েছে (যেমন about পেজের map iframe `h-64 sm:h-80`, documents পেজের PDF preview `h-80 sm:h-120`)।
- `DepositCard` outer padding ও heading রেসপন্সিভ করা হয়েছে; গ্রিড আগে থেকেই stack করত মোবাইলে (`grid sm:grid-cols-3`), সেটা অপরিবর্তিত।
- হোম হিরো (banner.jpeg ফুল-ব্লিড ফটো) আগে থেকেই `h-[68vh] min-h-120 max-h-180` viewport-বেইজড ছিল, তাই আলাদা মোবাইল ফিক্স লাগেনি।
- `npm run build` সফল, সব রুট স্ট্যাটিক জেনারেট হয়েছে পরিবর্তনের পর।

### সাম্প্রতিক আপডেট: হোম হিরো রিডিজাইন
- হোম পেজের হিরো এখন `public/banner.jpeg` (মসজিদের নামাজ কক্ষের high-res ছবি, 3114x2088) ব্যবহার করে — `next/image` এর `fill` + `object-cover` দিয়ে ফুল-ব্লিড ব্যাকগ্রাউন্ড, উপরে dual gradient overlay (নিচ থেকে উপরে + বাম থেকে ডানে emerald-950 আলফা) টেক্সট রিডেবিলিটির জন্য।
- হিরোর height ডায়নামিক: `h-[68vh] min-h-120 max-h-180` (Tailwind canonical spacing scale, viewport অনুযায়ী বাড়ে/কমে কিন্তু একটা min/max রেঞ্জে বাঁধা)।
- টাইটেল/বর্ণনা/CTA বাটন হিরোর নিচের অংশে overlay হিসেবে বসানো (আগে যেটা ছিল আলাদা green bar, এখন সব এক সেকশনে মার্জ করা হয়েছে)।
- আগে ব্যবহৃত `public/banner.png` (অফিসিয়াল টেক্সট-হেডার ব্যানার, পাতলা স্ট্রিপ) হোম পেজ থেকে বাদ দেওয়া হয়েছে — ফাইলটা public ফোল্ডারে রয়ে গেছে, ভবিষ্যতে দরকার হলে ব্যবহার করা যাবে।

### হয়েছে
- Node 24 (nvm) দিয়ে `create-next-app@latest` স্ক্যাফোল্ড (Next.js 16.2.9, App Router, TS, Tailwind v4) প্রজেক্ট রুটে (`/Applications/XAMPP/xamppfiles/htdocs/Baitul Mamur`) বসানো হয়েছে। `package.json` name `baitul-mamur` (ফোল্ডারে স্পেস/ক্যাপিটাল থাকায় আলাদা প্যাকেজ নাম লাগে)।
- `recharts`, `papaparse`, `@types/papaparse` ইনস্টল করা হয়েছে।
- `src/lib/site-config.ts` — মসজিদের তথ্য, ফান্ড টার্গেট (€250,000 placeholder), real Google Maps কোঅর্ডিনেট (`mapsQuery`, `mapsViewUrl` — ব্যবহারকারীর দেওয়া Maps লিংক থেকে)।
- **পেমেন্ট মাধ্যম পরিবর্তন**: বিকাশ/নগদ বাদ দেওয়া হয়েছে (অনুদান অস্ট্রিয়া/ইউরোপ থেকে আসে) — এখন `bank` (SEPA ব্যাংক ট্রান্সফার), `paypal`, `cash` (মসজিদে সরাসরি জমা)।
- `src/lib/sheet.ts` — Google Sheet publish-to-web CSV ফেচ + parse (papaparse), env var ফাঁকা থাকলে mock data ফলব্যাক করে।
- `src/lib/drive.ts` — Google Drive শেয়ার লিংক থেকে image/preview URL বানানোর হেল্পার।
- কম্পোনেন্ট: `Navbar` (এখন real `logo.png` দেখায়), `Footer`, `FundProgress` (recharts বার+লাইন চার্ট + প্রোগ্রেস বার), `DepositCard` (bank/paypal/cash + QR)।
- পেজ: `/` (হোম — banner.png + কম্প্যাক্ট হিরো বার, ফান্ড উইজেট, ডিপোজিট কার্ড, সাম্প্রতিক দান, গ্যালারি প্রিভিউ), `/about` (real Maps কোঅর্ডিনেট embed + "Google Maps-এ দেখুন" লিংক), `/fund`, `/gallery`, `/documents`।
- Hind Siliguri ফন্ট (`next/font/google`) root layout-এ সেট করা।
- **ইউজার-প্রদত্ত আসল ইমেজ**: `public/logo.png` (মসজিদের লোগো), `public/banner.png` (Austria-Bangladesh Cultural Center হেডার ব্যানার) — ইউজার নিজে public ফোল্ডারে রেখেছেন।
- হোম পেজের হিরো সেকশন প্রথমে min-h-[60vh] খালি green block ছিল (কোনো background ছবি ছাড়া) — এখন banner.png ফুল-উইথ দেখানো হয় + এর নিচে কম্প্যাক্ট green info bar (py-10/14, ফিক্সড height নয়)।
- placeholder QR SVG: `public/deposit/{bank,paypal,cash}-qr.svg` (bkash/nagad SVG ডিলিট করা হয়েছে)।
- `npm run build` সফল (সব পরিবর্তনের পর পুনরায় যাচাই করা হয়েছে)।
- `.env.example` যুক্ত (`SHEET_DONATIONS_CSV_URL`, `SHEET_GALLERY_CSV_URL`, `SHEET_DOCUMENTS_CSV_URL`)।

### বাকি আছে
- **আসল Google Sheet** তৈরি করে ৩টা ট্যাব (`donations`: date/donor/amount/method, `gallery`: drive_link/caption, `documents`: drive_link/title/description) বানিয়ে "Publish to web → CSV" লিংক `.env.local`-এ বসাতে হবে — ইউজার বলেছেন পরে যুক্ত করবেন, mock data আছে এখন।
- আসল IBAN/BIC, PayPal অ্যাকাউন্ট এবং বাস্তব QR কোড ছবি (`public/deposit/*`) দিয়ে placeholder রিপ্লেস করতে হবে।
- ফান্ড target amount বাস্তব সংখ্যায় বদলাতে হবে (`site-config.ts`)।
- মসজিদের real ছবি (Google Drive লিংক) গ্যালারি ও দলিল/চুক্তির real PDF লিংক ডকুমেন্টস ট্যাবে যুক্ত করতে হবে — ইউজার বলেছেন পরে যুক্ত করবেন।
- প্রোডাকশন ডিপ্লয় (Vercel/VPS) — এখনো করা হয়নি, লোকাল ডেভ পর্যন্তই যাচাই করা হয়েছে।
- Drive ইমেজ লিংক পাবলিক ("Anyone with the link") না হলে `driveImageUrl`/`drivePreviewUrl` কাজ করবে না।
- favicon এখনো ডিফল্ট Next.js আইকন — চাইলে logo.png দিয়ে বদলানো যায়।

### ফিক্স করা বাগ
- **Hydration mismatch (bn-BD number format)**: `Intl.NumberFormat("bn-BD")` সার্ভার ও ব্রাউজারে আলাদা ICU ডেটার কারণে ভিন্ন আউটপুট দিচ্ছিল (সার্ভারে বাংলা সংখ্যা, ক্লায়েন্টে ইংরেজি) — React hydration error দেখাচ্ছিল। সমাধান: `src/lib/format.ts`-এ নিজস্ব deterministic `formatBengaliNumber()` লেখা হয়েছে (Intl নির্ভর না করে ম্যানুয়ালি digit mapping + Bangladeshi-style ২-৩ ডিজিট গ্রুপিং)। `FundProgress.tsx`, `app/page.tsx`, `app/fund/page.tsx` সব জায়গায় এটা ব্যবহার করা হচ্ছে। **ভবিষ্যতে কোথাও নতুন টাকার অঙ্ক দেখাতে হলে `Intl.NumberFormat("bn-BD")` ব্যবহার না করে `formatBengaliNumber` ব্যবহার করতে হবে।**

### গুরুত্বপূর্ণ সিদ্ধান্ত/কনস্ট্রেন্ট
- ডেটা সোর্স: Google Sheet CSV (Sheets API নয়) — কোনো credential/service account লাগে না, কিন্তু Sheet "Publish to web" থাকতে হবে।
- মিডিয়া হোস্টিং: Google Drive লিংক (নিজের সার্ভারে আপলোড না)।
- হোস্টিং পরিকল্পনা: এখন লোকাল ডেভ, পরে Vercel/VPS — XAMPP/PHP স্ট্যাটিক সার্ভ ব্যবহার হচ্ছে না।
- Node ভার্সন ম্যানেজমেন্ট: `nvm use 24` — প্রতিটি টার্মিনাল সেশনে নতুন করে সোর্স করতে হয় (`export NVM_DIR="$HOME/.nvm"; source "$NVM_DIR/nvm.sh"; nvm use 24`), কারণ ডিফল্ট শেলে অন্য/পুরনো Node সক্রিয় থাকতে পারে।
- এই শেলে `head`/`cat`/`grep | head` এর মতো কমান্ড একটা কাস্টম `head` (HTTP client টাইপ টুল) এর সাথে কনফ্লিক্ট করে অদ্ভুত আউটপুট দেয় — ফাইল কন্টেন্ট দেখতে Bash pipe-এর বদলে Read tool ব্যবহার করা নিরাপদ।
