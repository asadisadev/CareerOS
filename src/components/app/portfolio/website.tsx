/**
 * Live portfolio renderer.
 *
 * Renders the portfolio exactly like a published personal website, driven only
 * by `Portfolio` data + style tokens. Used by the editor preview pane, the
 * full-screen preview route and the theme preview modal.
 */
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Quote,
} from "lucide-react";
import type {
  Portfolio,
  PortfolioSection,
  PortfolioStyle,
  PreviewDeviceWidth,
} from "@/data/portfolio-view";
import { cn } from "@/lib/utils";

export type Device = "desktop" | "tablet" | "mobile";

export const DEVICE_WIDTH: Record<Device, number> = {
  desktop: 1280,
  tablet: 834,
  mobile: 390,
};

export type { PreviewDeviceWidth };

function radius(style: PortfolioStyle, scale = 1) {
  return `${style.borderRadius * scale}px`;
}

function buttonRadius(style: PortfolioStyle) {
  if (style.buttonStyle === "pill") return "999px";
  if (style.buttonStyle === "square") return "4px";
  return radius(style, 0.6);
}

function anim(style: PortfolioStyle, index = 0) {
  if (style.animation === "none") return {};
  const distance = style.animation === "dynamic" ? 26 : style.animation === "modern" ? 16 : 8;
  const duration = style.animation === "dynamic" ? 0.6 : 0.42;
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] as const },
  };
}

function cardStyle(style: PortfolioStyle): CSSProperties {
  const base: CSSProperties = { borderRadius: radius(style) };
  switch (style.cardStyle) {
    case "outline":
      return { ...base, border: `1px solid ${style.textColor}1f`, background: "transparent" };
    case "elevated":
      return {
        ...base,
        background: `${style.textColor}08`,
        boxShadow: `0 18px 40px -24px ${style.textColor}55`,
      };
    case "glass":
      return {
        ...base,
        background: `${style.textColor}0d`,
        border: `1px solid ${style.textColor}22`,
        backdropFilter: "blur(14px)",
      };
    default:
      return { ...base, background: `${style.textColor}0a` };
  }
}

function Btn({
  label,
  style,
  variant = "primary",
}: {
  label: string;
  style: PortfolioStyle;
  variant?: "primary" | "ghost";
}) {
  if (!label) return null;
  return (
    <span
      className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold"
      style={{
        borderRadius: buttonRadius(style),
        background: variant === "primary" ? style.primaryColor : "transparent",
        color: variant === "primary" ? readableOn(style.primaryColor) : style.textColor,
        border: variant === "primary" ? "none" : `1px solid ${style.textColor}33`,
      }}
    >
      {label}
    </span>
  );
}

/** Picks black/white text for a hex background so buttons stay readable. */
function readableOn(hex: string): string {
  const value = hex.replace("#", "");
  if (value.length < 6) return "#ffffff";
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#0b1120" : "#ffffff";
}

function SectionShell({
  id,
  title,
  eyebrow,
  style,
  children,
  index,
}: {
  id: string;
  title?: string;
  eyebrow?: string;
  style: PortfolioStyle;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.section
      id={id}
      {...anim(style, index)}
      style={{ paddingTop: `${style.spacing * 18}px`, paddingBottom: `${style.spacing * 18}px` }}
      className="px-6 sm:px-10"
    >
      <div className="mx-auto w-full max-w-4xl">
        {(title || eyebrow) && (
          <header className="mb-8">
            {eyebrow && (
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: style.primaryColor }}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className="mt-1.5 text-2xl font-bold sm:text-3xl"
                style={{ fontFamily: style.headingFont }}
              >
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </motion.section>
  );
}

function Empty({ label, style }: { label: string; style: PortfolioStyle }) {
  return (
    <p className="text-sm opacity-60" style={{ color: style.textColor }}>
      {label}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Hero({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  const split = style.heroLayout === "split";
  const initials =
    c.profile.fullName
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("") || "AI";

  return (
    <motion.section
      id="hero"
      {...anim(style, index)}
      className="px-6 sm:px-10"
      style={{ paddingTop: `${style.spacing * 26}px`, paddingBottom: `${style.spacing * 22}px` }}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-4xl",
          split ? "grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center" : "",
          style.heroLayout === "centered" && "text-center",
        )}
      >
        <div className={cn("min-w-0", style.heroLayout === "centered" && "mx-auto max-w-2xl")}>
          <h1
            className="text-3xl font-extrabold leading-tight sm:text-5xl"
            style={{ fontFamily: style.headingFont }}
          >
            {c.hero.headline || c.profile.fullName || "Your name here"}
          </h1>
          <p className="mt-3 text-lg font-medium" style={{ color: style.primaryColor }}>
            {c.hero.subheadline || c.profile.professionalTitle || "Your professional title"}
          </p>
          {c.hero.intro && <p className="mt-4 text-sm leading-relaxed opacity-80">{c.hero.intro}</p>}
          <div
            className={cn(
              "mt-7 flex flex-wrap items-center gap-3",
              style.heroLayout === "centered" && "justify-center",
            )}
          >
            <Btn label={c.hero.primaryCta} style={style} />
            <Btn label={c.hero.secondaryCta} style={style} variant="ghost" />
          </div>
          {c.hero.showSocials && (
            <div
              className={cn(
                "mt-6 flex flex-wrap items-center gap-4 text-xs opacity-75",
                style.heroLayout === "centered" && "justify-center",
              )}
            >
              {c.profile.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {c.profile.location}
                </span>
              )}
              {c.profile.github && (
                <span className="inline-flex items-center gap-1.5">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </span>
              )}
              {c.profile.linkedin && (
                <span className="inline-flex items-center gap-1.5">
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </span>
              )}
              {c.profile.website && (
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> Website
                </span>
              )}
            </div>
          )}
        </div>
        {split && (
          <div
            className="grid h-32 w-32 shrink-0 place-items-center text-3xl font-bold sm:h-40 sm:w-40"
            style={{
              borderRadius: radius(style, 2),
              background: `linear-gradient(135deg, ${style.primaryColor}, ${style.secondaryColor})`,
              color: readableOn(style.primaryColor),
              fontFamily: style.headingFont,
            }}
          >
            {initials}
          </div>
        )}
      </div>
    </motion.section>
  );
}

function About({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  const blocks = [
    ["", c.about.aboutMe],
    ["Career story", c.about.careerStory],
    ["Goals", c.about.goals],
    ["Interests", c.about.interests],
  ].filter(([, value]) => Boolean(value));
  return (
    <SectionShell id="about" eyebrow="About" title="A little about me" style={style} index={index}>
      {blocks.length === 0 ? (
        <Empty label="Add your About content to fill this section." style={style} />
      ) : (
        <div className="space-y-5">
          {blocks.map(([label, value]) => (
            <div key={label || "intro"}>
              {label && (
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-60">
                  {label}
                </p>
              )}
              <p className="text-sm leading-relaxed opacity-85">{value}</p>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function Skills({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  const groups = c.skills.reduce<Record<string, typeof c.skills>>((acc, skill) => {
    (acc[skill.group] ??= []).push(skill);
    return acc;
  }, {});
  const entries = Object.entries(groups);

  return (
    <SectionShell id="skills" eyebrow="Skills" title="What I work with" style={style} index={index}>
      {entries.length === 0 ? (
        <Empty label="Add skills to populate this section." style={style} />
      ) : (
        <div className="space-y-7">
          {entries.map(([group, skills]) => (
            <div key={group}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider opacity-60">
                {group}
              </p>
              {c.skillDisplay === "tags" ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="px-3 py-1 text-xs font-medium"
                      style={{
                        borderRadius: "999px",
                        background: `${style.primaryColor}1f`,
                        color: style.primaryColor,
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              ) : c.skillDisplay === "bars" ? (
                <div className="space-y-3">
                  {skills.map((s) => (
                    <div key={s.id}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{s.name}</span>
                        <span className="opacity-60 tabular-nums">{s.level}%</span>
                      </div>
                      <div
                        className="mt-1.5 h-1.5 w-full overflow-hidden"
                        style={{ background: `${style.textColor}1a`, borderRadius: "999px" }}
                      >
                        <div
                          className="h-full"
                          style={{
                            width: `${s.level}%`,
                            background: style.primaryColor,
                            borderRadius: "999px",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={cn(
                    "grid gap-3",
                    c.skillDisplay === "grid" ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2",
                  )}
                >
                  {skills.map((s) => (
                    <div key={s.id} className="p-4" style={cardStyle(style)}>
                      <p className="text-sm font-semibold">{s.name}</p>
                      {s.description && (
                        <p className="mt-1 text-xs leading-relaxed opacity-70">{s.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function Projects({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  return (
    <SectionShell id="projects" eyebrow="Projects" title="Selected work" style={style} index={index}>
      {c.projects.length === 0 ? (
        <Empty label="Add projects to showcase your work." style={style} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {c.projects.map((p) => (
            <article key={p.id} className="min-w-0 p-5" style={cardStyle(style)}>
              <div
                className="mb-4 h-28 w-full"
                style={{
                  borderRadius: radius(style, 0.7),
                  background: `linear-gradient(135deg, ${style.primaryColor}30, ${style.secondaryColor}30)`,
                }}
              />
              <h3 className="truncate text-base font-bold" style={{ fontFamily: style.headingFont }}>
                {p.name || "Untitled project"}
              </h3>
              {p.role && <p className="mt-0.5 text-xs opacity-60">{p.role}</p>}
              {p.description && (
                <p className="mt-2 text-sm leading-relaxed opacity-80">{p.description}</p>
              )}
              {p.achievements.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {p.achievements.slice(0, 3).map((a) => (
                    <li key={a} className="text-xs opacity-75">
                      • {a}
                    </li>
                  ))}
                </ul>
              )}
              {p.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[0.65rem] font-medium"
                      style={{
                        borderRadius: "999px",
                        background: `${style.primaryColor}1a`,
                        color: style.primaryColor,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold">
                {p.liveUrl && (
                  <span className="inline-flex items-center gap-1" style={{ color: style.primaryColor }}>
                    Live demo <ExternalLink className="h-3 w-3" />
                  </span>
                )}
                {p.githubUrl && (
                  <span className="inline-flex items-center gap-1 opacity-70">
                    <Github className="h-3 w-3" /> Code
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function Experience({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  return (
    <SectionShell id="experience" eyebrow="Experience" title="Where I've worked" style={style} index={index}>
      {c.experience.length === 0 ? (
        <Empty label="Add roles to build your experience timeline." style={style} />
      ) : (
        <div className="space-y-6">
          {c.experience.map((e) => (
            <div key={e.id} className="grid gap-1 border-l pl-5" style={{ borderColor: `${style.textColor}1f` }}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-bold" style={{ fontFamily: style.headingFont }}>
                  {e.title || "Role"}
                </h3>
                <span className="text-xs opacity-60">
                  {e.startDate} — {e.current ? "Present" : e.endDate || "—"}
                </span>
              </div>
              <p className="text-sm font-medium" style={{ color: style.primaryColor }}>
                {e.company}
                {e.location ? ` · ${e.location}` : ""}
                {e.employmentType ? ` · ${e.employmentType}` : ""}
              </p>
              {e.description && <p className="mt-1 text-sm leading-relaxed opacity-80">{e.description}</p>}
              {e.achievements.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {e.achievements.map((a) => (
                    <li key={a} className="text-xs opacity-75">
                      • {a}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function Education({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  return (
    <SectionShell id="education" eyebrow="Education" title="Education" style={style} index={index}>
      {c.education.length === 0 ? (
        <Empty label="Add your degrees and coursework." style={style} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {c.education.map((e) => (
            <div key={e.id} className="p-5" style={cardStyle(style)}>
              <h3 className="text-sm font-bold">{e.degree}</h3>
              <p className="text-xs" style={{ color: style.primaryColor }}>
                {e.institution}
              </p>
              <p className="mt-1 text-xs opacity-60">
                {e.startDate} — {e.endDate}
                {e.grade ? ` · ${e.grade}` : ""}
              </p>
              {e.description && <p className="mt-2 text-xs leading-relaxed opacity-75">{e.description}</p>}
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function Certificates({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  return (
    <SectionShell id="certificates" eyebrow="Credentials" title="Certificates" style={style} index={index}>
      {c.certificates.length === 0 ? (
        <Empty label="Add certificates and credential links." style={style} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {c.certificates.map((cert) => (
            <div key={cert.id} className="p-5" style={cardStyle(style)}>
              <h3 className="text-sm font-bold">{cert.name}</h3>
              <p className="text-xs" style={{ color: style.primaryColor }}>
                {cert.organization}
              </p>
              <p className="mt-1 text-xs opacity-60">
                {cert.date}
                {cert.credentialId ? ` · ${cert.credentialId}` : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function Achievements({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  return (
    <SectionShell id="achievements" eyebrow="Highlights" title="Achievements" style={style} index={index}>
      {c.achievements.length === 0 ? (
        <Empty label="Add measurable achievements." style={style} />
      ) : (
        <div className="space-y-4">
          {c.achievements.map((a) => (
            <div key={a.id} className="p-5" style={cardStyle(style)}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold">{a.title}</h3>
                {a.metric && (
                  <span className="text-xs font-semibold" style={{ color: style.primaryColor }}>
                    {a.metric}
                  </span>
                )}
              </div>
              <p className="text-xs opacity-60">
                {a.organization}
                {a.date ? ` · ${a.date}` : ""}
              </p>
              {a.description && <p className="mt-2 text-xs leading-relaxed opacity-75">{a.description}</p>}
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function Testimonials({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  return (
    <SectionShell id="testimonials" eyebrow="Social proof" title="What people say" style={style} index={index}>
      {c.testimonials.length === 0 ? (
        <Empty label="Add testimonials from colleagues or clients." style={style} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {c.testimonials.map((t) => (
            <blockquote key={t.id} className="p-5" style={cardStyle(style)}>
              <Quote className="h-4 w-4" style={{ color: style.primaryColor }} />
              <p className="mt-3 text-sm leading-relaxed opacity-85">{t.quote}</p>
              <footer className="mt-4 text-xs">
                <span className="font-semibold">{t.name}</span>
                <span className="opacity-60">
                  {t.role ? ` · ${t.role}` : ""}
                  {t.company ? `, ${t.company}` : ""}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function Services({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  return (
    <SectionShell id="services" eyebrow="Services" title="How I can help" style={style} index={index}>
      {c.services.length === 0 ? (
        <Empty label="Add the services you offer." style={style} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {c.services.map((s) => (
            <div key={s.id} className="p-5" style={cardStyle(style)}>
              <h3 className="text-sm font-bold">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed opacity-75">{s.description}</p>
              {s.startingPrice && (
                <p className="mt-3 text-xs font-semibold" style={{ color: style.primaryColor }}>
                  From {s.startingPrice}
                </p>
              )}
              {s.cta && (
                <div className="mt-4">
                  <Btn label={s.cta} style={style} variant="ghost" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function Blog({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  return (
    <SectionShell id="blog" eyebrow="Writing" title="Latest articles" style={style} index={index}>
      {c.blog.length === 0 ? (
        <Empty label="Connect articles or add them manually." style={style} />
      ) : (
        <div className="space-y-4">
          {c.blog.map((post) => (
            <article key={post.id} className="p-5" style={cardStyle(style)}>
              <div className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-wider opacity-60">
                <span>{post.category}</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {post.date}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold">{post.title}</h3>
              <p className="mt-1 text-xs leading-relaxed opacity-75">{post.excerpt}</p>
              <p className="mt-3 text-xs font-semibold" style={{ color: style.primaryColor }}>
                Read more →
              </p>
            </article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function Gallery({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  const items = c.gallery.length ? c.gallery : [];
  return (
    <SectionShell id="gallery" eyebrow="Gallery" title="Visual work" style={style} index={index}>
      {items.length === 0 ? (
        <Empty label="Upload images to build your gallery." style={style} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((g) => (
            <figure key={g.id} className="overflow-hidden" style={cardStyle(style)}>
              <div
                className="h-28 w-full"
                style={{ background: `linear-gradient(135deg, ${style.primaryColor}33, ${style.secondaryColor}33)` }}
              />
              <figcaption className="p-3 text-xs font-semibold">{g.title}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function Timeline({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  return (
    <SectionShell id="timeline" eyebrow="Journey" title="Career timeline" style={style} index={index}>
      {c.timeline.length === 0 ? (
        <Empty label="Timeline items appear as you add experience and projects." style={style} />
      ) : (
        <ol className="space-y-5 border-l pl-6" style={{ borderColor: `${style.textColor}1f` }}>
          {c.timeline.map((t) => (
            <li key={t.id} className="relative">
              <span
                className="absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full"
                style={{ background: style.primaryColor }}
              />
              <p className="text-sm font-semibold">{t.title}</p>
              <p className="text-xs opacity-65">
                {t.subtitle} · {t.date}
              </p>
            </li>
          ))}
        </ol>
      )}
    </SectionShell>
  );
}

function Statistics({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  return (
    <SectionShell id="statistics" style={style} index={index}>
      {c.statistics.length === 0 ? (
        <Empty label="Add headline numbers." style={style} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {c.statistics.map((s) => (
            <div key={s.id} className="p-5 text-center" style={cardStyle(style)}>
              <p className="text-3xl font-extrabold" style={{ color: style.primaryColor, fontFamily: style.headingFont }}>
                {s.value}
              </p>
              <p className="mt-1 text-xs opacity-70">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function Contact({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  return (
    <SectionShell id="contact" eyebrow="Contact" title={c.contact.headline || "Get in touch"} style={style} index={index}>
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-3 text-sm">
          {c.contact.message && <p className="leading-relaxed opacity-80">{c.contact.message}</p>}
          {(c.contact.email || c.profile.email) && (
            <p className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" style={{ color: style.primaryColor }} />
              {c.contact.email || c.profile.email}
            </p>
          )}
          {c.profile.phone && (
            <p className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" style={{ color: style.primaryColor }} /> {c.profile.phone}
            </p>
          )}
          <div className="flex flex-wrap gap-3 pt-1 text-xs opacity-75">
            {c.profile.linkedin && <span>LinkedIn</span>}
            {c.profile.github && <span>GitHub</span>}
            {c.profile.socials.map((s) => (
              <span key={s.id}>{s.label}</span>
            ))}
          </div>
        </div>
        {c.contact.showForm && (
          <form className="min-w-0 space-y-3 p-5" style={cardStyle(style)} onSubmit={(e) => e.preventDefault()}>
            {["Name", "Email"].map((label) => (
              <div key={label}>
                <label className="text-[0.7rem] font-semibold uppercase tracking-wider opacity-60">
                  {label}
                </label>
                <div
                  className="mt-1 h-9 w-full"
                  style={{ borderRadius: radius(style, 0.5), background: `${style.textColor}12` }}
                />
              </div>
            ))}
            <div>
              <label className="text-[0.7rem] font-semibold uppercase tracking-wider opacity-60">
                Message
              </label>
              <div
                className="mt-1 h-16 w-full"
                style={{ borderRadius: radius(style, 0.5), background: `${style.textColor}12` }}
              />
            </div>
            <Btn label="Send message" style={style} />
          </form>
        )}
      </div>
    </SectionShell>
  );
}

function ResumeBlock({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { style } = portfolio;
  return (
    <SectionShell id="resume" eyebrow="Resume" title="Download my resume" style={style} index={index}>
      <div className="flex flex-wrap items-center justify-between gap-4 p-5" style={cardStyle(style)}>
        <p className="text-sm opacity-80">Up-to-date PDF, ATS-friendly formatting.</p>
        <Btn label="Download resume" style={style} />
      </div>
    </SectionShell>
  );
}

function SocialBlock({ portfolio, index }: { portfolio: Portfolio; index: number }) {
  const { content: c, style } = portfolio;
  const links = [
    c.profile.linkedin && "LinkedIn",
    c.profile.github && "GitHub",
    c.profile.website && "Website",
    ...c.profile.socials.map((s) => s.label),
  ].filter(Boolean) as string[];
  return (
    <SectionShell id="social" eyebrow="Elsewhere" title="Find me online" style={style} index={index}>
      {links.length === 0 ? (
        <Empty label="Add social links in your profile." style={style} />
      ) : (
        <div className="flex flex-wrap gap-3">
          {links.map((l) => (
            <span key={l} className="px-4 py-2 text-xs font-semibold" style={cardStyle(style)}>
              {l}
            </span>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function CustomSection({
  portfolio,
  section,
  index,
}: {
  portfolio: Portfolio;
  section: PortfolioSection;
  index: number;
}) {
  const { style } = portfolio;
  return (
    <SectionShell id={section.id} eyebrow="Custom" title={section.title} style={style} index={index}>
      {section.description && <p className="mb-4 text-sm opacity-80">{section.description}</p>}
      {!section.blocks?.length ? (
        <Empty label="Add content blocks to this section." style={style} />
      ) : (
        <div className="space-y-4">
          {section.blocks.map((b) => (
            <div key={b.id} className="p-5" style={cardStyle(style)}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider opacity-55">
                {b.type}
              </p>
              {b.title && <p className="mt-1 text-sm font-bold">{b.title}</p>}
              {b.value && <p className="mt-1 text-xs leading-relaxed opacity-75">{b.value}</p>}
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

/** Placeholder renderer for section kinds that reuse a generic list layout. */
function GenericSection({
  portfolio,
  section,
  index,
}: {
  portfolio: Portfolio;
  section: PortfolioSection;
  index: number;
}) {
  const { style } = portfolio;
  return (
    <SectionShell id={section.id} eyebrow="Section" title={section.title} style={style} index={index}>
      <Empty label={`Content for ${section.title} will render here as you add it.`} style={style} />
    </SectionShell>
  );
}

/* ------------------------------------------------------------------ */
/* Website shell                                                       */
/* ------------------------------------------------------------------ */

function Nav({ portfolio }: { portfolio: Portfolio }) {
  const { style, sections, content } = portfolio;
  if (style.navigation === "none") return null;
  const items = sections.filter((s) => s.visible && s.kind !== "hero").slice(0, 6);
  return (
    <nav
      className={cn(
        "z-10 flex items-center justify-between gap-6 px-6 py-4 sm:px-10",
        style.navigation === "floating" && "mx-4 mt-4 sm:mx-8",
      )}
      style={{
        borderRadius: style.navigation === "floating" ? radius(style) : undefined,
        borderBottom: style.navigation === "top" ? `1px solid ${style.textColor}14` : undefined,
        background: style.navigation === "floating" ? `${style.textColor}0d` : "transparent",
        backdropFilter: style.navigation === "floating" ? "blur(12px)" : undefined,
      }}
    >
      <span className="truncate text-sm font-bold" style={{ fontFamily: style.headingFont }}>
        {content.profile.fullName || "Your name"}
      </span>
      <div className="hidden flex-wrap items-center gap-5 text-xs font-medium opacity-75 sm:flex">
        {items.map((s) => (
          <span key={s.id}>{s.title}</span>
        ))}
      </div>
    </nav>
  );
}

const RENDERERS: Partial<
  Record<PortfolioSection["kind"], (props: { portfolio: Portfolio; index: number }) => JSX.Element>
> = {
  hero: Hero,
  about: About,
  skills: Skills,
  projects: Projects,
  experience: Experience,
  education: Education,
  certificates: Certificates,
  achievements: Achievements,
  testimonials: Testimonials,
  services: Services,
  blog: Blog,
  gallery: Gallery,
  timeline: Timeline,
  statistics: Statistics,
  contact: Contact,
  resume: ResumeBlock,
  social: SocialBlock,
};

export function PortfolioWebsite({ portfolio }: { portfolio: Portfolio }) {
  const { style } = portfolio;
  return (
    <div
      style={{
        background: style.backgroundColor,
        color: style.textColor,
        fontFamily: style.bodyFont,
      }}
      className="min-h-full w-full"
    >
      <Nav portfolio={portfolio} />
      {portfolio.sections
        .filter((s) => s.visible)
        .map((section, index) => {
          const Renderer = RENDERERS[section.kind];
          if (Renderer) return <Renderer key={section.id} portfolio={portfolio} index={index} />;
          if (section.kind === "custom")
            return <CustomSection key={section.id} portfolio={portfolio} section={section} index={index} />;
          return <GenericSection key={section.id} portfolio={portfolio} section={section} index={index} />;
        })}
      <footer
        className="px-6 py-8 text-center text-xs opacity-60 sm:px-10"
        style={{ borderTop: `1px solid ${style.textColor}14` }}
      >
        © {new Date().getFullYear()} {portfolio.content.profile.fullName || "Your name"} · Built with
        CareerOS AI
      </footer>
    </div>
  );
}

/**
 * Scales the rendered website down into an editor pane so a desktop layout can
 * be judged inside a narrow panel.
 */
export function DeviceFrame({
  portfolio,
  device,
  className,
}: {
  portfolio: Portfolio;
  device: Device;
  className?: string;
}) {
  const width = DEVICE_WIDTH[device];
  return (
    <div className={cn("h-full w-full overflow-hidden rounded-2xl border border-border bg-muted/30", className)}>
      <div className="h-full w-full overflow-y-auto">
        <div
          className="mx-auto origin-top"
          style={{ width, maxWidth: "100%", transform: "none" }}
        >
          <PortfolioWebsite portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
}
