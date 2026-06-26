import { Mail, Phone, MapPin, Globe } from "lucide-react"
import { bullets, dateRange, tint, type TemplateProps } from "../template-utils"

export function ModernTemplate({ data, accent, fontScale }: TemplateProps) {
  const { basics, experience, education, projects, skills, languages, certifications } = data
  const fs = (px: number) => px * fontScale

  return (
    <div
      style={{
        fontFamily: "Geist, Arial, sans-serif",
        color: "#1f2937",
        fontSize: fs(13),
        lineHeight: 1.5,
      }}
    >
      {/* Header band */}
      <div style={{ background: accent, color: "#fff", padding: "36px 40px" }}>
        <h1 style={{ fontSize: fs(30), fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
          {basics.fullName || "Your Name"}
        </h1>
        {basics.title && (
          <p style={{ fontSize: fs(15), margin: "6px 0 0", opacity: 0.9 }}>{basics.title}</p>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 18px",
            marginTop: 16,
            fontSize: fs(12),
            opacity: 0.95,
          }}
        >
          {basics.email && <Contact icon={<Mail size={fs(13)} />} text={basics.email} />}
          {basics.phone && <Contact icon={<Phone size={fs(13)} />} text={basics.phone} />}
          {basics.location && <Contact icon={<MapPin size={fs(13)} />} text={basics.location} />}
          {basics.website && <Contact icon={<Globe size={fs(13)} />} text={basics.website} />}
        </div>
      </div>

      <div style={{ padding: "32px 40px", display: "flex", gap: 32 }}>
        {/* Main column */}
        <div style={{ flex: 2, minWidth: 0 }}>
          {basics.summary && (
            <Section title="Profile" accent={accent} fs={fs}>
              <p style={{ margin: 0 }}>{basics.summary}</p>
            </Section>
          )}

          {experience.length > 0 && (
            <Section title="Experience" accent={accent} fs={fs}>
              {experience.map((e) => (
                <div key={e.id} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ fontWeight: 600, fontSize: fs(14) }}>{e.role}</span>
                    <span style={{ color: "#6b7280", fontSize: fs(12), whiteSpace: "nowrap" }}>
                      {dateRange(e.startDate, e.endDate, e.current)}
                    </span>
                  </div>
                  <div style={{ color: accent, fontWeight: 500, fontSize: fs(13) }}>
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
            </Section>
          )}

          {projects.length > 0 && (
            <Section title="Projects" accent={accent} fs={fs}>
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 600 }}>
                    {p.name}
                    {p.link && (
                      <span style={{ color: accent, fontWeight: 400, fontSize: fs(12) }}>
                        {"  "}
                        {p.link}
                      </span>
                    )}
                  </div>
                  <p style={{ margin: "2px 0 0", color: "#374151" }}>{p.description}</p>
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Side column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {skills.length > 0 && (
            <Section title="Skills" accent={accent} fs={fs}>
              {skills.map((s) => (
                <div key={s.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: fs(12), marginBottom: 4 }}>{s.name}</div>
                  <div style={{ height: 5, background: tint(accent, 0.16), borderRadius: 4 }}>
                    <div
                      style={{
                        width: `${(s.level / 5) * 100}%`,
                        height: "100%",
                        background: accent,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </Section>
          )}

          {education.length > 0 && (
            <Section title="Education" accent={accent} fs={fs}>
              {education.map((e) => (
                <div key={e.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: fs(13) }}>
                    {e.degree} {e.field}
                  </div>
                  <div style={{ fontSize: fs(12) }}>{e.institution}</div>
                  <div style={{ color: "#6b7280", fontSize: fs(11) }}>
                    {dateRange(e.startDate, e.endDate, false)}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {languages.length > 0 && (
            <Section title="Languages" accent={accent} fs={fs}>
              {languages.map((l) => (
                <div
                  key={l.id}
                  style={{ display: "flex", justifyContent: "space-between", fontSize: fs(12), marginBottom: 4 }}
                >
                  <span>{l.name}</span>
                  <span style={{ color: "#6b7280" }}>{l.proficiency}</span>
                </div>
              ))}
            </Section>
          )}

          {certifications.length > 0 && (
            <Section title="Certifications" accent={accent} fs={fs}>
              {certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: 8, fontSize: fs(12) }}>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  <div style={{ color: "#6b7280" }}>
                    {c.issuer}
                    {c.date ? ` · ${c.date}` : ""}
                  </div>
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

function Contact({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      {icon}
      {text}
    </span>
  )
}

function Section({
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
    <section style={{ marginBottom: 22 }}>
      <h2
        style={{
          fontSize: fs(13),
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: accent,
          margin: "0 0 10px",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
