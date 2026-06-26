"use client"

import { useRouter } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { TEMPLATES } from "@/components/resume/template-registry"
import { sampleResume, defaultSettings } from "@/lib/sample-data"
import { StaticSheet } from "./static-sheet"

const ACCENTS: Record<string, string> = {
  modern: "#2563eb",
  sidebar: "#0d9488",
  classic: "#334155",
  minimal: "#4f46e5",
  elegant: "#dc2626",
  compact: "#059669",
}

export function TemplatesShowcase() {
  const router = useRouter()

  function pick(templateId: string) {
    try {
      window.localStorage.setItem(
        "rb:settings",
        JSON.stringify({ ...defaultSettings, templateId, accent: ACCENTS[templateId] ?? defaultSettings.accent }),
      )
    } catch {
      // ignore
    }
    router.push("/builder")
  }

  return (
    <section id="templates" className="border-b border-border/60 bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Templates for every career
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Start from any design and customize colors, fonts, and content. Click one to begin.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => pick(t.id)}
              className="group flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="overflow-hidden transition-transform group-hover:scale-[1.02]">
                <StaticSheet data={sampleResume} templateId={t.id} accent={ACCENTS[t.id]} scale={0.34} />
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-base font-semibold">
                {t.name}
                <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">{t.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
