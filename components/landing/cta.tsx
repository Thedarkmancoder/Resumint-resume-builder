import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(255,255,255,0.15),transparent)]" />
          <h2 className="relative text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Your next opportunity starts here
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/85">
            Join thousands building better resumes. It is free, private, and takes just a few minutes.
          </p>
          <div className="relative mt-8 flex justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/builder">
                Build my resume now
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
