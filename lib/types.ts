export type DocumentType = "resume" | "cv"

export interface ResumeBasics {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
  photo?: string
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  current: boolean
  location: string
  description: string
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  location: string
  description: string
}

export interface ProjectItem {
  id: string
  name: string
  link: string
  description: string
}

export interface SkillItem {
  id: string
  name: string
  level: number // 1-5
}

export interface LanguageItem {
  id: string
  name: string
  proficiency: string
}

export interface CertificationItem {
  id: string
  name: string
  issuer: string
  date: string
}

export interface ResumeData {
  documentType: DocumentType
  basics: ResumeBasics
  experience: ExperienceItem[]
  education: EducationItem[]
  projects: ProjectItem[]
  skills: SkillItem[]
  languages: LanguageItem[]
  certifications: CertificationItem[]
}

export interface ResumeSettings {
  templateId: string
  accent: string
  fontScale: number
}

export const ACCENT_COLORS: { name: string; value: string }[] = [
  { name: "Royal Blue", value: "#2563eb" },
  { name: "Emerald", value: "#059669" },
  { name: "Crimson", value: "#dc2626" },
  { name: "Amber", value: "#d97706" },
  { name: "Teal", value: "#0d9488" },
  { name: "Slate", value: "#334155" },
  { name: "Rose", value: "#e11d48" },
  { name: "Indigo", value: "#4f46e5" },
]
