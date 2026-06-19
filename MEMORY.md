# MEMORY — অগ্রগতি ট্র্যাকার

> এই ফাইল প্রতি সেশনে Claude নিজেই আপডেট করবে (নির্দেশনা: CLAUDE.md দেখুন)। সবচেয়ে সাম্প্রতিক অবস্থা সবার উপরে।

## অবস্থা: গ্যালারি সিম্পল প্লেইন গ্রিডে রিভার্ট করা হয়েছে (lightbox বাতিল, ইউজারের অনুরোধে) — Vercel-এ deploy/env var বসানো বাকি
তারিখ: 2026-06-19

### সাম্প্রতিক আপডেট: lightbox বাতিল, ভিডিও সরাসরি inline embed
- ইউজার "still having the same issue" রিপোর্ট করার পর জিজ্ঞেস করে কনফার্ম করা হয়েছে এটা **লোকাল dev সার্ভারে** ঘটছিল (Vercel-এ না, যা এখনও deploy-ই হয়নি)।
- ডিবাগ করে কনফার্ম করা হয়েছে যে `driveThumbnailUrl()` (আগের সেশনের ফিক্স) আসলে ঠিকভাবেই কাজ করছে — curl দিয়ে সরাসরি bytes ফেচ করে দেখা গেছে real `image/jpeg`, 1000x1405px, ১৩৭KB ফাইল আসছে। তবে dev সার্ভার পুরনো প্রসেস/পোর্ট কনফ্লিক্টে (3000 বনাম 3001) আটকে ছিল, যা সম্ভবত আগের broken-image ধারণার একটা কারণ।
- **ইউজারের সরাসরি অনুরোধ অনুযায়ী UI সিম্প্লিফাই করা হয়েছে**: click-to-zoom lightbox সম্পূর্ণ বাদ দেওয়া হয়েছে (ইউজার চাননি)। `src/components/MediaGrid.tsx` ডিলিট করা হয়েছে।
- `src/components/DriveFolderGallery.tsx` এখন আগের মতো সিম্পল async Server Component (কোনো client/state লাগে না):
  - **ছবি**: প্লেইন non-interactive `grid-cols-2 sm:3 md:4` গ্রিড, aspect-square + object-cover, ক্লিক করার কিছু নেই (just placed, "আগের মতো")।
  - **ভিডিও**: আলাদা সেকশনে, প্রতিটা ভিডিও সরাসরি একটা `grid-cols-1 sm:2` গ্রিডে Drive `/preview` iframe হিসেবে inline বসানো থাকে (aspect-video, নেটিভ play কন্ট্রোলস সহ) — ক্লিক করে আলাদা মোডাল খোলার প্রয়োজন নেই, সরাসরি প্লে করা যায়।
- `src/lib/drive-api.ts`-এ `DriveFile` টাইপ থেকে `largeUrl` ফিল্ড বাদ দেওয়া হয়েছে (lightbox না থাকায় আর লাগছে না), শুধু `thumbnailUrl` (`driveThumbnailUrl`, স্থায়ী non-expiring endpoint) থেকে যাচ্ছে।
- বিল্ড + ফ্রেশ dev সার্ভার দিয়ে যাচাই করা হয়েছে: `/gallery`-এ ১২৬টা thumbnail রেফারেন্স, এবং একটা স্যাম্পল URL সরাসরি curl করে real JPEG bytes (1000x1405px) কনফার্ম করা হয়েছে।
- **মনে রাখার বিষয়**: এই প্রজেক্ট এখনো GitHub-এ push হয়নি এবং Vercel-এ deploy হওয়া কোডে `DRIVE_API_KEY` env var নেই — তাই লাইভ সাইটে (baitulmamurmasjid20.vercel.app) গ্যালারি এখনো পুরনো/ভাঙা অবস্থায় থাকবে যতক্ষণ না (১) কোড push হয়, (২) Vercel project settings-এ `DRIVE_API_KEY` env var যুক্ত করে redeploy করা হয়।

### সাম্প্রতিক বাগ-ফিক্স: গ্যালারিতে broken image icon (cached page-এ ছবি লোড হচ্ছিল না)
- **সমস্যা**: হোমপেজ/গ্যালারিতে ছবির বদলে broken-image "?" আইকন দেখাচ্ছিল (Vercel-এ ডিপ্লয়ের পরে), যেখানে আগে লোকাল টেস্টে ঠিকঠাক কাজ করছিল।
- **রুট কজ**: Drive API-র `files.list` রেসপন্সে যে `thumbnailLink` পাওয়া যায় সেটা একটা **সাময়িক signed URL** — অল্প সময় পরেই এক্সপায়ার হয়ে যায়। যেহেতু আমরা এই URL-টা সরাসরি স্ট্যাটিক HTML-এ বেক করে রাখছিলাম (ISR দিয়ে ১ ঘণ্টা cache), build/regenerate-এর কিছুক্ষণ পর কেউ পেজ ভিজিট করলে সেই বেক করা URL এক্সপায়ার হয়ে যেত → ব্রাউজার ছবি লোড করতে পারত না।
- **সমাধান**: `src/lib/drive-api.ts`-এ `resizeThumbnail()`-এর বদলে `driveThumbnailUrl(fileId, size)` হেল্পার লেখা হয়েছে যেটা Drive-এর স্থায়ী এন্ডপয়েন্ট `https://drive.google.com/thumbnail?id=FILE_ID&sz=wSIZE` রিটার্ন করে। এই endpoint-টা প্রতিবার রিকোয়েস্টে **ব্রাউজার থেকে hit হওয়ার সময়** একটা ফ্রেশ signed `lh3.googleusercontent.com` URL-এ ৩০২ রিডাইরেক্ট করে — তাই স্ট্যাটিক HTML যতই পুরনো হোক, ছবি সবসময় কাজ করবে (curl দিয়ে যাচাই করা হয়েছে: redirect ৩০২ → fresh URL → ২০০ OK)।
- `files.list` API কলের `fields` প্যারামিটার থেকে `thumbnailLink` বাদ দেওয়া হয়েছে (আর লাগছে না, শুধু `id, name, mimeType` যথেষ্ট)।
- **শিক্ষা — ভবিষ্যতের জন্য**: Drive API-র `thumbnailLink` ফিল্ড কখনো সরাসরি কোনো cached/static HTML-এ বেক করা উচিত না — সবসময় `drive.google.com/thumbnail?id=...` বা `drive.google.com/uc?id=...` -এর মতো স্থায়ী/non-expiring পাবলিক এন্ডপয়েন্ট ব্যবহার করতে হবে।
- বিল্ড সফল, `.next/server/app/gallery.html`-এ ২০১টা `drive.google.com/thumbnail?id=...` রেফারেন্স কনফার্ম করা হয়েছে, এবং স্যাম্পল URL সরাসরি curl করে ২০০ OK (redirect সহ) পাওয়া গেছে।

### সাম্প্রতিক আপডেট: লাইটবক্স (click-to-zoom) + একই ফোল্ডারে ভিডিও অটো-ডিটেকশন
- ইউজার রিপোর্ট করেছেন: (১) ছবিতে ক্লিক করে বড় করে দেখার কোনো উপায় ছিল না, (২) photos ফোল্ডারেই কিছু ভিডিও আছে যা আগে miss হয়ে যাচ্ছিল কারণ `videosFolderId` খালি ছিল।
- **ভিডিও ফিক্স**: Drive API দিয়ে সরাসরি চেক করে কনফার্ম করা হয়েছে যে photos ফোল্ডারে (`1E1qG58dE_PI65mqyBfKh7jskB3b1qVZ-`) ৪টা `.mp4` ভিডিও আছে। `src/lib/site-config.ts`-এ `videosFolderId` এখন ডিফল্টভাবে `photosFolderId`-এর সমান (IIFE দিয়ে কম্পিউট করা হয়) — অর্থাৎ আলাদা ভিডিও ফোল্ডার env var না দিলে একই ফোল্ডার থেকেই `mimeType contains 'video/'` কুয়েরি দিয়ে ভিডিও বের করা হবে। ভবিষ্যতে আলাদা ভিডিও ফোল্ডার বানালে `NEXT_PUBLIC_DRIVE_VIDEOS_FOLDER_ID` সেট করে override করা যাবে।
- **লাইটবক্স যুক্ত**: নতুন client component `src/components/MediaGrid.tsx` — গ্রিডের প্রতিটা থাম্বনেইল এখন ক্লিকেবল বাটন (আগে শুধু `<div>` ছিল), ক্লিক করলে ফুলস্ক্রিন মোডাল ওভারলে খোলে: ছবির জন্য বড় সাইজ ইমেজ (`largeUrl`, `=s1600`), ভিডিওর জন্য Drive `/preview` iframe (নেটিভ প্লে কন্ট্রোলস সহ)। Prev/Next আরো (একাধিক আইটেম থাকলে), Escape/←/→ কীবোর্ড সাপোর্ট, backdrop ক্লিকে বন্ধ হয়, body scroll lock করা থাকে মোডাল খোলা অবস্থায়।
- `src/lib/drive-api.ts`-এ `DriveFile` টাইপে নতুন ফিল্ড `largeUrl` (thumbnailLink resize করে `=s1600`) যুক্ত হয়েছে লাইটবক্সের জন্য, পাশাপাশি আগের `thumbnailUrl` (`=s1000`) গ্রিড থাম্বনেইলের জন্য রয়ে গেছে।
- `src/components/DriveFolderGallery.tsx` এখন simplified — শুধু ডেটা fetch করে (Server Component) এবং `MediaGrid`-কে items পাস করে দেয় (Client Component, interactivity-এর জন্য আলাদা করা হয়েছে যাতে fetch সার্ভারে থাকে, state ক্লায়েন্টে)।
- বিল্ড + `next start` দিয়ে যাচাই করা হয়েছে — `/gallery`-এ ১৩৪টা `=s1000` ছবি-থাম্বনেইল ও ৮টা `.mp4` রেফারেন্স (৪টা ভিডিও ফাইল, প্রতিটার জন্য থাম্বনেইল+iframe src রেফারেন্স) সঠিকভাবে রেন্ডার হচ্ছে, কোনো "এখনো কোনো..." placeholder টেক্সট নেই।

### সাম্প্রতিক আপডেট: Drive embed iframe থেকে Drive API-ভিত্তিক custom grid-এ migrate
- আগের সমাধান (`embeddedfolderview` iframe) Google-এর নিজস্ব UI দেখাত যেখানে ছবিগুলো mixed/অসমান আকারে আসছিল (cross-origin iframe হওয়ায় CSS দিয়ে style করা সম্ভব ছিল না) — ইউজার এটা পছন্দ করেননি।
- **নতুন সমাধান**: Google Drive API v3 (`files.list`) দিয়ে ফোল্ডারের প্রতিটা ফাইলের `thumbnailLink` সরাসরি fetch করে, নিজেদের ডিজাইনে (aspect-square, object-cover, uniform grid) রেন্ডার করা হচ্ছে — ঠিক আগের custom gallery design-এর মতোই, কিন্তু এখনো Drive ফোল্ডার-সিঙ্ক করা (auto-update, কোনো CSV/per-file লিংক লাগে না)।
- **API key সেটআপ**: ইউজার Google Cloud Console-এ একটা প্রজেক্ট বানিয়ে Drive API enable করে API key জেনারেট করেছেন। **গুরুত্বপূর্ণ শিক্ষা**: প্রথমে key-টা "Application restrictions → Websites (HTTP referrer)" দিয়ে রেস্ট্রিক্ট করা হয়েছিল, কিন্তু সেটা ব্যর্থ হয় কারণ আমাদের fetch হয় **server-side** (Vercel/Node) থেকে, যেখানে কোনো HTTP Referer header থাকে না — Google `API_KEY_HTTP_REFERRER_BLOCKED` (403) এরর দিত। সমাধান: Application restriction **"None"**-এ পরিবর্তন করা হয়েছে (API restriction এখনও "Google Drive API"-তে আটকানো আছে, তাই key অন্য কোনো Google API-তে ব্যবহার করা যাবে না — নিরাপদ)। **ভবিষ্যতে কোনো নতুন Google API key server-side fetch-এর জন্য বানালে referrer-restriction ব্যবহার করা যাবে না, "None" বা IP restriction ব্যবহার করতে হবে।**
- `.env.local`-এ `DRIVE_API_KEY=AIzaSyA8UWP-tKTwwj72TMu4F7kl5uatx_7dCd8` সেট করা আছে (গিট-ইগনোর্ড, কমিট হয়নি) — `src/lib/site-config.ts`-এ এই env var **ইচ্ছাকৃতভাবে `NEXT_PUBLIC_` প্রিফিক্স ছাড়া** রাখা হয়েছে যাতে এটা ব্রাউজার বান্ডলে কখনো না যায়।
- নতুন ফাইল `src/lib/drive-api.ts` — `getDrivePhotos(folderId)` / `getDriveVideos(folderId)`, `mimeType contains 'image/'` বা `'video/'` কুয়েরি দিয়ে Drive API কল করে, pagination handle করে (max ৫ পেজ = ৫০০ ফাইল), `thumbnailLink`-এর সাইজ প্যারামিটার `=s220` থেকে `=s1000`-এ রিসাইজ করে (resizeThumbnail হেল্পার)। fetch-এ `next.revalidate` ISR cache (১ ঘণ্টা) ব্যবহার করা হচ্ছে।
- `src/components/DriveFolderGallery.tsx` সম্পূর্ণ রিরাইট — এখন এটা একটা async Server Component যেটা সরাসরি `getDrivePhotos`/`getDriveVideos` কল করে এবং uniform `grid-cols-2 sm:3 md:4` গ্রিডে aspect-square থাম্বনেইল রেন্ডার করে। ভিডিও আইটেমে একটা প্লে-বাটন ওভারলে আইকন বসানো আছে (থাম্বনেইল থেকেই ভিডিও চেনার জন্য)। props পরিবর্তন: আগে `title`/`heightClassName` ছিল, এখন `kind: "image"|"video"` এবং অপশনাল `limit` (হোমপেজ প্রিভিউয়ের জন্য ৮টা পর্যন্ত)।
- `src/lib/drive.ts` থেকে অব্যবহৃত `driveFolderEmbedUrl()` বাদ দেওয়া হয়েছে (iframe পদ্ধতি বাতিল হওয়ায়)।
- `.env.example`-এ `DRIVE_API_KEY=` (কমেন্ট সহ ব্যাখ্যা) যুক্ত করা হয়েছে।
- বিল্ড + `next start` দিয়ে যাচাই করা হয়েছে — `/gallery`-এর HTML-এ ৬৩টা real `lh3.googleusercontent.com` থাম্বনেইল URL (`=s1000` সাইজ) পাওয়া গেছে, placeholder card আর দেখাচ্ছে না।

### আগের আপডেট: Drive ফোল্ডার-ভিত্তিক গ্যালারি (প্রাথমিক iframe সংস্করণ, এখন বাতিল/সুপারসিডেড)

### সাম্প্রতিক আপডেট: Drive ফোল্ডার-ভিত্তিক গ্যালারি (CSV বাতিল)
- ইউজার একটা পাবলিক Drive ফোল্ডার লিংক দিয়েছেন (https://drive.google.com/drive/folders/1E1qG58dE_PI65mqyBfKh7jskB3b1qVZ-) — WebFetch দিয়ে চেক করে দেখা গেছে এতে ৫০টা ছবি (JPEG) আছে, কোনো ভিডিও নেই এখনো।
- **সিদ্ধান্ত**: Drive ফোল্ডারের individual file ID বের করা সম্ভব না (Drive folder page heavily JS-rendered, WebFetch দিয়ে file listing পাওয়া যায় কিন্তু data-id attribute পাওয়া যায় না)। তাই per-file CSV/link পদ্ধতির বদলে Google-এর `https://drive.google.com/embeddedfolderview?id=FOLDER_ID#grid` iframe embed ব্যবহার করা হয়েছে — পুরো ফোল্ডার একসাথে গ্রিড-ভিউ এ embed হয়, ফোল্ডারে নতুন ছবি/ভিডিও যুক্ত করলে সাইটে অটোমেটিক আপডেট হয়, কোনো ম্যানুয়াল CSV/লিংক এন্ট্রি লাগে না।
- **Photos vs Videos আলাদা করার সমাধান**: Drive-এর folder embed এক ফোল্ডারের মধ্যে image/video আলাদা করতে দেয় না — তাই দুইটা আলাদা ফোল্ডার ব্যবহার করার সিদ্ধান্ত হয়েছে: একটা Photos-এর জন্য (এখন আছে), একটা Videos-এর জন্য (ভবিষ্যতে ইউজার বানাবেন)।
- `src/lib/site-config.ts`-এ `drive: { photosFolderId, videosFolderId }` যুক্ত — `photosFolderId` হার্ডকোড করা আছে `1E1qG58dE_PI65mqyBfKh7jskB3b1qVZ-` ডিফল্ট হিসেবে (env var `NEXT_PUBLIC_DRIVE_PHOTOS_FOLDER_ID` দিয়ে override করা যায়), `videosFolderId` খালি (`NEXT_PUBLIC_DRIVE_VIDEOS_FOLDER_ID`)।
- `src/lib/drive.ts`-এ `driveFolderEmbedUrl(folderId)` হেল্পার যুক্ত।
- নতুন কম্পোনেন্ট `src/components/DriveFolderGallery.tsx` — folderId খালি থাকলে dashed-border "এখনো যুক্ত করা হয়নি" placeholder card দেখায়, না হলে rounded card-এ iframe embed করে।
- `src/app/gallery/page.tsx` সম্পূর্ণ রিরাইট — এখন "ছবি" ও "ভিডিও" দুইটা আলাদা সেকশন, প্রতিটায় `DriveFolderGallery`।
- হোম পেজের গ্যালারি প্রিভিউ সেকশনও (`src/app/page.tsx`) আগের CSV-ভিত্তিক ৬-ছবির গ্রিডের বদলে একই `DriveFolderGallery` (ছোট height) ব্যবহার করছে।
- **ক্লিনআপ**: `src/lib/sheet.ts` থেকে `GalleryItem` টাইপ, `mockGallery`, `getGallery()` ফাংশন বাদ দেওয়া হয়েছে (আর ব্যবহার হচ্ছে না)। `src/lib/drive.ts` থেকে অব্যবহৃত `driveImageUrl()` বাদ দেওয়া হয়েছে। `.env.example` থেকে `SHEET_GALLERY_CSV_URL` বাদ দিয়ে `NEXT_PUBLIC_DRIVE_PHOTOS_FOLDER_ID`/`NEXT_PUBLIC_DRIVE_VIDEOS_FOLDER_ID` যুক্ত করা হয়েছে।
- `npm run build` সফল, `npm run start` দিয়ে যাচাই করা হয়েছে যে home ও gallery পেজ দুটোতেই সঠিক `embeddedfolderview?id=1E1qG58dE_PI65mqyBfKh7jskB3b1qVZ-` iframe রেন্ডার হচ্ছে।
- **বাকি**: ইউজার ভিডিওর জন্য আলাদা Drive ফোল্ডার বানিয়ে লিংক দিলে `videosFolderId`/env var সেট করতে হবে (placeholder card দেখাচ্ছে এখন)। `donations`/`documents` ডেটা এখনো আগের CSV/mock পদ্ধতিতেই আছে — শুধু gallery বদলেছে।

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
