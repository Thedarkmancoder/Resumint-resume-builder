"use client"

import type { Dispatch, SetStateAction } from "react"
import { Plus, Trash2, GripVertical } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  ProjectItem,
  ResumeData,
  SkillItem,
} from "@/lib/types"
import { uid } from "@/lib/sample-data"
import { AreaField, Field, FieldRow } from "./fields"

interface EditorPanelProps {
  data: ResumeData
  setData: Dispatch<SetStateAction<ResumeData>>
}

export function EditorPanel({ data, setData }: EditorPanelProps) {
  const setBasics = (field: keyof ResumeData["basics"], value: string) =>
    setData((d) => ({ ...d, basics: { ...d.basics, [field]: value } }))

  // generic list helpers
  function addItem<K extends keyof ResumeData>(key: K, item: ResumeData[K] extends Array<infer T> ? T : never) {
    setData((d) => ({ ...d, [key]: [...(d[key] as unknown[]), item] }) as ResumeData)
  }
  function updateItem<K extends keyof ResumeData>(key: K, id: string, patch: Record<string, unknown>) {
    setData(
      (d) =>
        ({
          ...d,
          [key]: (d[key] as { id: string }[]).map((it) => (it.id === id ? { ...it, ...patch } : it)),
        }) as ResumeData,
    )
  }
  function removeItem<K extends keyof ResumeData>(key: K, id: string) {
    setData((d) => ({ ...d, [key]: (d[key] as { id: string }[]).filter((it) => it.id !== id) }) as ResumeData)
  }

  return (
    <Accordion type="multiple" defaultValue={["basics", "experience"]} className="w-full">
      {/* BASICS */}
      <Section value="basics" title="Personal Details">
        <div className="grid gap-3">
          <FieldRow>
            <Field label="Full name" value={data.basics.fullName} onChange={(v) => setBasics("fullName", v)} placeholder="Jane Doe" />
            <Field label="Job title" value={data.basics.title} onChange={(v) => setBasics("title", v)} placeholder="Marketing Manager" />
          </FieldRow>
          <FieldRow>
            <Field label="Email" type="email" value={data.basics.email} onChange={(v) => setBasics("email", v)} placeholder="jane@email.com" />
            <Field label="Phone" value={data.basics.phone} onChange={(v) => setBasics("phone", v)} placeholder="+1 555 000 0000" />
          </FieldRow>
          <FieldRow>
            <Field label="Location" value={data.basics.location} onChange={(v) => setBasics("location", v)} placeholder="New York, NY" />
            <Field label="Website" value={data.basics.website} onChange={(v) => setBasics("website", v)} placeholder="janedoe.com" />
          </FieldRow>
          <AreaField
            label="Professional summary"
            value={data.basics.summary}
            onChange={(v) => setBasics("summary", v)}
            placeholder="A short paragraph about who you are and what you do best."
            rows={4}
          />
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section value="experience" title="Work Experience">
        <div className="grid gap-4">
          {data.experience.map((e: ExperienceItem) => (
            <ItemCard key={e.id} onRemove={() => removeItem("experience", e.id)}>
              <FieldRow>
                <Field label="Job title" value={e.role} onChange={(v) => updateItem("experience", e.id, { role: v })} />
                <Field label="Company" value={e.company} onChange={(v) => updateItem("experience", e.id, { company: v })} />
              </FieldRow>
              <FieldRow>
                <Field label="Start" value={e.startDate} onChange={(v) => updateItem("experience", e.id, { startDate: v })} placeholder="2021" />
                <Field
                  label="End"
                  value={e.endDate}
                  onChange={(v) => updateItem("experience", e.id, { endDate: v })}
                  placeholder="2024"
                />
              </FieldRow>
              <div className="flex items-center justify-between">
                <Field label="Location" value={e.location} onChange={(v) => updateItem("experience", e.id, { location: v })} className="flex-1" />
                <div className="ml-4 flex items-center gap-2 pt-5">
                  <Switch checked={e.current} onCheckedChange={(c) => updateItem("experience", e.id, { current: c })} id={`cur-${e.id}`} />
                  <Label htmlFor={`cur-${e.id}`} className="text-xs text-muted-foreground">
                    Current
                  </Label>
                </div>
              </div>
              <AreaField
                label="Description"
                value={e.description}
                onChange={(v) => updateItem("experience", e.id, { description: v })}
                hint="One achievement per line — each line becomes a bullet."
                rows={4}
              />
            </ItemCard>
          ))}
          <AddButton
            label="Add experience"
            onClick={() =>
              addItem<"experience">("experience", {
                id: uid(),
                company: "",
                role: "",
                startDate: "",
                endDate: "",
                current: false,
                location: "",
                description: "",
              } as ExperienceItem)
            }
          />
        </div>
      </Section>

      {/* EDUCATION */}
      <Section value="education" title="Education">
        <div className="grid gap-4">
          {data.education.map((e: EducationItem) => (
            <ItemCard key={e.id} onRemove={() => removeItem("education", e.id)}>
              <Field label="Institution" value={e.institution} onChange={(v) => updateItem("education", e.id, { institution: v })} />
              <FieldRow>
                <Field label="Degree" value={e.degree} onChange={(v) => updateItem("education", e.id, { degree: v })} placeholder="B.Sc." />
                <Field label="Field of study" value={e.field} onChange={(v) => updateItem("education", e.id, { field: v })} placeholder="Computer Science" />
              </FieldRow>
              <FieldRow>
                <Field label="Start" value={e.startDate} onChange={(v) => updateItem("education", e.id, { startDate: v })} placeholder="2016" />
                <Field label="End" value={e.endDate} onChange={(v) => updateItem("education", e.id, { endDate: v })} placeholder="2020" />
              </FieldRow>
              <AreaField label="Notes" value={e.description} onChange={(v) => updateItem("education", e.id, { description: v })} rows={2} />
            </ItemCard>
          ))}
          <AddButton
            label="Add education"
            onClick={() =>
              addItem<"education">("education", {
                id: uid(),
                institution: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                location: "",
                description: "",
              } as EducationItem)
            }
          />
        </div>
      </Section>

      {/* SKILLS */}
      <Section value="skills" title="Skills">
        <div className="grid gap-3">
          {data.skills.map((s: SkillItem) => (
            <div key={s.id} className="flex items-center gap-3">
              <Field label="" value={s.name} onChange={(v) => updateItem("skills", s.id, { name: v })} placeholder="Skill name" className="flex-1" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`Set level ${n}`}
                    onClick={() => updateItem("skills", s.id, { level: n })}
                    className={`h-2.5 w-5 rounded-full transition-colors ${n <= s.level ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeItem("skills", s.id)} aria-label="Remove skill">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
          <AddButton label="Add skill" onClick={() => addItem<"skills">("skills", { id: uid(), name: "", level: 3 } as SkillItem)} />
        </div>
      </Section>

      {/* PROJECTS */}
      <Section value="projects" title="Projects">
        <div className="grid gap-4">
          {data.projects.map((p: ProjectItem) => (
            <ItemCard key={p.id} onRemove={() => removeItem("projects", p.id)}>
              <FieldRow>
                <Field label="Name" value={p.name} onChange={(v) => updateItem("projects", p.id, { name: v })} />
                <Field label="Link" value={p.link} onChange={(v) => updateItem("projects", p.id, { link: v })} placeholder="github.com/..." />
              </FieldRow>
              <AreaField label="Description" value={p.description} onChange={(v) => updateItem("projects", p.id, { description: v })} rows={2} />
            </ItemCard>
          ))}
          <AddButton label="Add project" onClick={() => addItem<"projects">("projects", { id: uid(), name: "", link: "", description: "" } as ProjectItem)} />
        </div>
      </Section>

      {/* LANGUAGES */}
      <Section value="languages" title="Languages">
        <div className="grid gap-3">
          {data.languages.map((l: LanguageItem) => (
            <FieldRow key={l.id}>
              <Field label="Language" value={l.name} onChange={(v) => updateItem("languages", l.id, { name: v })} />
              <div className="flex items-end gap-2">
                <Field label="Proficiency" value={l.proficiency} onChange={(v) => updateItem("languages", l.id, { proficiency: v })} placeholder="Fluent" className="flex-1" />
                <Button variant="ghost" size="icon" onClick={() => removeItem("languages", l.id)} aria-label="Remove language">
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </FieldRow>
          ))}
          <AddButton label="Add language" onClick={() => addItem<"languages">("languages", { id: uid(), name: "", proficiency: "" } as LanguageItem)} />
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section value="certifications" title="Certifications">
        <div className="grid gap-4">
          {data.certifications.map((c: CertificationItem) => (
            <ItemCard key={c.id} onRemove={() => removeItem("certifications", c.id)}>
              <Field label="Name" value={c.name} onChange={(v) => updateItem("certifications", c.id, { name: v })} />
              <FieldRow>
                <Field label="Issuer" value={c.issuer} onChange={(v) => updateItem("certifications", c.id, { issuer: v })} />
                <Field label="Date" value={c.date} onChange={(v) => updateItem("certifications", c.id, { date: v })} placeholder="2023" />
              </FieldRow>
            </ItemCard>
          ))}
          <AddButton
            label="Add certification"
            onClick={() => addItem<"certifications">("certifications", { id: uid(), name: "", issuer: "", date: "" } as CertificationItem)}
          />
        </div>
      </Section>
    </Accordion>
  )
}

function Section({ value, title, children }: { value: string; title: string; children: React.ReactNode }) {
  return (
    <AccordionItem value={value} className="border-b">
      <AccordionTrigger className="text-sm font-semibold hover:no-underline">{title}</AccordionTrigger>
      <AccordionContent className="pb-5">{children}</AccordionContent>
    </AccordionItem>
  )
}

function ItemCard({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <div className="relative rounded-lg border bg-muted/30 p-4">
      <div className="absolute right-2 top-2 flex items-center gap-1">
        <GripVertical className="h-4 w-4 text-muted-foreground/40" />
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onRemove} aria-label="Remove item">
          <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </div>
      <div className="grid gap-3">{children}</div>
    </div>
  )
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button variant="outline" onClick={onClick} className="w-full border-dashed bg-transparent">
      <Plus className="mr-1 h-4 w-4" />
      {label}
    </Button>
  )
}
