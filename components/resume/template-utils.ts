import type { ResumeData } from "@/lib/types"

export interface TemplateProps {
  data: ResumeData
  accent: string
  fontScale: number
}

export function dateRange(start: string, end: string, current: boolean) {
  const e = current ? "Present" : end
  if (start && e) return `${start} — ${e}`
  return start || e || ""
}

export function bullets(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
}

export function hasContent(data: ResumeData) {
  return Boolean(
    data.basics.fullName ||
      data.basics.summary ||
      data.experience.length ||
      data.education.length,
  )
}

// Lighten/derive a soft tint of an accent hex for backgrounds
export function tint(hex: string, alpha: number) {
  const h = hex.replace("#", "")
  const r = Number.parseInt(h.substring(0, 2), 16)
  const g = Number.parseInt(h.substring(2, 4), 16)
  const b = Number.parseInt(h.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
