import { bullets, dateRange, type TemplateProps } from "../template-utils"

export function ElegantTemplate({ data, accent, fontScale }: TemplateProps) {
  const { basics, experience, education, projects, skills, languages, certifications } = data
  const fs = (px: number) => px * fontScale

  const contacts = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean)

  return (
    <div
      style={{
        fontFamily: "Geist, Arial, sans-serif",
        color: "#2b2b2b",
        fontSize: fs(13),
        lineHeight: 1.55,
        padding: "52px 56px",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: 30 }}>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: fs(32),
            fontWeight: 400,
            letterSpacing: "0.06em",
            margin: 0,
            color: accent,
          }}
        >
          {basics.fullName || "Your Name"}
        </h1>
        {basics.title && (
          <p
            style={{
              fontSize: fs(13),
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#666",
              margin: "10px 0 0",
            }}
          >
            {basics.title}
          </p>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 18,
            marginTop: 14,
            fontSize: fs(12),
            color: "#555",
            flexWrap: "wrap",
          }}
        >
          {contacts.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </header>

      {basics.summary && (
        <p
          style={{
            textAlign: "center",
            maxWidth: 560,
            margin: "0 auto 30px",
            color: "#444",
            fontStyle: "italic",
          }}
        >
          {basics.summary}
        </p>
      )}

      {experience.length > 0 && (
        <Section title="Experience" accent={accent} fs={fs}>
          {experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 18, textAlign: "center" }}>
              <div style={{ fontWeight: 600, fontSize: fs(14) }}>{e.role}</div>
              <div style={{ color: accent, fontSize: fs(13) }}>
                {e.company}
                {e.location ? ` · ${e.location}` : ""} · {dateRange(e.startDate, e.endDate, e.current)}
              </div>
              <ul style={{ margin: "8px auto 0", paddingLeft: 0, listStyle: "none", color: "#444", maxWidth: 560 }}>
                {bullets(e.description).map((b, i) => (
                  <li key={i} style={{ marginBottom: 3 }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      <div style={{ display: "flex", gap: 40 , flexWrap: "wrap"}}>
        {education.length > 0 && (
          <div style={{ flex: 1 }}>
            <Section title="Education" accent={accent} fs={fs} center>
              {education.map((e) => (
                <div key={e.id} style={{ marginBottom: 12, textAlign: "center" }}>
                  <div style={{ fontWeight: 600 }}>{e.institution}</div>
                  <div style={{ color: "#555" }}>
                    {e.degree} {e.field}
                  </div>
                  <div style={{ color: "#888", fontSize: fs(12) }}>{dateRange(e.startDate, e.endDate, false)}</div>
                </div>
              ))}
            </Section>
          </div>
        )}
        {skills.length > 0 && (
          <div style={{ flex: 1 }}>
            <Section title="Skills" accent={accent} fs={fs} center>
              <p style={{ textAlign: "center", margin: 0, color: "#444" }}>
                {skills.map((s) => s.name).join(" · ")}
              </p>
            </Section>
          </div>
        )}
      </div>

      {projects.length > 0 && (
        <Section title="Projects" accent={accent} fs={fs}>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 10, textAlign: "center" }}>
              <span style={{ fontWeight: 600 }}>{p.name}</span>
              {p.link && <span style={{ color: accent, fontSize: fs(12) }}> · {p.link}</span>}
              <p style={{ margin: "2px 0 0", color: "#444" }}>{p.description}</p>
            </div>
          ))}
        </Section>
      )}

      {(languages.length > 0 || certifications.length > 0) && (
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
          {languages.length > 0 && (
            <div style={{ flex: 1 }}>
              <Section title="Languages" accent={accent} fs={fs} center>
                <p style={{ textAlign: "center", margin: 0, color: "#444" }}>
                  {languages.map((l) => `${l.name} (${l.proficiency})`).join(" · ")}
                </p>
              </Section>
            </div>
          )}
          {certifications.length > 0 && (
            <div style={{ flex: 1 }}>
              <Section title="Certifications" accent={accent} fs={fs} center>
                {certifications.map((c) => (
                  <div key={c.id} style={{ textAlign: "center", color: "#444" }}>
                    {c.name} {c.date ? `· ${c.date}` : ""}
                  </div>
                ))}
              </Section>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Section({
  title,
  accent,
  fs,
  children,
  center,
}: {
  title: string
  accent: string
  fs: (n: number) => number
  children: React.ReactNode
  center?: boolean
}) {
  return (
    <section style={{ marginTop: 26 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 16 }}>
        <span style={{ flex: center ? "none" : 1, width: center ? 24 : "auto", height: 1, background: "#d8d8d8" }} />
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: fs(15),
            fontWeight: 400,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: accent,
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h2>
        <span style={{ flex: center ? "none" : 1, width: center ? 24 : "auto", height: 1, background: "#d8d8d8" }} />
      </div>
      {children}
    </section>
  )
}
