import { LayoutTemplate, Eye, Download, ShieldCheck, Palette, Wand2 } from "lucide-react"

const FEATURES = [
  {
    icon: LayoutTemplate,
    title: "Beautiful templates",
    desc: "Six distinct, recruiter-friendly layouts — from minimal to bold — covering every industry.",
  },
  {
    icon: Eye,
    title: "Real-time preview",
    desc: "See exactly how your resume looks as you type. What you see is what you download.",
  },
  {
    icon: Download,
    title: "One-click PDF",
    desc: "Export a crisp, print-ready PDF instantly. Multi-page documents are handled automatically.",
  },
  {
    icon: Palette,
    title: "Custom accents",
    desc: "Switch template colors and font sizing to match your personal brand in a tap.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    desc: "Everything is stored in your browser. No accounts, no servers, no tracking of your data.",
  },
  {
    icon: Wand2,
    title: "Resume & CV",
    desc: "Toggle between a concise resume and a longer-form CV using the same content.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-b border-border/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to land the interview
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Thoughtfully designed tools that make creating a professional resume effortless.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
