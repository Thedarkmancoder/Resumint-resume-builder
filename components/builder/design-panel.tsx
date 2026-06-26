"use client"

import type { Dispatch, SetStateAction } from "react"
import { Check } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ACCENT_COLORS, type ResumeSettings } from "@/lib/types"
import { TEMPLATES } from "@/components/resume/template-registry"
import { cn } from "@/lib/utils"

interface DesignPanelProps {
  settings: ResumeSettings
  setSettings: Dispatch<SetStateAction<ResumeSettings>>
}

export function DesignPanel({ settings, setSettings }: DesignPanelProps) {
  return (
    <div className="grid gap-7 p-1">
      <div className="grid gap-3">
        <Label className="text-sm font-semibold">Template</Label>
        <div className="grid grid-cols-2 gap-3">
          {TEMPLATES.map((t) => {
            const active = t.id === settings.templateId
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSettings((s) => ({ ...s, templateId: t.id }))}
                className={cn(
                  "group rounded-lg border-2 p-3 text-left transition-colors",
                  active ? "border-primary bg-primary/5" : "border-border hover:border-primary/40",
                )}
              >
                <TemplateThumb id={t.id} accent={settings.accent} active={active} />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-medium">{t.name}</span>
                  {active && <Check className="h-4 w-4 text-primary" />}
                </div>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{t.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-3">
        <Label className="text-sm font-semibold">Accent color</Label>
        <div className="flex flex-wrap gap-2.5">
          {ACCENT_COLORS.map((c) => {
            const active = c.value === settings.accent
            return (
              <button
                key={c.value}
                type="button"
                title={c.name}
                aria-label={c.name}
                onClick={() => setSettings((s) => ({ ...s, accent: c.value }))}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full ring-offset-2 transition-all",
                  active ? "ring-2 ring-foreground" : "hover:scale-110",
                )}
                style={{ backgroundColor: c.value }}
              >
                {active && <Check className="h-4 w-4 text-white" />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Font size</Label>
          <span className="text-xs text-muted-foreground">{Math.round(settings.fontScale * 100)}%</span>
        </div>
        <Slider
          min={0.85}
          max={1.2}
          step={0.05}
          value={[settings.fontScale]}
          onValueChange={([v]) => setSettings((s) => ({ ...s, fontScale: v }))}
        />
      </div>
    </div>
  )
}

function TemplateThumb({ id, accent, active }: { id: string; accent: string; active: boolean }) {
  // Lightweight schematic preview of each template layout
  const bar = (w: string, c = "#d4d4d8") => <div style={{ height: 3, width: w, background: c, borderRadius: 2 }} />
  return (
    <div
      className={cn("aspect-[3/4] overflow-hidden rounded bg-white ring-1", active ? "ring-primary/30" : "ring-black/10")}
    >
      {id === "modern" && (
        <div className="flex h-full flex-col">
          <div style={{ background: accent, height: "28%", padding: 6 }}>
            <div style={{ height: 4, width: "60%", background: "rgba(255,255,255,0.9)", borderRadius: 2 }} />
            <div style={{ height: 3, width: "40%", background: "rgba(255,255,255,0.6)", borderRadius: 2, marginTop: 4 }} />
          </div>
          <div className="flex flex-1 gap-1.5 p-1.5">
            <div className="flex flex-1 flex-col gap-1">{bar("90%")}{bar("80%")}{bar("85%")}</div>
            <div className="flex w-1/3 flex-col gap-1">{bar("100%", accent)}{bar("70%")}</div>
          </div>
        </div>
      )}
      {id === "sidebar" && (
        <div className="flex h-full">
          <div style={{ background: accent, width: "38%", padding: 5 }}>
            <div style={{ height: 12, width: 12, borderRadius: "50%", background: "rgba(255,255,255,0.8)" }} />
            <div className="mt-2 flex flex-col gap-1">{bar("90%", "rgba(255,255,255,0.7)")}{bar("70%", "rgba(255,255,255,0.7)")}</div>
          </div>
          <div className="flex flex-1 flex-col gap-1 p-1.5">{bar("80%", accent)}{bar("90%")}{bar("85%")}{bar("88%")}</div>
        </div>
      )}
      {id === "classic" && (
        <div className="flex h-full flex-col items-center gap-1 p-2">
          <div style={{ height: 4, width: "55%", background: "#3f3f46", borderRadius: 2 }} />
          <div style={{ height: 1, width: "100%", background: accent }} />
          <div className="mt-1 flex w-full flex-col gap-1">{bar("100%")}{bar("90%")}{bar("95%")}{bar("85%")}</div>
        </div>
      )}
      {id === "minimal" && (
        <div className="flex h-full flex-col gap-2 p-2.5">
          <div style={{ height: 4, width: "45%", background: "#3f3f46", borderRadius: 2 }} />
          <div className="mt-2 flex flex-col gap-1.5">{bar("85%")}{bar("70%")}{bar("80%")}</div>
        </div>
      )}
      {id === "elegant" && (
        <div className="flex h-full flex-col items-center gap-1.5 p-2">
          <div style={{ height: 4, width: "60%", background: accent, borderRadius: 2 }} />
          <div style={{ height: 2, width: "30%", background: "#d4d4d8", borderRadius: 2 }} />
          <div className="mt-2 flex w-full flex-col items-center gap-1">{bar("70%")}{bar("60%")}{bar("65%")}</div>
        </div>
      )}
      {id === "compact" && (
        <div className="flex h-full flex-col p-1.5">
          <div style={{ height: 3, width: "50%", background: "#3f3f46", borderRadius: 2, borderBottom: `2px solid ${accent}`, paddingBottom: 3 }} />
          <div className="mt-1.5 flex flex-1 gap-1.5">
            <div className="flex flex-1 flex-col gap-1">{bar("95%")}{bar("90%")}{bar("85%")}{bar("80%")}</div>
            <div className="flex w-1/3 flex-col gap-1">{bar("100%", accent)}{bar("80%", accent)}</div>
          </div>
        </div>
      )}
    </div>
  )
}
