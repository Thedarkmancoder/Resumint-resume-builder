import type { ResumeData } from "@/lib/types"
import { A4_WIDTH, A4_HEIGHT } from "@/components/resume/resume-sheet"
import { getTemplate } from "@/components/resume/template-registry"

interface StaticSheetProps {
  data: ResumeData
  templateId: string
  accent: string
  scale: number
}

/** A non-interactive, scaled render of a resume template — used for marketing previews. */
export function StaticSheet({ data, templateId, accent, scale }: StaticSheetProps) {
  const Template = getTemplate(templateId).component
  return (
    <div
      style={{ width: A4_WIDTH * scale, height: A4_HEIGHT * scale }}
      className="overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/10"
    >
      <div style={{ width: A4_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <div style={{ width: A4_WIDTH, minHeight: A4_HEIGHT, background: "#fff" }}>
          <Template data={data} accent={accent} fontScale={1} />
        </div>
      </div>
    </div>
  )
}
