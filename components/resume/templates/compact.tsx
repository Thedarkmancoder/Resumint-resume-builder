import { bullets, dateRange, tint, type TemplateProps } from "../template-utils"

export function CompactTemplate({ data, accent, fontScale }: TemplateProps) {
  const { basics, experience, education, projects, skills, languages, certifications } = data
  const fs = (px: number) => px * fontScale

  const contacts = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean)

  return (
    <div
      style={{
        fontFamily: "Geist, Arial, sans-serif",
        color: "#222",
        fontSize: fs(12),
        lineHeight: 1.45,
        padding: "34px 40px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: `3px solid ${accent}`,
          paddingBottom: 12,
          marginBottom: 18,
        }}
      >
        <div>
          <h1 style={{ fontSize: fs(24), fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
            {basics.fullName || "Your Name"}
          </h1>
          {basics.title && <p style={{ margin: "2px 0 0", color: accent, fontWeight: 600, fontSize: fs(13) }}>{basics.title}</p>}
        </div>
        <div style={{ textAlign: "right", fontSize: fs(11), color: "#555", lineHeight: 1.6 }}>
          {contacts.map((c, i) => (
            <div key={i}>{c}</div>
          ))}
        </div>
      </header>

      {basics.summary && <p style={{ margin: "0 0 16px", color: "#444" }}>{basics.summary}</p>}

      <div style={{ display: "flex", gap: 28 }}>
        {/* Left main */}
        <div style={{ flex: 2, minWidth: 0 }}>
          {experience.length > 0 && (
            <Section title="Experience" accent={accent} fs={fs}>
              {experience.map((e) => (
                <div key={e.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <span style={{ fontWeight: 700 }}>
                      {e.role} <span style={{ fontWeight: 500, color: accent }}>· {e.company}</span>
                    </span>
                    <span style={{ color: "#777", fontSize: fs(11), whiteSpace: "nowrap" }}>
                      {dateRange(e.startDate, e.endDate, e.current)}
                    </span>
                  </div>
                  <ul style={{ margin: "3px 0 0", paddingLeft: 16, color: "#444" }}>
                    {bullets(e.description).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          {projects.length > 0 && (
            <Section title="Projects" accent={accent} fs={fs}>
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 700 }}>{p.name}</span>
                  {p.link && <span style={{ color: accent, fontSize: fs(11) }}> · {p.link}</span>}
                  <p style={{ margin: "1px 0 0", color: "#444" }}>{p.description}</p>
                </div>
              ))}
            </Section>
          )}

          {education.length > 0 && (
            <Section title="Education" accent={accent} fs={fs}>
              {education.map((e) => (
                <div key={e.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700 }}>{e.institution}</span>
                    <span style={{ color: "#777", fontSize: fs(11) }}>{dateRange(e.startDate, e.endDate, false)}</span>
                  </div>
                  <div style={{ color: "#555" }}>
                    {e.degree} {e.field}
                  </div>
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Right rail */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {skills.length > 0 && (
            <Section title="Skills" accent={accent} fs={fs}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {skills.map((s) => (
                  <span
                    key={s.id}
                    style={{
                      fontSize: fs(11),
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: tint(accent, 0.12),
                      color: "#333",
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {languages.length > 0 && (
            <Section title="Languages" accent={accent} fs={fs}>
              {languages.map((l) => (
                <div key={l.id} style={{ marginBottom: 3 }}>
                  <span style={{ fontWeight: 600 }}>{l.name}</span>
                  <span style={{ color: "#777" }}> · {l.proficiency}</span>
                </div>
              ))}
            </Section>
          )}

          {certifications.length > 0 && (
            <Section title="Certifications" accent={accent} fs={fs}>
              {certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: 6 }}>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  <div style={{ color: "#777" }}>
                    {c.issuer} {c.date}
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
    <section style={{ marginBottom: 16 }}>
      <h2
        style={{
          fontSize: fs(11),
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: accent,
          margin: "0 0 7px",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
