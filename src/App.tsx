/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useRef, useState } from "react";
import { 
  Zap, 
  Cpu, 
  Database, 
  Layout, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Send,
  ExternalLink,
  Layers,
  BarChart3,
  Smartphone,
  Globe,
  ChevronDown
} from "lucide-react";

type Lang = 'en' | 'id';

const clients = [
  {
    id: "telkomsel",
    name: "Telkomsel",
    division: { en: "Collection Operations Division", id: "Divisi Operasional Koleksi" },
    color: "text-red-400",
    borderColor: "border-red-500/30",
    bgColor: "bg-red-500/5",
    projects: [
      {
        id: "telkomsel-automation",
        title: "Payment Receipt Automation",
        problem: { en: "Agents manually processed dozens of payment receipts daily via Telegram. High error rates and zero consistency.", id: "Agen memproses puluhan bukti pembayaran secara manual setiap hari via Telegram. Tingkat kesalahan tinggi dan nol konsistensi." },
        solution: { en: "Built an end-to-end n8n workflow. AI/OCR extracts data from receipt photos, validates it, and syncs to Google Sheets with auto-confirmation messages.", id: "Membangun workflow n8n end-to-end. AI/OCR mengekstrak data dari foto bukti pembayaran, memvalidasinya, dan menyinkronkan ke Google Sheets dengan pesan konfirmasi otomatis." },
        roi: { en: "Manual data entry dropped to zero. 95% AI/OCR accuracy achieved. 80% reduction in manual processing time — from hours to under 10 seconds per receipt. Handles 500+ transactions daily. Zero transcription errors across the entire collection team.", id: "Input data manual turun ke nol. Akurasi AI/OCR 95% tercapai. Pengurangan 80% waktu pemrosesan — dari berjam-jam menjadi di bawah 10 detik per bukti. Menangani 500+ transaksi harian. Nol kesalahan transkripsi di seluruh tim koleksi." },
        tools: ["n8n", "Telegram Bot API", "AI / OCR", "Google Sheets", "REST API"],
        icon: <Zap className="w-5 h-5 text-blue-400" />,
        video: "/video_payment_receipt_automation.mp4"
      },
      {
        id: "field-monitoring",
        title: "Field Team Monitoring System",
        problem: { en: "No unified system for 50+ agents across 5 cities — Makassar, Manado, Palu, Kendari, and Gorontalo. Management spent days just consolidating data.", id: "Tidak ada sistem terpadu untuk 50+ agen di 5 kota — Makassar, Manado, Palu, Kendari, dan Gorontalo. Manajemen menghabiskan berhari-hari hanya untuk mengkonsolidasi data." },
        solution: { en: "Custom Excel-based operational backbone aggregating ACH Target, Recovery Rate, and Gap Analysis automatically across all cities. Automated reporting replaced manual daily compilation.", id: "Backbone operasional berbasis Excel kustom yang mengagregasi Target ACH, Recovery Rate, dan Gap Analysis secara otomatis di semua kota. Pelaporan otomatis menggantikan kompilasi manual harian." },
        roi: { en: "Shifted leadership focus from data collection to decision-making. 42% improvement in task completion time. Reduced coordination overhead by 8 hours per day for management.", id: "Mengalihkan fokus kepemimpinan dari pengumpulan data ke pengambilan keputusan. Peningkatan 42% waktu penyelesaian tugas. Mengurangi overhead koordinasi 8 jam per hari untuk manajemen." },
        tools: ["Advanced Excel", "SUMIFS", "XLOOKUP", "Data Architecture"],
        icon: <BarChart3 className="w-5 h-5 text-green-400" />
      },
    ]
  },
  {
    id: "maulagi",
    name: "PT Maulagi Indo Solusi",
    division: { en: "Logistics & Expedition Operations", id: "Operasional Logistik & Ekspedisi" },
    color: "text-purple-400",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/5",
    projects: [
      {
        id: "expedition-recon",
        title: "Transfer Dashboard & Reconciliation System",
        problem: { en: "80+ branches across 2 operational areas (SE Sulawesi & Makassar Outer) had no way to submit or verify transfer proofs digitally. Discrepancies went undetected for weeks. Multi-bank payments (BRI, BCA, ShopeePay, GoPay, BNI, DANA) across branches made tracking nearly impossible — reconciliation alone took up to 14 days.", id: "80+ cabang di 2 area operasional (Sulsel Tenggara & Makassar Luar) tidak punya cara untuk mengirimkan atau memverifikasi bukti transfer secara digital. Selisih tidak terdeteksi berminggu-minggu. Pembayaran multi-bank (BRI, BCA, ShopeePay, GoPay, BNI, DANA) lintas cabang membuat rekonsiliasi hampir mustahil — butuh hingga 14 hari." },
        solution: { en: "Built a full-stack web application with a hybrid Vercel + AWS Lambda architecture. Branch operators upload transfer proof photos via a web form — Groq AI/OCR auto-extracts bank name, amount, and date. Data is stored in Supabase (PostgreSQL) with deduplication checks. OCR and NONCOD sync use async background pipelines so user requests return instantly while heavy processing runs separately. Admin dashboard provides real-time visibility per branch, per bank, and per period with XLSX export. Includes NONCOD/DFOD monitoring synchronized from MauKirim. AWS Lambda handles operational Telegram notifications and background sync pipelines. Rate limiting enforced per-instance via Upstash Redis. Secured with bcrypt auth and OWASP-aligned HTTP security headers.", id: "Membangun aplikasi web full-stack dengan arsitektur hybrid Vercel + AWS Lambda. Operator cabang mengunggah foto bukti transfer lewat form web — Groq AI/OCR secara otomatis membaca nama bank, nominal, dan tanggal. Data disimpan di Supabase (PostgreSQL) dengan deteksi data duplikat. OCR dan sinkronisasi NONCOD memakai pipeline background asinkron agar request pengguna selesai cepat sementara proses berat berjalan terpisah. Dashboard admin menyediakan visibilitas real-time per cabang, per bank, dan per periode dengan ekspor XLSX. Monitoring NONCOD/DFOD tersinkronisasi dengan data kurir MauKirim. AWS Lambda menangani notifikasi operasional Telegram dan pipeline sinkronisasi background. Rate limiting diterapkan per-instance menggunakan Upstash Redis. Diamankan dengan bcrypt dan HTTP security headers sesuai standar OWASP." },
        roi: { en: "Reconciliation cycle cut from 14 days to same-day. 99% duplicate entries eliminated. Rp90M+/month transaction volume tracked in real-time across 80+ branches. Management gets live branch-level accuracy without any manual effort.", id: "Siklus rekonsiliasi dipangkas dari 14 hari menjadi hari yang sama. 99% data duplikat berhasil disaring. Volume transaksi Rp90 juta+/bulan dipantau secara real-time di 80+ cabang. Manajemen mendapatkan akurasi data per cabang langsung dari dashboard tanpa pekerjaan manual." },
        tools: ["Node.js", "Supabase", "Groq AI / OCR", "Vercel", "AWS Lambda", "Upstash Redis", "bcrypt", "REST API", "HTML/CSS/JS"],
        icon: <Layers className="w-5 h-5 text-purple-400" />,
        video: "/maulagi-demo.mp4"
      },
    ]
  },
  {
    id: "nie-buket",
    name: "Nie Buket",
    division: { en: "Premium Bouquet & Gift Shop", id: "Toko Buket & Hadiah Premium" },
    color: "text-pink-400",
    borderColor: "border-pink-500/30",
    bgColor: "bg-pink-500/5",
    projects: [
      {
        id: "nie-buket-pos",
        title: "POS & Inventory Management System",
        problem: { en: "No digital system for managing sales, stock, and receipts. Transactions done manually with zero record keeping or reporting.", id: "Tidak ada sistem digital untuk mengelola penjualan, stok, dan struk. Transaksi dilakukan manual tanpa pencatatan atau pelaporan." },
        solution: { en: "Built a full-stack Progressive Web App with React 19 (esbuild) + Express.js + MongoDB Atlas. Features: daily POS transactions with stock validation, pre-order & booking with pickup schedule, thermal receipt printing via Bluetooth, PWA offline queue for write operations, Chart.js sales reports, date-range Excel export, and session-based authentication with password-protected delete/reset actions.", id: "Membangun Progressive Web App full-stack dengan React 19 (esbuild) + Express.js + MongoDB Atlas. Fitur: transaksi kasir harian dengan validasi stok, pre-order & booking dengan jadwal pengambilan, cetak struk Bluetooth, PWA offline queue untuk operasi tulis saat koneksi tidak stabil, laporan penjualan Chart.js, export Excel dengan rentang tanggal, dan autentikasi session dengan proteksi password untuk aksi hapus/reset." },
        roi: { en: "Fully digitized operations. Every sale is recorded, stock is tracked automatically, receipts print instantly via Bluetooth, and sales data is exportable anytime. Deployed live on Vercel.", id: "Operasional sepenuhnya terdigitalisasi. Setiap penjualan tercatat, stok dilacak otomatis, struk tercetak seketika via Bluetooth, dan data penjualan dapat diekspor kapan saja. Di-deploy di Vercel." },
        tools: ["Node.js", "Express.js", "MongoDB Atlas", "React 19", "Chart.js", "ExcelJS", "PWA", "Vercel", "Bluetooth Printer"],
        icon: <Database className="w-5 h-5 text-pink-400" />,
        image: "/niebuket-proof.jpg"
      },
    ]
  },
  {
    id: "quality-laundry",
    name: "Quality Laundry",
    division: { en: "Android Operations App — v1.4.11 Production", id: "Aplikasi Android Operasional — v1.4.11 Produksi" },
    color: "text-orange-400",
    borderColor: "border-orange-500/30",
    bgColor: "bg-orange-500/5",
    projects: [
      {
        id: "quality-laundry-app",
        title: "Quality Laundry Ecosystem",
        problem: { en: "UMKM laundry with pickup/delivery but no digital system. Order status was opaque, courier coordination was manual via chat, and zero automated reporting.", id: "UMKM laundry dengan pickup/delivery tanpa sistem digital. Status pesanan tidak transparan, koordinasi kurir manual via chat, dan nol pelaporan otomatis." },
        solution: { en: "Full-stack Android app (v1.4.11) connecting 3 roles — Customer, Courier, Admin — with an end-to-end operational flow: create order → pickup → process → delivery → complete. Features: real-time chat, GPS courier tracking, push notifications (FCM), 18 API endpoints, daily/weekly/monthly reports with XLSX export, JWT auth, and security hardening.", id: "Full-stack Android app (v1.4.11) menghubungkan 3 role — Customer, Kurir, Admin — dengan alur operasional end-to-end: buat pesanan → pickup → proses → delivery → selesai. Fitur: chat real-time, GPS tracking kurir, push notification (FCM), 18 API endpoint, laporan harian/mingguan/bulanan dengan export XLSX, JWT auth, dan security hardening." },
        roi: { en: "Laundry operations fully digitized. Real-time order status for all parties. Automated reports replace manual record-keeping. Production APK released and actively used.", id: "Operasional laundry sepenuhnya terdigitalisasi. Status pesanan real-time untuk semua pihak. Laporan otomatis menggantikan pencatatan manual. APK production dirilis dan aktif digunakan." },
        tools: ["Kotlin", "Jetpack Compose", "Firebase Realtime DB", "FCM", "Express.js", "MongoDB Atlas", "JWT", "Google Maps", "ExcelJS", "Vercel"],
        icon: <Smartphone className="w-5 h-5 text-orange-400" />,
        image: "/quality-laundry-proof.png"
      },
    ]
  }
];

const translations = {
  en: {
    nav: { expertise: "Expertise", portfolio: "Portfolio", contact: "Contact", hire: "Hire Architect" },
    hero: {
      badge: "Fullstack Developer | Automation Specialist | Workflow & AI Orchestration",
      h1: "Filling the gap between operations and automation.",
      p1_pre: "I don't just write code — I ",
      p1_highlight: "orchestrate intelligent systems",
      p1_post: ". By leveraging AI workflows, I deliver production-grade solutions (Android, PWA, Automations) with the speed and scale of an entire team.",
      p2_pre: "Proven field operations leadership — led, monitored, and coordinated ",
      p2_highlight: "50+ agents across 5 cities in Sulawesi",
      p2_post: " (Makassar, Manado, Palu, Kendari, Gorontalo), including recruitment, performance evaluation, and resolving field issues. I know what breaks on the ground, and I build automation that survives it.",
      quote: '"As long as there is data that needs to be tracked, I can automate it. Because I have proven it in the field."',
      cta_hire: "Hire Me Now",
      cta_fiverr: "View on Fiverr",
      available: "Available for Q2 2026 Projects",
      badge_img: "4 Clients • 5 Systems",
    },
    stats: [
      { label: "Manual Work Eliminated", value: "100%" },
      { label: "AI/OCR Accuracy", value: "95%+" },
      { label: "Agents Managed", value: "50+" },
      { label: "Monthly Savings Delivered", value: "$3.5k+" },
    ],
    expertise: {
      label: "Core Knowledge Base",
      title: "Architecting the infrastructure of high-growth operations.",
      desc: "I don't just build systems. I understand what breaks in the field, what people actually need, and how to design automation that survives real-world conditions.",
      cards: [
        { title: "Workflow Automation", desc: 'Specializing in n8n, Telegram Bot API, and WhatsApp automation. I eliminate manual friction by connecting disparate data sources into a single "Final Brain" logic.' },
        { title: "Operations Architecture", desc: "Designing real-time reconciliation engines and performance monitoring dashboards. I turn fragmented data into operational visibility for teams of 50+." },
        { title: "Full-Stack Ecosystems", desc: "Building custom Android operations apps using Kotlin and Jetpack Compose. Seamlessly integrated with Firebase and Node.js backends for field-to-office sync." },
      ],
    },
    process: {
      label: "How I Work",
      title: "From chaos to clarity",
      subtitle: "Four steps. No surprises.",
      steps: [
        { step: "01", title: "Diagnose", desc: "I map every friction point, manual step, and data gap before a single line is written. Nothing gets missed." },
        { step: "02", title: "Architect", desc: "Design logic that handles real-world edge cases — not just happy paths. Tools are chosen last, never first." },
        { step: "03", title: "Build & Test", desc: "Iterative builds with live testing at each stage. Breaking before production means fixing before deployment." },
        { step: "04", title: "Deploy & Hand Off", desc: "Full documentation, training, and async support. Systems I build stay running long after I leave." },
      ],
    },
    tools: {
      label: "Technology Stack",
      title: "Tools that survive the field.",
      desc: "Every tool chosen has a reason. No over-engineering. No hype-driven choices. Only what builds reliable, maintainable systems.",
    },
    portfolio: {
      label: "Project Portfolio",
      title: "Proven in production.",
      desc: "4 clients. 5 systems. All running in the field.",
      client_label: "Client",
      systems_label: "Systems Built",
      friction: "The Friction",
      engine: "The Engine",
      roi: "ROI & Impact",
      proof: "Proof of Work",
    },
    whyme: {
      badge: "The Architect Advantage",
      title1: "Why an Architect,",
      title2: "not a freelancer?",
      p: "Most automation engineers have never managed a team. Most operations managers cannot build automation. I do both — and that combination is rare.",
      checks: [
        { title: "I understand the problem from inside", desc: "I have worked in operations. I know what breaks in the field. The systems I build solve real problems, not theoretical ones." },
        { title: "Everything proven in production", desc: "All systems in this portfolio ran in real operations. Not demo environments, not practice projects. Real data, real teams, real scale." },
        { title: "No hand-holding required", desc: "I scope, design, build, and deliver. You brief me once. I translate it into a system that outlasts the engagement." },
      ],
      cards: [
        { title: "Cross-industry adaptability", desc: "Telecoms, logistics, and now app development. The same principles apply. The same approach works. I adapt quickly." },
        { title: "Results over complexity", desc: "The goal is never an impressive-looking system. The goal is giving time back to the team. Simple, reliable, and actually used." },
        { title: "Async-first communication", desc: "I work across time zones. Documentation is thorough. Handoffs are clean. You are never left waiting for status updates." },
      ],
    },
    contact: {
      label: "Let's Work Smart, Not Harder",
      title1: "Have a system",
      title2: "in mind? Let's talk.",
      desc: "Whether it's automation, a full-stack app, or untangling messy operations — reach out and let's figure out what makes sense for your case.",
      also_on: "Also Available On",
      based: "Based in Makassar, Indonesia • Serving Global Enterprise Clients",
    },
    footer: {
      tagline: "Operations Systems Architect • Built with React & Tailwind",
      n8n: "n8n Expert",
      ops: "Ops Architect",
    },
  },
  id: {
    nav: { expertise: "Keahlian", portfolio: "Portofolio", contact: "Kontak", hire: "Hubungi Saya" },
    hero: {
      badge: "Fullstack Developer | Spesialis Otomasi | Workflow & AI Orchestration",
      h1: "Mengisi celah antara operasional dan otomasi.",
      p1_pre: "Saya tidak sekadar menulis kode — saya ",
      p1_highlight: "mengorkestrasi sistem cerdas",
      p1_post: ". Dengan memanfaatkan workflow AI, saya menghasilkan solusi production-grade (Android, PWA, Otomasi) dengan kecepatan dan skala satu tim penuh.",
      p2_pre: "Terbukti dalam kepemimpinan operasional lapangan — memimpin, memonitor, dan mengoordinasikan ",
      p2_highlight: "50+ agen di 5 kota di Sulawesi",
      p2_post: " (Makassar, Manado, Palu, Kendari, Gorontalo), termasuk rekrutmen, evaluasi kinerja, dan penyelesaian masalah lapangan. Saya tahu apa yang rusak di lapangan, dan saya membangun otomasi yang tahan uji.",
      quote: '"Selama ada data yang perlu dilacak, saya bisa mengotomatisasinya. Karena saya sudah membuktikannya di lapangan."',
      cta_hire: "Hubungi Sekarang",
      cta_fiverr: "Lihat di Fiverr",
      available: "Tersedia untuk Proyek Q2 2026",
      badge_img: "4 Klien • 5 Sistem",
    },
    stats: [
      { label: "Pekerjaan Manual Dieliminasi", value: "100%" },
      { label: "Akurasi AI/OCR", value: "95%+" },
      { label: "Agen Dikelola", value: "50+" },
      { label: "Penghematan Bulanan", value: "$3.5k+" },
    ],
    expertise: {
      label: "Basis Pengetahuan Inti",
      title: "Merancang infrastruktur operasional yang efisien.",
      desc: "Saya tidak sekadar membangun sistem. Saya memahami apa yang gagal di lapangan, apa yang benar-benar dibutuhkan, dan cara merancang otomasi yang bertahan di kondisi nyata.",
      cards: [
        { title: "Otomasi Workflow", desc: "Spesialis n8n, Telegram Bot API, dan WhatsApp automation. Saya menghilangkan hambatan manual dengan menghubungkan berbagai sumber data ke dalam satu logika terpadu." },
        { title: "Arsitektur Operasional", desc: "Merancang engine rekonsiliasi real-time dan dashboard monitoring kinerja. Saya mengubah data tersebar menjadi visibilitas operasional untuk tim 50+ orang." },
        { title: "Full-Stack Ecosystem", desc: "Membangun aplikasi Android operasional dengan Kotlin dan Jetpack Compose. Terintegrasi seamless dengan backend Firebase dan Node.js untuk sinkronisasi lapangan ke kantor." },
      ],
    },
    process: {
      label: "Cara Kerja Saya",
      title: "Dari kekacauan ke kejelasan",
      subtitle: "Empat langkah. Tanpa kejutan.",
      steps: [
        { step: "01", title: "Diagnosa", desc: "Saya memetakan setiap titik gesekan, langkah manual, dan kesenjangan data sebelum satu baris kode pun ditulis. Tidak ada yang terlewat." },
        { step: "02", title: "Arsitektur", desc: "Merancang logika yang menangani kasus tepi dunia nyata — bukan hanya jalur bahagia. Tools dipilih terakhir, bukan pertama." },
        { step: "03", title: "Bangun & Uji", desc: "Build iteratif dengan pengujian langsung di setiap tahap. Rusak sebelum produksi berarti perbaiki sebelum deployment." },
        { step: "04", title: "Deploy & Serah Terima", desc: "Dokumentasi lengkap, pelatihan, dan dukungan async. Sistem yang saya bangun tetap berjalan lama setelah saya pergi." },
      ],
    },
    tools: {
      label: "Technology Stack",
      title: "Tools yang tahan di lapangan.",
      desc: "Setiap tool dipilih dengan alasan. Tidak ada over-engineering. Tidak ada pilihan berdasarkan hype. Hanya yang membangun sistem andal dan mudah dipelihara.",
    },
    portfolio: {
      label: "Portofolio Proyek",
      title: "Terbukti di produksi.",
      desc: "4 klien. 5 sistem. Semua berjalan di lapangan.",
      client_label: "Klien",
      systems_label: "Sistem Dibangun",
      friction: "Permasalahan",
      engine: "Solusi",
      roi: "ROI & Dampak",
      proof: "Bukti Kerja",
    },
    whyme: {
      badge: "Keunggulan Arsitek",
      title1: "Mengapa Arsitek,",
      title2: "bukan freelancer biasa?",
      p: "Kebanyakan engineer otomasi belum pernah memimpin tim. Kebanyakan manajer operasional tidak bisa membangun otomasi. Saya melakukan keduanya — dan kombinasi itu langka.",
      checks: [
        { title: "Saya memahami masalah dari dalam", desc: "Saya pernah bekerja di operasional. Saya tahu apa yang rusak di lapangan. Sistem yang saya bangun memecahkan masalah nyata, bukan teoritis." },
        { title: "Semua terbukti di produksi", desc: "Semua sistem dalam portofolio ini berjalan di operasional nyata. Bukan lingkungan demo, bukan proyek latihan. Data nyata, tim nyata, skala nyata." },
        { title: "Tidak perlu banyak arahan", desc: "Saya scope, desain, bangun, dan deliver. Anda brief saya sekali. Saya terjemahkan menjadi sistem yang bertahan melampaui engagement." },
      ],
      cards: [
        { title: "Adaptabilitas lintas industri", desc: "Telekomunikasi, logistik, dan kini pengembangan aplikasi. Prinsip yang sama berlaku. Pendekatan yang sama berhasil. Saya beradaptasi dengan cepat." },
        { title: "Hasil di atas kompleksitas", desc: "Tujuannya bukan sistem yang terlihat canggih. Tujuannya adalah mengembalikan waktu ke tim. Sederhana, andal, dan benar-benar digunakan." },
        { title: "Komunikasi async-first", desc: "Saya bekerja lintas zona waktu. Dokumentasi menyeluruh. Handoff bersih. Anda tidak pernah menunggu update status." },
      ],
    },
    contact: {
      label: "Mari Bekerja Cerdas",
      title1: "Punya sistem",
      title2: "dalam pikiran? Mari ngobrol.",
      desc: "Baik itu otomasi, full-stack app, atau mengurai operasional yang rumit — hubungi saya dan mari kita cari tahu apa yang masuk akal untuk kasus Anda.",
      also_on: "Juga Tersedia Di",
      based: "Berbasis di Makassar, Indonesia • Melayani Klien Global",
    },
    footer: {
      tagline: "Arsitek Sistem Operasional • Dibangun dengan React & Tailwind",
      n8n: "Ahli n8n",
      ops: "Arsitek Ops",
    },
  },
} as const;

export default function App() {
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lang, setLang] = useState<Lang>('en');

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPortfolioOpen(true);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setPortfolioOpen(false), 180);
  };
  const t = translations[lang];

  const toolGroups = [
    { category: "Automation", tools: ["n8n", "Telegram Bot API", "WhatsApp Automation", "REST API / Webhooks"] },
    { category: "Data & Analytics", tools: ["Google Sheets", "Advanced Excel", "Power BI", "SUMIFS / XLOOKUP"] },
    { category: "Intelligence", tools: ["AI / OCR", "Groq AI", "Google Forms"] },
    { category: "Mobile", tools: ["Kotlin", "Jetpack Compose", "FCM", "Google Maps API"] },
    { category: "Backend", tools: ["Node.js", "Express.js", "Firebase", "Supabase", "MongoDB Atlas", "JWT", "bcrypt"] },
    { category: "Infra & Tooling", tools: ["Vercel", "AWS Lambda", "React", "PWA", "ExcelJS"] },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">

      {/* ── Navigation ── */}
      <nav className="fixed top-0 w-full z-50 bg-brand-bg/95 backdrop-blur-sm border-b border-brand-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-serif text-lg font-semibold tracking-tight text-brand-text">
            Muhammad Tharmizy Tahir
          </span>
          <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.15em] font-semibold text-brand-muted">
            <a href="#expertise" className="hover:text-brand-accent transition-colors">{t.nav.expertise}</a>
            <div className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              <a href="#portfolio" className="flex items-center gap-1 hover:text-brand-accent transition-colors">
                {t.nav.portfolio} <ChevronDown className={`w-3 h-3 transition-transform ${portfolioOpen ? 'rotate-180' : ''}`} />
              </a>
              {portfolioOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-brand-bg border border-brand-border py-2 z-50" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                  {clients.map((client) => (
                    <a
                      key={client.id}
                      href={`#client-${client.id}`}
                      onClick={() => setPortfolioOpen(false)}
                      className="block px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-brand-muted hover:text-brand-accent hover:bg-brand-surface transition-all"
                    >
                      {client.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="#contact" className="hover:text-brand-accent transition-colors">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-brand-border text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-muted hover:text-brand-accent hover:border-brand-accent transition-all"
              aria-label="Toggle language"
            >
              <Globe className="w-3 h-3" />
              {lang === 'en' ? 'ID' : 'EN'}
            </button>
            <a
              href="#contact"
              className="bg-brand-text text-brand-bg px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-brand-accent transition-colors"
            >
              {t.nav.hire}
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-16">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <p className="label-caps mb-6">{t.hero.badge}</p>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight text-brand-text mb-8">
                {t.hero.h1}
              </h1>
              <p className="text-base md:text-lg text-brand-muted mb-5 leading-relaxed">
                {t.hero.p1_pre}<span className="text-brand-text font-medium italic">{t.hero.p1_highlight}</span>{t.hero.p1_post}
              </p>
              <p className="text-sm text-brand-muted mb-6 leading-relaxed">
                {t.hero.p2_pre}<span className="text-brand-text font-semibold">{t.hero.p2_highlight}</span>{t.hero.p2_post}
              </p>
              <blockquote className="border-l-[3px] border-brand-accent pl-5 py-1 mb-10">
                <p className="text-sm font-serif italic text-brand-muted leading-relaxed">{t.hero.quote}</p>
              </blockquote>
              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="https://wa.me/6285342020433?text=Hi%20Tharmizy%2C%20I%20want%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-accent text-white px-7 py-3.5 text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  {t.hero.cta_hire} <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://www.fiverr.com/tamtam2492"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-brand-border px-7 py-3.5 text-sm font-semibold text-brand-text flex items-center gap-2 hover:border-brand-accent hover:text-brand-accent transition-all"
                >
                  {t.hero.cta_fiverr}
                </a>
                <p className="text-sm text-brand-muted">{t.hero.available}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="shrink-0 md:pt-4"
            >
              <img
                src="/foto.jpg"
                alt="Muhammad Tharmizy Tahir, ST"
                className="w-52 h-64 md:w-64 md:h-80 object-cover object-top border border-brand-border"
              />
              <p className="label-caps mt-3 text-center">{t.hero.badge_img}</p>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 mt-24 border-t border-brand-border pt-12"
          >
            {t.stats.map((stat, i) => (
              <div key={i} className={`py-4 pr-8 ${i > 0 ? 'md:border-l border-brand-border md:pl-8' : ''}`}>
                <div className="font-serif text-4xl md:text-5xl text-brand-text mb-1">{stat.value}</div>
                <div className="label-caps">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* ── Expertise ── */}
      <section id="expertise" className="py-24 px-6 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
            <div className="max-w-lg">
              <p className="label-caps mb-4">{t.expertise.label}</p>
              <h2 className="font-serif text-3xl md:text-4xl leading-snug">{t.expertise.title}</h2>
            </div>
            <p className="text-brand-muted text-sm max-w-sm leading-relaxed md:pt-10">{t.expertise.desc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-brand-border">
            {t.expertise.cards.map((card, i) => {
              const ordinals = ["01", "02", "03"];
              const tagSets = [
                ["n8n", "Webhooks", "API Integration"],
                ["Excel Advanced", "Power BI", "Data Pipelines"],
                ["Kotlin", "Firebase", "REST API"],
              ];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-brand-surface p-8 group hover:bg-brand-bg transition-colors"
                >
                  <span className="font-serif text-5xl text-brand-accent/30 group-hover:text-brand-accent/50 transition-colors block mb-6">{ordinals[i]}</span>
                  <h3 className="font-serif text-xl mb-4 text-brand-text">{card.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed mb-6">{card.desc}</p>
                  <div className="flex flex-col gap-1">
                    {tagSets[i].map(tag => (
                      <span key={tag} className="text-xs text-brand-muted font-medium">— {tag}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="label-caps mb-4">{t.process.label}</p>
            <h2 className="font-serif text-3xl md:text-5xl leading-snug">
              {t.process.title}
            </h2>
            <p className="text-brand-muted text-sm mt-3 tracking-wide">{t.process.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {t.process.steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-t-2 border-brand-border pt-6 hover:border-brand-accent transition-colors group"
              >
                <span className="font-serif text-4xl text-brand-accent/25 group-hover:text-brand-accent/60 transition-colors block mb-5">{item.step}</span>
                <h3 className="font-serif text-xl mb-3 text-brand-text">{item.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools & Stack ── */}
      <section className="py-20 px-6 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-14">
            <div className="max-w-sm">
              <p className="label-caps mb-4">{t.tools.label}</p>
              <h2 className="font-serif text-3xl md:text-4xl leading-snug mb-4">{t.tools.title}</h2>
              <p className="text-brand-muted text-sm leading-relaxed">{t.tools.desc}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {toolGroups.map((group) => (
              <div key={group.category}>
                <p className="font-serif italic text-brand-muted text-sm mb-3">{group.category}</p>
                <ul className="space-y-1.5">
                  {group.tools.map(tool => (
                    <li key={tool} className="text-sm text-brand-text font-medium">{tool}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="label-caps mb-4">{t.portfolio.label}</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-snug">{t.portfolio.title}</h2>
            <p className="text-brand-muted mt-3 text-sm">{t.portfolio.desc}</p>
          </div>

          {/* Client quick nav */}
          <div className="flex flex-wrap gap-3 mb-14">
            {clients.map((client) => (
              <a
                key={client.id}
                href={`#client-${client.id}`}
                className="px-4 py-2 border border-brand-border text-[11px] uppercase tracking-[0.15em] font-semibold text-brand-muted hover:border-brand-accent hover:text-brand-accent transition-all"
              >
                {client.name}
              </a>
            ))}
          </div>

          <div className="space-y-24">
            {clients.map((client) => (
              <div key={client.id} id={`client-${client.id}`}>
                {/* Client header */}
                <div className="flex items-baseline justify-between gap-4 mb-10 pb-4 border-b border-brand-border">
                  <div>
                    <p className="label-caps mb-1">{t.portfolio.client_label}</p>
                    <h3 className="font-serif text-2xl md:text-3xl text-brand-text">{client.name}</h3>
                    <p className="text-sm text-brand-muted mt-1">{client.division[lang]}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="label-caps mb-1">{t.portfolio.systems_label}</p>
                    <span className="font-serif text-4xl text-brand-accent">{client.projects.length}</span>
                  </div>
                </div>

                {/* Projects */}
                <div className="space-y-8">
                  {client.projects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="card-editorial p-6 md:p-8"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                        <h4 className="font-serif text-xl md:text-2xl text-brand-text">{project.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map(tool => (
                            <span key={tool} className="text-xs text-brand-muted border-b border-brand-border pb-px">{tool}</span>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        <div>
                          <p className="label-caps mb-3">{t.portfolio.friction}</p>
                          <p className="text-sm text-brand-muted leading-relaxed">{project.problem[lang]}</p>
                        </div>
                        <div>
                          <p className="label-caps mb-3">{t.portfolio.engine}</p>
                          <p className="text-sm text-brand-muted leading-relaxed">{project.solution[lang]}</p>
                        </div>
                        <div className="accent-rule">
                          <p className="label-caps mb-3 text-brand-accent">{t.portfolio.roi}</p>
                          <p className="text-sm text-brand-text leading-relaxed font-medium">{project.roi[lang]}</p>
                        </div>
                      </div>

                      {('image' in project || 'video' in project) && (
                        <div className="mt-8 pt-6 border-t border-brand-border">
                          <p className="label-caps mb-4">{t.portfolio.proof}</p>
                          {'video' in project && project.video ? (
                            <video src={project.video} controls autoPlay loop muted playsInline className="w-full border border-brand-border" />
                          ) : 'image' in project && project.image ? (
                            <a href={project.image} target="_blank" rel="noopener noreferrer">
                              <img src={project.image} alt={`${project.title} proof`} className="w-full border border-brand-border hover:opacity-90 transition-opacity" />
                            </a>
                          ) : null}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Work With Me ── */}
      <section className="py-24 px-6 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="label-caps mb-4">{t.whyme.badge}</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight max-w-2xl">
              {t.whyme.title1}<br /><span className="italic">{t.whyme.title2}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-lg text-brand-muted leading-relaxed mb-12">{t.whyme.p}</p>
              <div className="space-y-8">
                {t.whyme.checks.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border-t border-brand-border pt-6"
                  >
                    <h3 className="font-serif text-lg mb-2 text-brand-text">{item.title}</h3>
                    <p className="text-sm text-brand-muted leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {t.whyme.cards.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-brand-bg border border-brand-border p-6 border-l-[3px] border-l-brand-accent hover:bg-brand-surface transition-colors"
                >
                  <h3 className="font-serif text-lg mb-2 text-brand-text">{item.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="label-caps mb-6">{t.contact.label}</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-6 max-w-2xl">
              {t.contact.title1}<br /><span className="italic">{t.contact.title2}</span>
            </h2>
            <p className="text-brand-muted max-w-lg leading-relaxed">{t.contact.desc}</p>
          </motion.div>

          <div className="max-w-xl space-y-0 mb-14">
            {[
              { label: "Email", value: "muhammad.tharmizy@gmail.com", href: "mailto:muhammad.tharmizy@gmail.com" },
              { label: "WhatsApp", value: "+62 853-4202-0433", href: "https://wa.me/6285342020433?text=Hi%20Tharmizy%2C%20I%20want%20to%20discuss%20a%20project" },
              { label: "Telegram", value: "@tamtam2492", href: "https://t.me/tamtam2492" },
              { label: "LinkedIn", value: "linkedin.com/in/muhammadtharmizy", href: "https://www.linkedin.com/in/muhammadtharmizy" },
              { label: "GitHub", value: "github.com/tamtam2492", href: "https://github.com/tamtam2492" },
              { label: "Fiverr", value: "fiverr.com/tamtam2492", href: "https://www.fiverr.com/tamtam2492" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-baseline justify-between py-4 border-b border-brand-border group hover:border-brand-accent transition-colors"
              >
                <span className="label-caps group-hover:text-brand-accent transition-colors">{item.label}</span>
                <span className="text-sm text-brand-text font-medium underline underline-offset-4 decoration-brand-border group-hover:decoration-brand-accent transition-all">{item.value}</span>
              </a>
            ))}
          </div>

          <p className="label-caps">{t.contact.based}</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 border-t border-brand-border bg-brand-surface">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-serif text-sm text-brand-muted">Muhammad Tharmizy Tahir, ST © 2026</span>
          <span className="label-caps text-center">{t.footer.tagline}</span>
          <div className="flex gap-6">
            <span className="label-caps">{t.footer.n8n}</span>
            <span className="label-caps">{t.footer.ops}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
