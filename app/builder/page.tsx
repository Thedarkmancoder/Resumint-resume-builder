import type { Metadata } from "next"
import { BuilderShell } from "@/components/builder/builder-shell"

export const metadata: Metadata = {
  title: "Builder · ResuMint",
  description: "Edit your resume and download it as a PDF.",
}

export default function BuilderPage() {
  return <BuilderShell />
}
