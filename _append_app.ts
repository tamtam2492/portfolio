    { category: "Infra & Tooling", tools: ["Vercel", "React", "PWA", "ExcelJS"] },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">

      {/* ── Navigation ── */}
      <nav className="fixed top-0 w-full z-50 bg-brand-bg/95 backdrop-blur-sm border-b border-brand-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-serif text-base tracking-tight text-brand-text">
            Muhammad Tharmizy Tahir
          </span>
          <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.15em] font-semibold text-brand-muted">
            <a href="#expertise" className="hover:text-brand-accent transition-colors">{t.nav.expertise}</a>
            <div className="relative" onMouseEnter={() => setPortfolioOpen(true)} onMouseLeave={() => setPortfolioOpen(false)}>
              <a href="#portfolio" className="flex items-center gap-1 hover:text-brand-accent transition-colors">
                {t.nav.portfolio} <ChevronDown className={`w-3 h-3 transition-transform ${portfolioOpen ? 'rotate-180' : ''}`} />
              </a>
              {portfolioOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-brand-bg border border-brand-border py-2 z-50">
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
              {t.process.title}<span className="text-brand-muted italic font-serif">{t.process.subtitle}</span>
            </h2>
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
              {t.contact.title1}<br /><span className="italic text-brand-accent">{t.contact.title2}</span>
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
