# Interview Prep — Maulagi Transfer Dashboard & Reconciliation System

---

## Q1: Tell me about yourself.

I'm a fullstack developer and operations systems architect based in Makassar, Indonesia. I specialize in building automation workflows and production-grade applications — Android, PWA, and web systems. I've also led field operations managing 50+ agents across 5 cities, so I understand both the technical and operational side of the systems I build.

---

## Q2: What is the Maulagi project?

It's a Transfer Dashboard and Reconciliation System I built for PT Maulagi Indo Solusi — a logistics and expedition company with 80+ branches across two operational areas in Sulawesi. The system allows branch operators to upload transfer proof photos, auto-extracts the data using AI, and gives admin real-time reconciliation visibility across all branches.

---

## Q3: What problem did you solve?

Before this system, admin had to manually cross-check transfer receipts from 80+ branches with multi-bank payments — BRI, BCA, ShopeePay, GoPay, BNI, DANA. That process consumed nearly a full working day just for daily reconciliation. Discrepancies went undetected for days, and duplicate entries were common.

---

## Q4: What is the overall architecture?

Hybrid architecture: **Vercel** handles the frontend and API routes, **AWS Lambda** handles background processing — Telegram notifications and NONCOD sync pipelines. Data is stored in **Supabase (PostgreSQL)**. Rate limiting runs on **Upstash Redis** per instance.

---

## Q5: Walk me through the user flow.

1. Branch operator opens the web form and uploads a transfer proof photo.
2. The system sends the image to **Groq AI (Llama 4 Scout)** via OCR pipeline.
3. Groq extracts bank name, amount, and date — per field.
4. Data is saved to Supabase with **deduplication checks**.
5. Admin sees the result instantly on the dashboard — per branch, per bank, per period.
6. Admin can export to **XLSX** anytime.

---

## Q6: Why did you use Groq AI for OCR instead of a traditional OCR library?

Traditional OCR struggles with varied receipt formats, low-quality photos, and multi-bank layouts. Groq's Llama 4 Scout does per-field extraction with natural language understanding — it doesn't just read text, it understands context. If a field fails to read, it tells you exactly which field failed, not just a generic error.

---

## Q7: What is the async pipeline and why did you use it?

OCR processing and NONCOD sync are heavy operations. If they ran synchronously, the user would wait 5–10 seconds per request. I moved them to **background async pipelines** — the user's request returns instantly with a "processing" response, while the heavy work runs separately via AWS Lambda. This keeps the UI fast and prevents timeout errors.

---

## Q8: How did you handle duplicate entries?

Before inserting any record to Supabase, the system checks for an existing entry with the same combination of: branch ID, bank, amount, and date. If a match is found, the insert is rejected and the operator is notified. This eliminated 99% of duplicate entries.

---

## Q9: Why Supabase instead of Firebase or MongoDB?

Supabase uses **PostgreSQL** — relational data with strong consistency, which is critical for financial reconciliation. I need JOIN queries across branches, banks, and periods. Firebase and MongoDB are document-based and less suited for this kind of multi-dimensional financial reporting. Supabase also gives me a clean REST API and row-level security out of the box.

---

## Q10: What security measures did you implement?

- **bcrypt** for password hashing — no plaintext credentials stored.
- **OWASP-aligned HTTP security headers** — Content-Security-Policy, X-Frame-Options, X-Content-Type-Options.
- **Rate limiting via Upstash Redis** — prevents brute force and API abuse per instance.
- **Input validation** on all form fields before any DB operation.
- **No sensitive data in logs** — transaction amounts and branch IDs are never logged raw.

---

## Q11: What is NONCOD/DFOD monitoring and how does it sync?

NONCOD and DFOD are delivery status categories from MauKirim — the courier management platform Maulagi uses. I built a sync pipeline on AWS Lambda that pulls courier status updates from MauKirim and cross-references them against the reconciliation data. This gives admin visibility on which branches have outstanding unverified payments tied to active deliveries.

---

## Q12: What was the biggest technical challenge?

Managing the async OCR pipeline reliably. The challenge was ensuring that if Groq returned a partial extraction — for example, amount read correctly but date failed — the system wouldn't silently insert incomplete data. I solved this with per-field validation: each field is validated individually, and the whole record is only inserted when all required fields pass. Otherwise, the operator gets a specific error message.

---

## Q13: How did you handle AWS Lambda vs Vercel split?

Vercel handles everything user-facing — form submission, dashboard rendering, XLSX export. AWS Lambda handles everything that runs in the background and doesn't need to return a response to the user — Telegram notifications when a branch submits, and the NONCOD sync pipeline. This keeps Vercel functions fast and within timeout limits.

---

## Q14: What were the results after deployment?

- Daily reconciliation time dropped from a **full working day to under 20 minutes** — 95% reduction.
- **99% duplicate entries eliminated.**
- **Rp90 million+/month** in transaction volume now tracked in real-time across 80+ branches.
- Admin went from manually checking receipts to just reviewing the dashboard.

---

## Q15: If you had to rebuild this, what would you do differently?

I would add a **retry queue** for failed OCR extractions — currently if Groq is temporarily unavailable, the operator has to resubmit manually. A background retry queue with exponential backoff would make the system more resilient. I'd also add **webhook-based real-time branch notifications** instead of polling, to reduce unnecessary API calls.

---

*Good luck. Breathe. You built this — you know it.*
