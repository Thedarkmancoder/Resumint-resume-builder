import { bullets, dateRange, type TemplateProps } from "../template-utils"

export function ClassicTemplate({ data, accent, fontScale }: TemplateProps) {
  const { basics, experience, education, projects, skills, languages, certifications } = data
  const fs = (px: number) => px * fontScale

  const contacts = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean)

  return (
    <div
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: "#1a1a1a",
        fontSize: fs(13),
        lineHeight: 1.5,
        padding: "48px 56px",
      }}
    >
      {/* Centered header */}
      <header style={{ textAlign: "center", paddingBottom: 16, borderBottom: `2px solid ${accent}` }}>
        <h1 style={{ fontSize: fs(28), fontWeight: 700, letterSpacing: "0.04em", margin: 0 }}>
          {basics.fullName || "Your Name"}
        </h1>
        {basics.title && (
          <p style={{ fontSize: fs(14), margin: "6px 0 0", color: accent, fontStyle: "italic" }}>
            {basics.title}
          </p>
        )}
        <div style={{ fontSize: fs(12), marginTop: 10, color: "#444" , display : "flex", flexWrap: "wrap", justifyContent: "center", gap :6,}}>{contacts.map((c, i) =>(
          <span key={i}>
            {c}
            {i !== contacts.length - 1 && " . "}
          </span>
        ))}
          </div>
      </header>

      {basics.summary && (
        <Section title="Summary" accent={accent} fs={fs}>
          <p style={{ margin: 0, textAlign: "justify" }}>{basics.summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Professional Experience" accent={accent} fs={fs}>
          {experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700 }}>{e.company}</span>
                <span style={{ fontStyle: "italic", color: "#555" }}>{e.location}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontStyle: "italic" }}>{e.role}</span>
                <span style={{ color: "#555" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
              </div>
              <ul style={{ margin: "6px 0 0", paddingLeft: 20 }}>
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

      {education.length > 0 && (
        <Section title="Education" accent={accent} fs={fs}>
          {education.map((e) => (
            <div key={e.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700 }}>{e.institution}</span>
                <span style={{ color: "#555" }}>{dateRange(e.startDate, e.endDate, false)}</span>
              </div>
              <div style={{ fontStyle: "italic" }}>
                {e.degree} {e.field}
              </div>
              {e.description && <p style={{ margin: "2px 0 0" }}>{e.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects" accent={accent} fs={fs}>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 700 }}>{p.name}</span>
              {p.link ? <span style={{ color: "#555" }}> — {p.link}</span> : null}
              <p style={{ margin: "2px 0 0" }}>{p.description}</p>
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills" accent={accent} fs={fs}>
          <p style={{ margin: 0 }}>{skills.map((s) => s.name).join("  ·  ")}</p>
        </Section>
      )}

      <div style={{ display: "flex", gap: 40 , flexWrap: "wrap" }}>
        {languages.length > 0 && (
          <div style={{ flex: 1 }}>
            <Section title="Languages" accent={accent} fs={fs}>
              {languages.map((l) => (
                <div key={l.id}>
                  {l.name} — <span style={{ fontStyle: "italic", color: "#555" }}>{l.proficiency}</span>
                </div>
              ))}
            </Section>
          </div>
        )}
        {certifications.length > 0 && (
          <div style={{ flex: 1 }}>
            <Section title="Certifications" accent={accent} fs={fs}>
              {certifications.map((c) => (
                <div key={c.id}>
                  {c.name}
                  {c.issuer ? `, ${c.issuer}` : ""} {c.date}
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
    <section style={{ marginTop: 22 }}>
      <h2
        style={{
          fontSize: fs(14),
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: accent,
          margin: "0 0 8px",
          borderBottom: "1px solid #ddd",
          paddingBottom: 4,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
