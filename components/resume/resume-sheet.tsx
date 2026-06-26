"use client"

import { forwardRef } from "react"
import type { ResumeData, ResumeSettings } from "@/lib/types"
import { getTemplate } from "./template-registry"

interface ResumeSheetProps {
  data: ResumeData
  settings: ResumeSettings
}

// A4 at ~96dpi: 794 x 1123 px
export const A4_WIDTH = 794
export const A4_HEIGHT = 1123

export const ResumeSheet = forwardRef<HTMLDivElement, ResumeSheetProps>(function ResumeSheet(
  { data, settings },
  ref,
) {
  const Template = getTemplate(settings.templateId).component

  return (
    <div
      id="resume-sheet"
      ref={ref}
      style={{
        width: A4_WIDTH,
        minHeight: A4_HEIGHT,
        background: "#ffffff",
        color: "#1f2937",
        overflow: "hidden",
      }}
    >
      <Template data={data} accent={settings.accent} fontScale={settings.fontScale} />
    </div>
  )
})
