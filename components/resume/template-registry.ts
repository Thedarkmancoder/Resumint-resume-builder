import type { ComponentType } from "react"
import type { TemplateProps } from "./template-utils"
import { ModernTemplate } from "./templates/modern"
import { ClassicTemplate } from "./templates/classic"
import { MinimalTemplate } from "./templates/minimal"
import { SidebarTemplate } from "./templates/sidebar"
import { ElegantTemplate } from "./templates/elegant"
import { CompactTemplate } from "./templates/compact"

export interface TemplateMeta {
  id: string
  name: string
  description: string
  component: ComponentType<TemplateProps>
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Bold color header with a two-column body. Great all-rounder.",
    component: ModernTemplate,
  },
  {
    id: "sidebar",
    name: "Sidebar",
    description: "Colored sidebar for contact and skills, timeline for experience.",
    component: SidebarTemplate,
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional serif layout. Safe for conservative industries.",
    component: ClassicTemplate,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, spacious, and understated. Lets your content lead.",
    component: MinimalTemplate,
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Centered, refined typography for a premium feel.",
    component: ElegantTemplate,
  },
  {
    id: "compact",
    name: "Compact",
    description: "Dense and efficient. Ideal for longer CVs.",
    component: CompactTemplate,
  },
]

export function getTemplate(id: string): TemplateMeta {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]
}
