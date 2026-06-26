"use client"

import { useEffect, useRef, useState } from "react"
import type { ResumeData, ResumeSettings } from "@/lib/types"
import { A4_WIDTH, A4_HEIGHT, ResumeSheet } from "@/components/resume/resume-sheet"

interface PreviewPaneProps {
  data: ResumeData
  settings: ResumeSettings
  sheetRef: React.RefObject<HTMLDivElement | null>
}

export function PreviewPane({ data, settings, sheetRef }: PreviewPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.7)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const compute = () => {
      // padding of 32px each side
      const available = el.clientWidth - 48
      const next = Math.min(1, Math.max(0.3, available / A4_WIDTH))
      setScale(next)
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="flex w-full justify-center overflow-auto p-6">
      <div
        style={{
          width: A4_WIDTH * scale,
          height: A4_HEIGHT * scale,
        }}
      >
        <div
          style={{
            width: A4_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="rounded-md shadow-xl ring-1 ring-black/5"
        >
          <ResumeSheet ref={sheetRef} data={data} settings={settings} />
        </div>
      </div>
    </div>
  )
}
