import { Mail, Phone, MapPin, Globe } from "lucide-react"
import { bullets, dateRange, tint, type TemplateProps } from "../template-utils"

export function SidebarTemplate({ data, accent, fontScale }: TemplateProps) {
  const { basics, experience, education, projects, skills, languages, certifications } = data
  const fs = (px: number) => px * fontScale

  return (
    <div
      style={{
        fontFamily: "Geist, Arial, sans-serif",
        color: "#1f2937",
        fontSize: fs(13),
        lineHeight: 1.5,
        display: "flex",
        minHeight: "100%",
      }}
    >
      {/* Sidebar */}
      <aside style={{ width: 250, flexShrink: 0, background: accent, color: "#fff", padding: "36px 26px" }}>
        {basics.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={basics.photo || "/placeholder.svg"}
            alt={basics.fullName}
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid rgba(255,255,255,0.5)",
              marginBottom: 20,
            }}
          />
        )}

        <SideSection title="Contact" fs={fs}>
          {basics.email && <SideContact icon={<Mail size={fs(13)} />} text={basics.email} />}
          {basics.phone && <SideContact icon={<Phone size={fs(13)} />} text={basics.phone} />}
          {basics.location && <SideContact icon={<MapPin size={fs(13)} />} text={basics.location} />}
          {basics.website && <SideContact icon={<Globe size={fs(13)} />} text={basics.website} />}
        </SideSection>

        {skills.length > 0 && (
          <SideSection title="Skills" fs={fs}>
            {skills.map((s) => (
              <div key={s.id} style={{ marginBottom: 9 }}>
                <div style={{ fontSize: fs(12), marginBottom: 4 }}>{s.name}</div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.25)", borderRadius: 4 }}>
                  <div style={{ width: `${(s.level / 5) * 100}%`, height: "100%", background: "#fff", borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </SideSection>
        )}

        {languages.length > 0 && (
          <SideSection title="Languages" fs={fs}>
            {languages.map((l) => (
              <div key={l.id} style={{ fontSize: fs(12), marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{l.name}</span>
                <span style={{ opacity: 0.85 }}> — {l.proficiency}</span>
              </div>
            ))}
          </SideSection>
        )}

        {certifications.length > 0 && (
          <SideSection title="Certifications" fs={fs}>
            {certifications.map((c) => (
              <div key={c.id} style={{ fontSize: fs(12), marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{c.name}</div>
                <div style={{ opacity: 0.85 }}>
                  {c.issuer} {c.date}
                </div>
              </div>
            ))}
          </SideSection>
        )}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, minWidth: 0, padding: "40px 36px" }}>
        <h1 style={{ fontSize: fs(28), fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
          {basics.fullName || "Your Name"}
        </h1>
        {basics.title && (
          <p style={{ fontSize: fs(15), color: accent, margin: "4px 0 0", fontWeight: 500 }}>{basics.title}</p>
        )}

        {basics.summary && (
          <MainSection title="Profile" accent={accent} fs={fs}>
            <p style={{ margin: 0, color: "#374151" }}>{basics.summary}</p>
          </MainSection>
        )}

        {experience.length > 0 && (
          <MainSection title="Experience" accent={accent} fs={fs}>
            {experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 16, position: "relative", paddingLeft: 16 }}>
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 5,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: accent,
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ fontWeight: 600, fontSize: fs(14) }}>{e.role}</span>
                  <span style={{ color: "#6b7280", fontSize: fs(12), whiteSpace: "nowrap" }}>
                    {dateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                <div style={{ color: accent, fontSize: fs(13), fontWeight: 500 }}>
                  {e.company}
                  {e.location ? ` · ${e.location}` : ""}
                </div>
                <ul style={{ margin: "6px 0 0", paddingLeft: 18, color: "#374151" }}>
                  {bullets(e.description).map((b, i) => (
                    <li key={i} style={{ marginBottom: 2 }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </MainSection>
        )}

        {education.length > 0 && (
          <MainSection title="Education" accent={accent} fs={fs}>
            {education.map((e) => (
              <div key={e.id} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 600 }}>{e.institution}</span>
                  <span style={{ color: "#6b7280", fontSize: fs(12) }}>{dateRange(e.startDate, e.endDate, false)}</span>
                </div>
                <div style={{ color: "#374151" }}>
                  {e.degree} {e.field}
                </div>
              </div>
            ))}
          </MainSection>
        )}

        {projects.length > 0 && (
          <MainSection title="Projects" accent={accent} fs={fs}>
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 10 }}>
                <span style={{ fontWeight: 600 }}>{p.name}</span>
                {p.link && <span style={{ color: accent, fontSize: fs(12) }}> · {p.link}</span>}
                <p style={{ margin: "2px 0 0", color: "#374151" }}>{p.description}</p>
              </div>
            ))}
          </MainSection>
        )}
      </main>
    </div>
  )
}

function SideContact({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, wordBreak: "break-word" }}>
      <span style={{ opacity: 0.9, flexShrink: 0 }}>{icon}</span>
      <span>{text}</span>
    </div>
  )
}

function SideSection({ title, fs, children }: { title: string; fs: (n: number) => number; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h2
        style={{
          fontSize: fs(12),
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          margin: "0 0 10px",
          paddingBottom: 6,
          borderBottom: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function MainSection({
  title,
  accent,
  fs,
  children,
}: {
  title: string
  accent: string
  fs: (n: number) => number
  children: React.ReactNode
}) {
  return (
    <section style={{ marginTop: 22 }}>
      <h2
        style={{
          fontSize: fs(13),
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: accent,
          margin: "0 0 10px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {title}
        <span style={{ flex: 1, height: 2, background: tint(accent, 0.2) }} />
      </h2>
      {children}
    </section>
  )
}
