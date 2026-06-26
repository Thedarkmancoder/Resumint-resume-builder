import type { ResumeData, ResumeSettings } from "./types"

export function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export const sampleResume: ResumeData = {
  documentType: "resume",
  basics: {
    fullName: "Alex Morgan",
    title: "Senior Product Designer",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexmorgan.design",
    summary:
      "Product designer with 8+ years of experience crafting intuitive digital products for fast-growing startups and enterprise teams. Passionate about systems thinking, accessibility, and turning complex problems into elegant, usable interfaces.",
    photo: "",
  },
  experience: [
    {
      id: uid(),
      company: "Northwind Labs",
      role: "Senior Product Designer",
      startDate: "2021",
      endDate: "",
      current: true,
      location: "San Francisco, CA",
      description:
        "Lead designer for the core analytics platform used by 40k+ teams.\nBuilt and maintained the company-wide design system, cutting design-to-dev handoff time by 35%.\nMentored 4 junior designers and ran weekly critique sessions.",
    },
    {
      id: uid(),
      company: "Bright Studio",
      role: "Product Designer",
      startDate: "2018",
      endDate: "2021",
      current: false,
      location: "Remote",
      description:
        "Designed end-to-end flows for fintech and healthcare clients.\nIncreased onboarding completion by 28% through iterative usability testing.\nPartnered with engineering to ship a component library in React.",
    },
  ],
  education: [
    {
      id: uid(),
      institution: "University of California, Berkeley",
      degree: "B.A.",
      field: "Cognitive Science",
      startDate: "2012",
      endDate: "2016",
      location: "Berkeley, CA",
      description: "Graduated with honors. Focus on human-computer interaction.",
    },
  ],
  projects: [
    {
      id: uid(),
      name: "Open Design Kit",
      link: "github.com/alexm/odk",
      description: "An open-source Figma-to-code toolkit with 3k+ stars.",
    },
  ],
  skills: [
    { id: uid(), name: "Product Design", level: 5 },
    { id: uid(), name: "Design Systems", level: 5 },
    { id: uid(), name: "Prototyping", level: 4 },
    { id: uid(), name: "User Research", level: 4 },
    { id: uid(), name: "Figma", level: 5 },
    { id: uid(), name: "HTML & CSS", level: 4 },
  ],
  languages: [
    { id: uid(), name: "English", proficiency: "Native" },
    { id: uid(), name: "Spanish", proficiency: "Professional" },
  ],
  certifications: [
    {
      id: uid(),
      name: "Certified Usability Analyst",
      issuer: "HFI",
      date: "2020",
    },
  ],
}

export const emptyResume: ResumeData = {
  documentType: "resume",
  basics: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
    photo: "",
  },
  experience: [],
  education: [],
  projects: [],
  skills: [],
  languages: [],
  certifications: [],
}

export const defaultSettings: ResumeSettings = {
  templateId: "modern",
  accent: "#2563eb",
  fontScale: 1,
}
