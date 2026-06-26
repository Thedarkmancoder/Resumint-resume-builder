import Link from "next/link"
import { FileText } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-3.5 w-3.5" />
          </span>
          <span className="font-bold">ResuMint</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Built for job seekers. Your data stays in your browser.
        </p>
        <Link href="/builder" className="text-sm font-medium text-primary hover:underline">
          Start building
        </Link>
      </div>
    </footer>
  )
}
