import { SiteHeader } from "@/components/landing/site-header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { TemplatesShowcase } from "@/components/landing/templates-showcase"
import { HowItWorks } from "@/components/landing/how-it-works"
import { CTA } from "@/components/landing/cta"
import { SiteFooter } from "@/components/landing/site-footer"

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <TemplatesShowcase />
        <HowItWorks />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  )
}
