const STEPS = [
  {
    n: "01",
    title: "Add your details",
    desc: "Fill in your experience, education, and skills. Load sample content to see how it flows.",
  },
  {
    n: "02",
    title: "Pick a design",
    desc: "Choose a template and accent color. Your resume updates live as you make changes.",
  },
  {
    n: "03",
    title: "Download & apply",
    desc: "Export a clean PDF ready to send to recruiters or upload to any job board.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="border-b border-border/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Three steps to a great resume
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card p-7">
              <span className="text-4xl font-extrabold text-primary/20">{s.n}</span>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
