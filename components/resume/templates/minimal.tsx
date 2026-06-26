import { bullets, dateRange, type TemplateProps } from "../template-utils"

export function MinimalTemplate({ data, accent, fontScale }: TemplateProps) {
  const { basics, experience, education, projects, skills, languages, certifications } = data
  const fs = (px: number) => px * fontScale

  const contacts = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean)

  return (
    <div
      style={{
        fontFamily: "Geist, Arial, sans-serif",
        color: "#27272a",
        fontSize: fs(13),
        lineHeight: 1.6,
        padding: "56px 60px",
      }}
    >
      <header style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: fs(26), fontWeight: 600, letterSpacing: "-0.01em", margin: 0 }}>
          {basics.fullName || "Your Name"}
        </h1>
        {basics.title && (
          <p style={{ fontSize: fs(14), margin: "4px 0 0", color: "#71717a" }}>{basics.title}</p>
        )}
        <div style={{ fontSize: fs(12), marginTop: 12, color: "#52525b" }}>{contacts.join("   /   ")}</div>
      </header>

      {basics.summary && <p style={{ margin: "0 0 32px", color: "#3f3f46" }}>{basics.summary}</p>}

      {experience.length > 0 && (
        <Section title="Experience" accent={accent} fs={fs}>
          {experience.map((e) => (
            <Row key={e.id} fs={fs} meta={dateRange(e.startDate, e.endDate, e.current)}>
              <div style={{ fontWeight: 600 }}>
                {e.role} <span style={{ color: accent }}>· {e.company}</span>
              </div>
              <ul style={{ margin: "4px 0 0", paddingLeft: 16, color: "#52525b" }}>
                {bullets(e.description).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Row>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects" accent={accent} fs={fs}>
          {projects.map((p) => (
            <Row key={p.id} fs={fs} meta={p.link}>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <p style={{ margin: "2px 0 0", color: "#52525b" }}>{p.description}</p>
            </Row>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education" accent={accent} fs={fs}>
          {education.map((e) => (
            <Row key={e.id} fs={fs} meta={dateRange(e.startDate, e.endDate, false)}>
              <div style={{ fontWeight: 600 }}>{e.institution}</div>
              <div style={{ color: "#52525b" }}>
                {e.degree} {e.field}
              </div>
            </Row>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills" accent={accent} fs={fs}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map((s) => (
              <span
                key={s.id}
                style={{
                  fontSize: fs(12),
                  padding: "3px 10px",
                  border: "1px solid #e4e4e7",
                  borderRadius: 999,
                  color: "#3f3f46",
                }}
              >
                {s.name}
              </span>
            ))}
          </div>
        </Section>
      )}

      <div style={{ display: "flex", gap: 48 }}>
        {languages.length > 0 && (
          <div style={{ flex: 1 }}>
            <Section title="Languages" accent={accent} fs={fs}>
              {languages.map((l) => (
                <div key={l.id} style={{ color: "#52525b", fontSize: fs(12) }}>
                  {l.name} — {l.proficiency}
                </div>
              ))}
            </Section>
          </div>
        )}
        {certifications.length > 0 && (
          <div style={{ flex: 1 }}>
            <Section title="Certifications" accent={accent} fs={fs}>
              {certifications.map((c) => (
                <div key={c.id} style={{ color: "#52525b", fontSize: fs(12) }}>
                  {c.name} {c.date ? `(${c.date})` : ""}
                </div>
              ))}
            </Section>
          </div>
        )}
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
    <section style={{ marginBottom: 28 }}>
      <h2
        style={{
          fontSize: fs(11),
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: accent,
          margin: "0 0 12px",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function Row({
  meta,
  fs,
  children,
}: {
  meta: string
  fs: (n: number) => number
  children: React.ReactNode
}) {
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
      <div style={{ width: 90, flexShrink: 0, color: "#a1a1aa", fontSize: fs(11), paddingTop: 2 }}>
        {meta}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  )
}
