import { Fragment } from "react";
import {
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import type { Resume, SectionMeta } from "../../../data/resume";
import { dateRange, formatResumeDate } from "./shared";
import { cn } from "../../../lib/utils";
import { Skeleton } from "../../../components/ui/skeleton";

/** A4 at 96dpi. */
const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

export function PreviewSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[794px] space-y-4 rounded-xl border border-border bg-card p-10">
      <Skeleton className="h-7 w-52" />
      <Skeleton className="h-3 w-72" />
      <Skeleton className="h-px w-full" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-2 pt-4">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="h-3 w-9/12" />
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ resume, children }: { resume: Resume; children: string }) {
  const { sectionStyle, accent, headingSize } = resume.style;
  const base = "font-semibold uppercase tracking-[0.08em]";
  return (
    <h3
      className={cn(
        base,
        sectionStyle === "underline" && "border-b pb-1",
        sectionStyle === "boxed" && "rounded px-2 py-1",
      )}
      style={{
        fontSize: `${headingSize}pt`,
        color: sectionStyle === "boxed" ? "#ffffff" : accent,
        borderColor: accent,
        backgroundColor: sectionStyle === "boxed" ? accent : undefined,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {sectionStyle === "bar" && (
        <span style={{ width: 14, height: 3, background: accent, display: "inline-block" }} />
      )}
      {children}
    </h3>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul style={{ margin: "4px 0 0", paddingLeft: 16, listStyleType: "disc" }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 2 }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ContactRow({ resume }: { resume: Resume }) {
  const p = resume.content.personal;
  const showIcons = resume.style.showIcons;
  const items: { icon: typeof Mail; value: string }[] = [
    { icon: Mail, value: p.email },
    { icon: Phone, value: p.phone },
    { icon: MapPin, value: p.location },
    { icon: Globe, value: p.website },
    { icon: Linkedin, value: p.linkedin },
    { icon: Github, value: p.github },
  ].filter((i) => Boolean(i.value));

  if (!items.length) return null;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "4px 14px",
        marginTop: 6,
        color: "#4b5563",
      }}
    >
      {items.map(({ icon: Icon, value }) => (
        <span key={value} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          {showIcons && <Icon style={{ width: 11, height: 11 }} />}
          {value}
        </span>
      ))}
    </div>
  );
}

function Header({ resume }: { resume: Resume }) {
  const p = resume.content.personal;
  return (
    <header style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {resume.style.showPhoto && (
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: "50%",
            background: `${resume.style.accent}22`,
            display: "grid",
            placeItems: "center",
            color: resume.style.accent,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {(p.fullName || "?")
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <h1
          style={{
            fontSize: `${resume.style.headingSize + 8}pt`,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            color: "#111827",
          }}
        >
          {p.fullName || "Your Name"}
        </h1>
        {p.title && (
          <p style={{ fontSize: `${resume.style.fontSize + 1}pt`, color: resume.style.accent, fontWeight: 600 }}>
            {p.title}
          </p>
        )}
        <ContactRow resume={resume} />
      </div>
    </header>
  );
}

function SectionBody({ resume, section }: { resume: Resume; section: SectionMeta }) {
  const c = resume.content;
  const ds = resume.style.dateStyle;
  const accent = resume.style.accent;

  const entryHeader = (left: string, right: string, sub?: string) => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <strong style={{ color: "#111827" }}>{left}</strong>
        <span style={{ color: "#6b7280", whiteSpace: "nowrap" }}>{right}</span>
      </div>
      {sub && <div style={{ color: accent, fontWeight: 500 }}>{sub}</div>}
    </div>
  );

  switch (section.kind) {
    case "summary":
      return (
        <div>
          {c.summary.summary && <p>{c.summary.summary}</p>}
          {c.summary.objective && (
            <p style={{ marginTop: 6, fontStyle: "italic", color: "#4b5563" }}>{c.summary.objective}</p>
          )}
        </div>
      );
    case "experience":
    case "volunteer": {
      const items = section.kind === "experience" ? c.experience : c.volunteer;
      return (
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((e) => (
            <div key={e.id}>
              {entryHeader(
                e.role || "Role",
                dateRange(e.startDate, e.endDate, e.current, ds),
                [e.company, e.location, e.employmentType].filter(Boolean).join(" · "),
              )}
              {e.description && <p style={{ marginTop: 3 }}>{e.description}</p>}
              <Bullets items={[...e.achievements, ...e.responsibilities]} />
            </div>
          ))}
        </div>
      );
    }
    case "education":
      return (
        <div style={{ display: "grid", gap: 10 }}>
          {c.education.map((e) => (
            <div key={e.id}>
              {entryHeader(
                e.degree || "Degree",
                dateRange(e.startDate, e.endDate, false, ds),
                [e.institution, e.location, e.grade].filter(Boolean).join(" · "),
              )}
              {e.description && <p style={{ marginTop: 3 }}>{e.description}</p>}
              {e.coursework.length > 0 && (
                <p style={{ marginTop: 2, color: "#4b5563" }}>
                  Relevant coursework: {e.coursework.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    case "skills": {
      const groups = new Map<string, string[]>();
      c.skills.forEach((s) => groups.set(s.category, [...(groups.get(s.category) ?? []), s.name]));
      return (
        <div style={{ display: "grid", gap: 4 }}>
          {[...groups.entries()].map(([category, names]) => (
            <div key={category}>
              <strong style={{ color: "#111827" }}>{category}: </strong>
              <span>{names.join(", ")}</span>
            </div>
          ))}
        </div>
      );
    }
    case "projects":
      return (
        <div style={{ display: "grid", gap: 10 }}>
          {c.projects.map((p) => (
            <div key={p.id}>
              {entryHeader(
                p.name || "Project",
                dateRange(p.startDate, p.endDate, false, ds),
                [p.role, p.technologies.join(", ")].filter(Boolean).join(" · "),
              )}
              {p.description && <p style={{ marginTop: 3 }}>{p.description}</p>}
              <Bullets items={[...p.achievements, ...p.features]} />
              {(p.repoUrl || p.demoUrl) && (
                <p style={{ marginTop: 2, color: accent }}>
                  {[p.repoUrl, p.demoUrl].filter(Boolean).join("  ·  ")}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    case "certifications":
      return (
        <div style={{ display: "grid", gap: 6 }}>
          {c.certifications.map((cert) => (
            <div key={cert.id}>
              {entryHeader(
                cert.name || "Certification",
                formatResumeDate(cert.issueDate, ds),
                [cert.organization, cert.credentialId].filter(Boolean).join(" · "),
              )}
            </div>
          ))}
        </div>
      );
    case "achievements":
    case "awards": {
      const items = section.kind === "achievements" ? c.achievements : c.awards;
      return (
        <div style={{ display: "grid", gap: 8 }}>
          {items.map((a) => (
            <div key={a.id}>
              {entryHeader(a.title || "Achievement", formatResumeDate(a.date, ds), a.organization)}
              {a.description && <p style={{ marginTop: 2 }}>{a.description}</p>}
              {a.metrics && <p style={{ color: accent }}>{a.metrics}</p>}
            </div>
          ))}
        </div>
      );
    }
    case "languages":
      return (
        <p>
          {c.languages.map((l, i) => (
            <Fragment key={l.id}>
              {i > 0 && "  ·  "}
              <strong style={{ color: "#111827" }}>{l.name}</strong> ({l.proficiency})
            </Fragment>
          ))}
        </p>
      );
    case "publications":
      return (
        <div style={{ display: "grid", gap: 6 }}>
          {c.publications.map((b) => (
            <div key={b.id}>
              {entryHeader(b.heading || "Publication", formatResumeDate(b.date, ds), b.subheading)}
              {b.body && <p style={{ marginTop: 2 }}>{b.body}</p>}
            </div>
          ))}
        </div>
      );
    case "custom": {
      const custom = c.custom[section.id];
      if (!custom) return null;
      return (
        <div style={{ display: "grid", gap: 8 }}>
          {custom.description && <p style={{ color: "#4b5563" }}>{custom.description}</p>}
          {custom.blocks.map((b) => (
            <div key={b.id}>
              {entryHeader(b.heading || "Entry", formatResumeDate(b.date, ds), b.subheading)}
              {b.body && <p style={{ marginTop: 2 }}>{b.body}</p>}
            </div>
          ))}
        </div>
      );
    }
    case "personal":
    default:
      return null;
  }
}

function hasContent(resume: Resume, section: SectionMeta): boolean {
  const c = resume.content;
  switch (section.kind) {
    case "personal":
      return true;
    case "summary":
      return Boolean(c.summary.summary || c.summary.objective);
    case "experience":
      return c.experience.length > 0;
    case "volunteer":
      return c.volunteer.length > 0;
    case "education":
      return c.education.length > 0;
    case "skills":
      return c.skills.length > 0;
    case "projects":
      return c.projects.length > 0;
    case "certifications":
      return c.certifications.length > 0;
    case "achievements":
      return c.achievements.length > 0;
    case "awards":
      return c.awards.length > 0;
    case "languages":
      return c.languages.length > 0;
    case "publications":
      return c.publications.length > 0;
    case "custom":
      return Boolean(c.custom[section.id]?.blocks.length);
    default:
      return false;
  }
}

/** Very rough content-length based pagination estimate for the page indicator. */
export function estimatePageCount(resume: Resume): number {
  const c = resume.content;
  const units =
    c.experience.reduce((n, e) => n + 3 + e.achievements.length + e.responsibilities.length, 0) +
    c.projects.reduce((n, p) => n + 3 + p.achievements.length, 0) +
    c.education.length * 4 +
    Math.ceil(c.skills.length / 4) +
    c.certifications.length * 2 +
    c.achievements.length * 3 +
    Math.ceil(c.summary.summary.length / 90) +
    8;
  const perPage = Math.max(30, Math.round(1000 / (resume.style.fontSize * resume.style.lineHeight)));
  return Math.max(1, Math.ceil(units / perPage));
}

export function ResumeDocument({
  resume,
  zoom = 1,
  className,
}: {
  resume: Resume;
  zoom?: number;
  className?: string;
}) {
  const { style } = resume;
  const sections = resume.sections.filter((s) => s.visible);
  const sidebarKinds = new Set(["skills", "languages", "certifications"]);
  const useSidebar = style.layout === "sidebar";
  const main = sections.filter((s) => !useSidebar || !sidebarKinds.has(s.kind));
  const side = useSidebar ? sections.filter((s) => sidebarKinds.has(s.kind)) : [];
  const pages = estimatePageCount(resume);

  const renderSections = (list: SectionMeta[]) =>
    list.map((section) => {
      if (section.kind === "personal") return null;
      if (!hasContent(resume, section)) return null;
      return (
        <section key={section.id} style={{ marginTop: style.sectionSpacing }}>
          <SectionTitle resume={resume}>{section.title}</SectionTitle>
          <div style={{ marginTop: 6 }}>
            <SectionBody resume={resume} section={section} />
          </div>
        </section>
      );
    });

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {Array.from({ length: pages }).map((_, pageIndex) => (
        <div
          key={pageIndex}
          className="relative shrink-0 overflow-hidden rounded-[3px] bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.45)] ring-1 ring-black/10"
          style={{
            width: PAGE_WIDTH * zoom,
            height: PAGE_HEIGHT * zoom,
          }}
          aria-label={`Resume page ${pageIndex + 1} of ${pages}`}
        >
          <div
            style={{
              width: PAGE_WIDTH,
              height: PAGE_HEIGHT,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              padding: style.margin,
              fontFamily: style.fontFamily,
              fontSize: `${style.fontSize}pt`,
              lineHeight: style.lineHeight,
              color: "#1f2937",
              // Subsequent pages continue the same flow; offset the content.
              marginTop: pageIndex === 0 ? 0 : -(pageIndex * (PAGE_HEIGHT - style.margin * 2)),
            }}
          >
            {pageIndex === 0 && <Header resume={resume} />}
            {useSidebar ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 210px", gap: 24 }}>
                <div>{renderSections(main)}</div>
                <div>{renderSections(side)}</div>
              </div>
            ) : (
              renderSections(main)
            )}
          </div>
          <span
            className="pointer-events-none absolute bottom-2 right-3 text-[10px] font-medium text-slate-400"
            aria-hidden="true"
          >
            {pageIndex + 1} / {pages}
          </span>
        </div>
      ))}
    </div>
  );
}