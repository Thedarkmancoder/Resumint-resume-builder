"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { ArrowLeft, Download, FileText, Loader2, Printer, RotateCcw, Sparkles, FileText as FileIcon, Pencil, Eye } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { defaultSettings, emptyResume, sampleResume } from "@/lib/sample-data"
import type { DocumentType, ResumeData, ResumeSettings } from "@/lib/types"
import { exportElementToPdf } from "@/lib/export-pdf"
import { cn } from "@/lib/utils"
import { EditorPanel } from "./editor-panel"
import { DesignPanel } from "./design-panel"
import { PreviewPane } from "./preview-pane"

export function BuilderShell() {
  const { value: data, setValue: setData, hydrated } = useLocalStorage<ResumeData>("rb:data", sampleResume)
  const { value: settings, setValue: setSettings } = useLocalStorage<ResumeSettings>("rb:settings", defaultSettings)
  const sheetRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState(false)
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit")

  const docType = data.documentType
  const setDocType = (t: DocumentType) => setData((d) => ({ ...d, documentType: t }))

  const fileName = `${(data.basics.fullName || "resume").replace(/\s+/g, "_")}_${docType}`

  async function handleDownload() {
    if (!sheetRef.current) return
    setExporting(true)
    try {
      await exportElementToPdf(sheetRef.current, fileName)
      toast.success("PDF downloaded")
    } catch (err) {
      console.log("[v0] PDF export error:", err)
      toast.error("Could not generate PDF. Try the Print option instead.")
    } finally {
      setExporting(false)
    }
  }

  function handleReset() {
    setData({ ...emptyResume, documentType: docType })
    toast.success("Cleared all fields")
  }

  function handleSample() {
    setData({ ...sampleResume, documentType: docType })
    toast.success("Loaded sample content")
  }

  if (!hydrated) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex h-dvh flex-col bg-muted/40">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background px-3 sm:px-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">ResuMint</span>
          </Link>
          <div className="hidden items-center rounded-full border bg-muted p-0.5 text-xs font-medium sm:flex">
            {(["resume", "cv"] as DocumentType[]).map((t) => (
              <button
                key={t}
                onClick={() => setDocType(t)}
                className={cn(
                  "rounded-full px-3 py-1 capitalize transition-colors",
                  docType === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
                )}
              >
                {t === "cv" ? "CV" : "Resume"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleSample} className="hidden md:inline-flex">
            <Sparkles className="mr-1 h-4 w-4" />
            Sample
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReset} className="hidden md:inline-flex">
            <RotateCcw className="mr-1 h-4 w-4" />
            Clear
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()} className="hidden sm:inline-flex">
            <Printer className="mr-1 h-4 w-4" />
            Print
          </Button>
          <Button size="sm" onClick={handleDownload} disabled={exporting}>
            {exporting ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Download className="mr-1 h-4 w-4" />}
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>
      </header>

      {/* Mobile view toggle */}
      <div className="flex shrink-0 items-center gap-1 border-b bg-background p-2 lg:hidden">
        <Button variant={mobileView === "edit" ? "default" : "ghost"} size="sm" className="flex-1" onClick={() => setMobileView("edit")}>
          <Pencil className="mr-1 h-4 w-4" /> Edit
        </Button>
        <Button variant={mobileView === "preview" ? "default" : "ghost"} size="sm" className="flex-1" onClick={() => setMobileView("preview")}>
          <Eye className="mr-1 h-4 w-4" /> Preview
        </Button>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {/* Editor */}
        <div
          className={cn(
            "flex w-full flex-col border-r bg-background lg:w-[440px] xl:w-[480px]",
            mobileView === "edit" ? "flex" : "hidden lg:flex",
          )}
        >
          <Tabs defaultValue="content" className="flex min-h-0 flex-1 flex-col">
            <div className="shrink-0 border-b px-4 pt-3">
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">
                  <FileIcon className="mr-1 h-4 w-4" /> Content
                </TabsTrigger>
                <TabsTrigger value="design" className="flex-1">
                  <FileText className="mr-1 h-4 w-4" /> Design
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <TabsContent value="content" className="mt-0">
                <EditorPanel data={data} setData={setData} />
              </TabsContent>
              <TabsContent value="design" className="mt-0">
                <DesignPanel settings={settings} setSettings={setSettings} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Preview */}
        <div className={cn("min-h-0 flex-1 bg-muted/40", mobileView === "preview" ? "block" : "hidden lg:block")}>
          <PreviewPane data={data} settings={settings} sheetRef={sheetRef} />
        </div>
      </div>
    </div>
  )
}
