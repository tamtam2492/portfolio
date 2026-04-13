/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useState } from "react";
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

const clients = [
  {
    id: "telkomsel",
    name: "Telkomsel",
    division: "Collection Operations Division",
    color: "text-red-400",
    borderColor: "border-red-500/30",
    bgColor: "bg-red-500/5",
    projects: [
      {
        id: "telkomsel-automation",
        title: "Payment Receipt Automation",
        problem: "Agents manually processed dozens of payment receipts daily via Telegram. High error rates and zero consistency.",
        solution: "Built an end-to-end n8n workflow. AI/OCR extracts data from receipt photos, validates it, and syncs to Google Sheets with auto-confirmation messages.",
        roi: "Manual data entry dropped to zero. 95% AI/OCR accuracy achieved. 80% reduction in manual processing time — from hours to under 10 seconds per receipt. Handles 500+ transactions daily. Zero transcription errors across the entire collection team.",
        tools: ["n8n", "Telegram Bot API", "AI / OCR", "Google Sheets", "REST API"],
        icon: <Zap className="w-5 h-5 text-blue-400" />,
        video: "/video_payment_receipt_automation.mp4"
      },
      {
        id: "field-monitoring",
        title: "Field Team Monitoring System",
        problem: "No unified system for 50+ agents across 5 cities — Makassar, Manado, Palu, Kendari, and Gorontalo. Management spent days just consolidating data.",
        solution: "Custom Excel-based operational backbone aggregating ACH Target, Recovery Rate, and Gap Analysis automatically across all cities. Automated reporting replaced manual daily compilation.",
        roi: "Shifted leadership focus from data collection to decision-making. 42% improvement in task completion time. Reduced coordination overhead by 8 hours per day for management.",
        tools: ["Advanced Excel", "SUMIFS", "XLOOKUP", "Data Architecture"],
        icon: <BarChart3 className="w-5 h-5 text-green-400" />
      },
    ]
  },
  {
    id: "maulagi",
    name: "PT Maulagi Indo Solusi",
    division: "Logistics & Expedition Operations",
    color: "text-purple-400",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/5",
    projects: [
      {
        id: "expedition-recon",
        title: "Transfer Dashboard & Reconciliation System",
        problem: "80+ branches across 2 operational areas (SE Sulawesi & Makassar Outer) had no way to submit or verify transfer proofs digitally. Discrepancies went undetected for weeks. Multi-bank payments (BRI, BCA, ShopeePay, GoPay, BNI, DANA) across branches made tracking nearly impossible — reconciliation alone took up to 14 days.",
        solution: "Built a full-stack web application deployed on Vercel. Branch operators upload transfer proof photos via a web form — Groq AI/OCR auto-extracts bank name, amount, and date. Data is stored in Supabase (PostgreSQL) with deduplication checks. Admin dashboard provides real-time visibility per branch, per bank, and per period with export to XLSX. Secured with bcrypt auth, rate limiting, and OWASP-aligned HTTP security headers.",
        roi: "Reconciliation cycle cut from 14 days to same-day. 99% duplicate entries eliminated. Rp90M+/month transaction volume tracked in real-time across 80+ branches. Management gets live branch-level accuracy without any manual effort.",
        tools: ["Node.js", "Supabase", "Groq AI / OCR", "Vercel", "bcrypt", "REST API", "HTML/CSS/JS"],
        icon: <Layers className="w-5 h-5 text-purple-400" />,
        video: "/maulagi-demo.mp4"
      },
    ]
  },
  {
    id: "nie-buket",
    name: "Nie Buket",
    division: "Premium Bouquet & Gift Shop",
    color: "text-pink-400",
    borderColor: "border-pink-500/30",
    bgColor: "bg-pink-500/5",
    projects: [
      {
        id: "nie-buket-pos",
        title: "POS & Inventory Management System",
        problem: "No digital system for managing sales, stock, and receipts. Transactions done manually with zero record keeping or reporting.",
        solution: "Built a full-stack Progressive Web App with Express.js + MongoDB Atlas backend. Features include product & stock management, transaction history, thermal receipt printing via Bluetooth, and real-time low-stock alerts.",
        roi: "Fully digitized operations. Every sale is recorded, stock is tracked automatically, and receipts print instantly. Deployed live on Vercel.",
        tools: ["Node.js", "Express.js", "MongoDB Atlas", "React", "PWA", "Vercel", "Bluetooth Printer"],
        icon: <Database className="w-5 h-5 text-pink-400" />,
        image: "/niebuket-proof.jpg"
      },
    ]
  },
  {
    id: "quality-laundry",
    name: "Quality Laundry",
    division: "Android Operations App — v1.4.11 Production",
    color: "text-orange-400",
    borderColor: "border-orange-500/30",
    bgColor: "bg-orange-500/5",
    projects: [
      {
        id: "quality-laundry-app",
        title: "Quality Laundry Ecosystem",
        problem: "UMKM laundry dengan pickup/delivery tanpa sistem digital. Status pesanan tidak transparan, koordinasi kurir manual via chat, dan nol pelaporan otomatis.",
        solution: "Full-stack Android app (v1.4.11) menghubungkan 3 role — Customer, Kurir, Admin — dengan alur operasional end-to-end: buat pesanan → pickup → proses → delivery → selesai. Fitur: chat real-time, GPS tracking kurir, push notification (FCM), 18 API endpoint, laporan harian/mingguan/bulanan dengan export XLSX, JWT auth, dan security hardening.",
        roi: "Operasional laundry sepenuhnya terdigitalisasi. Status pesanan real-time untuk semua pihak. Laporan otomatis menggantikan pencatatan manual. APK production dirilis dan aktif digunakan.",
        tools: ["Kotlin", "Jetpack Compose", "Firebase Realtime DB", "FCM", "Express.js", "MongoDB Atlas", "JWT", "Google Maps", "ExcelJS", "Vercel"],
        icon: <Smartphone className="w-5 h-5 text-orange-400" />,
        image: "/quality-laundry-proof.png"
      },
    ]
  }
];

const stats = [
  { label: "Manual Work Eliminated", value: "100%" },
  { label: "AI/OCR Accuracy", value: "95%+" },
  { label: "Agents Managed", value: "50+" },
  { label: "Monthly Savings Delivered", value: "$3.5k+" }
];

export default function App() {
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-accent/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-brand-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-accent rounded flex items-center justify-center font-bold text-white">T</div>
            <span className="font-mono text-sm tracking-tighter uppercase font-bold">Muhammad Tharmizy Tahir, ST</span>
          </div>
          <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-muted">
            <a href="#expertise" className="hover:text-white transition-colors">Expertise</a>
            {/* Portfolio dropdown */}
            <div className="relative" onMouseEnter={() => setPortfolioOpen(true)} onMouseLeave={() => setPortfolioOpen(false)}>
              <a href="#portfolio" className="flex items-center gap-1 hover:text-white transition-colors">
                Portfolio <ChevronDown className={`w-3 h-3 transition-transform ${portfolioOpen ? 'rotate-180' : ''}`} />
              </a>
              {portfolioOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 glass border border-brand-border rounded-xl py-2 z-50 shadow-xl">
                  {clients.map((client) => (
                    <a
                      key={client.id}
                      href={`#client-${client.id}`}
                      onClick={() => setPortfolioOpen(false)}
                      className="block px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-brand-muted hover:text-white hover:bg-brand-accent/10 transition-all"
                    >
                      {client.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <a 
            href="#contact"
            className="bg-white text-black px-5 py-2.5 rounded text-[11px] font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all"
          >
            Hire Architect
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-brand-accent rounded-full blur-[160px] opacity-15" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-700 rounded-full blur-[120px] opacity-25" />
          <div className="absolute bottom-20 right-1/3 w-48 h-48 bg-indigo-600 rounded-full blur-[80px] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-widest mb-6">
                <Cpu className="w-3 h-3" /> Fullstack Developer | Automation Specialist | Workflow & AI Orchestration
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.0] mb-8 text-gradient">
                Turning operational chaos into $3,500+ monthly savings.
              </h1>
              <p className="text-lg md:text-xl text-brand-muted mb-6 leading-relaxed max-w-2xl">
                I build the <span className="text-white font-medium italic">"Final Brain"</span> logic for enterprise workflows — and I measure success in <span className="text-white font-semibold">hours reclaimed, errors eliminated, and money saved</span>. Not in lines of code.
              </p>
              <p className="text-sm text-brand-muted mb-6 leading-relaxed max-w-2xl">
                Proven field operations leadership — led, monitored, and coordinated <span className="text-white font-semibold">50+ agents across 5 cities in Sulawesi</span> (Makassar, Manado, Palu, Kendari, Gorontalo), including recruitment, performance evaluation, and resolving field issues. I know what breaks on the ground, and I build automation that survives it.
              </p>
              <blockquote className="border-l-2 border-brand-accent pl-5 py-1 mb-10 max-w-2xl">
                <p className="text-sm italic text-brand-muted leading-relaxed">"As long as there is data that needs to be tracked, I can automate it. Because I have proven it in the field."</p>
              </blockquote>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/6285342020433?text=Hi%20Tharmizy%2C%20I%20want%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-accent text-white px-8 py-4 rounded font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  Hire Me Now <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://www.fiverr.com/tamtam2492"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#1DBF73] text-[#1DBF73] px-8 py-4 rounded font-bold flex items-center gap-2 hover:bg-[#1DBF73] hover:text-white transition-all"
                >
                  Start Your Transformation <Globe className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-4 px-6 py-4 rounded border border-brand-border font-mono text-xs text-brand-muted">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Available for Q2 2026 Projects
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="shrink-0 md:pt-8"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-brand-accent/20 blur-2xl scale-105" />
                <img
                  src="/foto.jpg"
                  alt="Muhammad Tharmizy Tahir, ST"
                  className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover object-top border border-brand-border"
                />
                <div className="absolute -bottom-3 -right-3 px-3 py-1.5 bg-brand-card border border-brand-border rounded-lg text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest">
                  4 Clients • 5 Systems
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-28 border-t border-brand-border/60 pt-14"
          >
            {stats.map((stat, i) => (
              <div key={i} className="group">
                <div className="text-4xl md:text-6xl font-black mb-2 font-mono tracking-tighter group-hover:text-brand-accent transition-colors">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-brand-muted font-bold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 px-6 bg-brand-card/30 border-y border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">Core Knowledge Base</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Architecting the infrastructure of high-growth operations.</h3>
            </div>
            <p className="text-brand-muted max-w-sm text-sm">
              I don't just build systems. I understand what breaks in the field, what people actually need, and how to design automation that survives real-world conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-xl glass hover:border-brand-accent/50 transition-all group">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 transition-colors">
                <Zap className="w-6 h-6 text-brand-accent" />
              </div>
              <h4 className="text-xl font-bold mb-4 tracking-tight">Workflow Automation</h4>
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                Specializing in n8n, Telegram Bot API, and WhatsApp automation. I eliminate manual friction by connecting disparate data sources into a single "Final Brain" logic.
              </p>
              <div className="flex flex-wrap gap-2">
                {["n8n", "Webhooks", "API Integration"].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-brand-muted">{tag}</span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-xl glass hover:border-brand-accent/50 transition-all group">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 transition-colors">
                <Database className="w-6 h-6 text-brand-accent" />
              </div>
              <h4 className="text-xl font-bold mb-4 tracking-tight">Operations Architecture</h4>
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                Designing real-time reconciliation engines and performance monitoring dashboards. I turn fragmented data into operational visibility for teams of 50+.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Excel Advanced", "Power BI", "Data Pipelines"].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-brand-muted">{tag}</span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-xl glass hover:border-brand-accent/50 transition-all group">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 transition-colors">
                <Layout className="w-6 h-6 text-brand-accent" />
              </div>
              <h4 className="text-xl font-bold mb-4 tracking-tight">Full-Stack Ecosystems</h4>
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                Building custom Android operations apps using Kotlin and Jetpack Compose. Seamlessly integrated with Firebase and Node.js backends for field-to-office sync.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Kotlin", "Firebase", "REST API"].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-brand-muted">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-accent/5 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">How I Work</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">
              From chaos to clarity<span className="text-brand-muted font-light"> — four steps.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[13%] right-[13%] h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />
            {[
              { step: "01", title: "Diagnose", desc: "I map every friction point, manual step, and data gap before a single line is written. Nothing gets missed." },
              { step: "02", title: "Architect", desc: "Design logic that handles real-world edge cases — not just happy paths. Tools are chosen last, never first." },
              { step: "03", title: "Build & Test", desc: "Iterative builds with live testing at each stage. Breaking before production means fixing before deployment." },
              { step: "04", title: "Deploy & Hand Off", desc: "Full documentation, training, and async support. Systems I build stay running long after I leave." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 glass rounded-xl hover:border-brand-accent/50 transition-all group"
              >
                <div className="text-[10px] font-mono text-brand-accent font-bold mb-6 tracking-[0.3em]">{item.step}</div>
                <h4 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h4>
                <p className="text-sm text-brand-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Stack Section */}
      <section className="py-20 px-6 bg-brand-card/40 border-y border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="md:w-1/3">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">Technology Stack</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Tools that survive the field.</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Every tool chosen has a reason. No over-engineering. No hype-driven choices. Only what builds reliable, maintainable systems.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "n8n", category: "Automation" },
                { name: "Telegram Bot API", category: "Messaging" },
                { name: "WhatsApp Automation", category: "Messaging" },
                { name: "Google Sheets", category: "Data Layer" },
                { name: "Google Forms", category: "Data Collection" },
                { name: "AI / OCR", category: "Intelligence" },
                { name: "Advanced Excel", category: "Analytics" },
                { name: "Power BI", category: "Analytics" },
                { name: "Kotlin & Compose", category: "Mobile" },
                { name: "Firebase", category: "Backend" },
                { name: "Node.js", category: "API" },
                { name: "Google Maps API", category: "Logistics" },
              ].map((tool) => (
                <div key={tool.name} className="flex items-center gap-3 p-4 glass rounded-lg hover:border-brand-accent/40 transition-all group">
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <div className="text-sm font-semibold tracking-tight">{tool.name}</div>
                    <div className="text-[10px] uppercase text-brand-muted tracking-widest font-bold">{tool.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">Project Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">Proven in production.</h3>
            <p className="text-brand-muted mt-4 text-sm">4 clients. 5 systems. All running in the field.</p>
          </div>

          {/* Per-client quick nav */}
          <div className="flex flex-wrap gap-2 mb-14">
            {clients.map((client) => (
              <a
                key={client.id}
                href={`#client-${client.id}`}
                className={`px-4 py-2 rounded-lg border border-brand-border text-[11px] font-bold uppercase tracking-widest transition-all hover:border-brand-accent/60 hover:text-white text-brand-muted`}
              >
                {client.name}
              </a>
            ))}
          </div>

          <div className="space-y-20">
            {clients.map((client) => (
              <div key={client.id} id={`client-${client.id}`}>
                {/* Client Header */}
                <div className={`flex items-center gap-4 mb-10 p-5 rounded-xl border ${client.borderColor} ${client.bgColor}`}>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-brand-muted mb-1">Client</div>
                    <div className={`text-2xl font-black tracking-tight ${client.color}`}>{client.name}</div>
                    <div className="text-sm text-brand-muted mt-0.5">{client.division}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-brand-muted mb-1">Systems Built</div>
                    <div className="text-4xl font-black font-mono text-brand-text">{client.projects.length}</div>
                  </div>
                </div>

                {/* Projects for this client */}
                <div className="grid gap-6">
                  {client.projects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="grid md:grid-cols-3 gap-6 p-6 glass rounded-xl hover:border-brand-accent/30 transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 bg-brand-card rounded-lg flex items-center justify-center border border-brand-border">
                            {project.icon}
                          </div>
                          <h4 className="font-bold text-lg tracking-tight leading-tight">{project.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {project.tools.map(tool => (
                            <span key={tool} className="px-2 py-0.5 bg-brand-border/40 rounded text-[10px] font-mono text-brand-muted border border-brand-border">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-brand-muted mb-2">The Friction</div>
                        <p className="text-sm text-brand-muted leading-relaxed mb-4">{project.problem}</p>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-brand-muted mb-2">The Engine</div>
                        <p className="text-sm text-brand-muted leading-relaxed">{project.solution}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-brand-accent/5 border-l-2 border-brand-accent h-fit">
                        <div className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mb-2">ROI & Impact</div>
                        <p className="text-sm font-medium leading-relaxed">{project.roi}</p>
                      </div>
                      {('image' in project || 'video' in project) && (
                        <div className="md:col-span-3 mt-2">
                          <div className="text-[10px] uppercase tracking-widest font-bold text-brand-muted mb-3">Proof of Work</div>
                          {'video' in project && project.video ? (
                            <video src={project.video} controls autoPlay loop muted playsInline className="w-full rounded-xl border border-brand-border hover:border-brand-accent/50 transition-all" />
                          ) : 'image' in project && project.image ? (
                            <a href={project.image} target="_blank" rel="noopener noreferrer" className="block">
                              <img src={project.image} alt={`${project.title} proof`} className="w-full rounded-xl border border-brand-border hover:border-brand-accent/50 transition-all" />
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

      {/* Why Work With Me */}
      <section className="py-28 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-6">The Architect Advantage</div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              Why an Architect,<br />not a freelancer?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-xl opacity-70 leading-relaxed mb-14">
                Most automation engineers have never managed a team. Most operations managers cannot build automation. I do both — and that combination is rare.
              </p>
              <div className="space-y-10">
                {[
                  { title: "I understand the problem from inside", desc: "I have worked in operations. I know what breaks in the field. The systems I build solve real problems, not theoretical ones." },
                  { title: "Everything proven in production", desc: "All systems in this portfolio ran in real operations. Not demo environments, not practice projects. Real data, real teams, real scale." },
                  { title: "No hand-holding required", desc: "I scope, design, build, and deliver. You brief me once. I translate it into a system that outlasts the engagement." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <CheckCircle2 className="w-6 h-6 shrink-0 text-brand-accent mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xl mb-2 tracking-tight">{item.title}</h4>
                      <p className="text-base opacity-60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                { title: "Cross-industry adaptability", desc: "Telecoms, logistics, and now app development. The same principles apply. The same approach works. I adapt quickly." },
                { title: "Results over complexity", desc: "The goal is never an impressive-looking system. The goal is giving time back to the team. Simple, reliable, and actually used." },
                { title: "Async-first communication", desc: "I work across time zones. Documentation is thorough. Handoffs are clean. You are never left waiting for status updates." }
              ].map((item, i) => (
                <div key={i} className="p-8 border border-black/10 rounded-2xl hover:bg-black hover:text-white transition-all group cursor-default">
                  <h4 className="font-bold text-2xl mb-3 tracking-tight">{item.title}</h4>
                  <p className="opacity-60 leading-relaxed group-hover:opacity-80 transition-opacity">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-accent/8 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-accent mb-6">Stop Losing Money to Manual Work</h2>
            <h3 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
              Let's build your<br />
              <span className="text-brand-accent">$3,500+/mo Engine.</span>
            </h3>
            <p className="text-brand-muted max-w-xl mx-auto leading-relaxed">
              Every hour your team spends on manual data entry is money left on the table. I fix that — fast. Message me now and let's scope your system.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
            <a
              href="mailto:muhammad.tharmizy@gmail.com"
              className="flex flex-col items-center gap-3 p-8 glass rounded-2xl hover:bg-brand-accent hover:border-brand-accent transition-all group text-center"
            >
              <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Mail className="w-5 h-5 text-brand-accent group-hover:text-white" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-brand-muted group-hover:text-white/70 mb-1">Email</div>
                <div className="font-semibold text-sm tracking-tight group-hover:text-white">muhammad.tharmizy@gmail.com</div>
              </div>
            </a>
            <a
              href="https://wa.me/6285342020433?text=Hi%20Tharmizy%2C%20I%20want%20to%20discuss%20a%20project"
              target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-8 glass rounded-2xl hover:bg-green-500 hover:border-green-500 transition-all group text-center"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-green-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-brand-muted group-hover:text-white/70 mb-1">WhatsApp</div>
                <div className="font-semibold text-sm group-hover:text-white">+62 853-4202-0433</div>
              </div>
            </a>
            <a
              href="https://t.me/tamtam2492"
              target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-8 glass rounded-2xl hover:bg-sky-500 hover:border-sky-500 transition-all group text-center"
            >
              <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Send className="w-5 h-5 text-sky-400 group-hover:text-white" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-brand-muted group-hover:text-white/70 mb-1">Telegram</div>
                <div className="font-semibold text-sm group-hover:text-white">@tamtam2492</div>
              </div>
            </a>
          </div>

          {/* Freelance Platforms */}
          {/* Social & Freelance */}
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
            <a href="https://github.com/tamtam2492" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 glass rounded-2xl hover:bg-brand-accent hover:border-brand-accent transition-all group text-center">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-brand-accent group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-brand-muted group-hover:text-white/70 mb-1">GitHub</div>
                <div className="font-semibold text-sm group-hover:text-white">github.com/tamtam2492</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/muhammadtharmizy" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 glass rounded-2xl hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all group text-center">
              <div className="w-12 h-12 bg-[#0A66C2]/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-[#0A66C2] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-brand-muted group-hover:text-white/70 mb-1">LinkedIn</div>
                <div className="font-semibold text-sm group-hover:text-white">linkedin.com/in/muhammadtharmizy</div>
              </div>
            </a>
          </div>

          <div className="mb-8">
            <div className="text-center text-[10px] uppercase tracking-widest font-bold text-brand-muted mb-5">Also Available On</div>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://www.fiverr.com/tamtam2492" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 glass rounded-xl hover:border-[#1DBF73]/50 hover:bg-[#1DBF73]/10 transition-all group">
                <Globe className="w-4 h-4 text-[#1DBF73]" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-brand-muted group-hover:text-[#1DBF73]">Fiverr</div>
                  <div className="text-xs font-semibold">fiverr.com/tamtam2492</div>
                </div>
              </a>
            </div>
          </div>

          <div className="text-center">
            <div className="text-brand-muted text-[10px] uppercase tracking-widest font-bold">
              Based in Makassar, Indonesia • Serving Global Enterprise Clients
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6 border-t border-brand-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-brand-accent rounded flex items-center justify-center font-black text-white text-xs">T</div>
            <span className="font-mono text-xs tracking-widest uppercase font-bold text-brand-muted">Muhammad Tharmizy Tahir, ST © 2026</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-brand-muted text-center">
            Operations Systems Architect • Built with React & Tailwind
          </div>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest font-bold text-brand-muted">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-brand-accent" /> n8n Expert</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-brand-accent" /> Ops Architect</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
