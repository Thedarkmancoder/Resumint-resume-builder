import Link from "next/link"
import { ArrowRight, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sampleResume } from "@/lib/sample-data"
import { StaticSheet } from "./static-sheet"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,theme(colors.primary/8%),transparent)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            Free, private, and runs entirely in your browser
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Build a standout resume in minutes
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Pick from professionally designed templates, edit with a live preview, and download a
            polished PDF. No sign-up, no watermark — your data never leaves your device.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href="/builder">
                Start building free
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#templates">Browse templates</a>
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["6 modern templates", "Instant PDF export", "Auto-saved locally"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -right-6 -top-6 hidden rotate-3 sm:block">
              <StaticSheet data={sampleResume} templateId="sidebar" accent="#0d9488" scale={0.34} />
            </div>
            <div className="relative">
              <StaticSheet data={sampleResume} templateId="modern" accent="#2563eb" scale={0.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
