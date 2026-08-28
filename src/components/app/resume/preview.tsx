import React from "react";
import { useResumeEditor } from "../../../lib/resume-store"; // adjust path

export function Preview() {
  const { resume } = useResumeEditor();
  const { personal, summary, experience, education, skills, projects, certifications, languages } = resume.content;

  // Helper to format date (YYYY-MM → Month YYYY)
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[210mm] aspect-[1/1.414] bg-[#161b22] rounded-2xl border border-[#30363d] shadow-2xl p-6 md:p-10 flex flex-col overflow-auto">
        {/* Header: curriculum vitae */}
        <div className="text-[#8b949e] text-[10px] md:text-xs tracking-widest uppercase mb-4">
          curriculum vitae – {personal.fullName || "Your Name"}, {new Date().getFullYear()}
        </div>

        {/* Name */}
        <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-1">
          {personal.fullName || "Your Name"}
        </h1>

        {/* Subtitle */}
        <p className="text-[#c9d1d9] text-base md:text-xl font-light mb-6 md:mb-8">
          {personal.title || "Your Title"}
        </p>

        {/* Profile / Summary */}
        {summary?.summary && (
          <div className="mb-6 md:mb-8">
            <h2 className="text-[#58a6ff] text-xs md:text-sm font-semibold tracking-wide mb-2">
              // profile
            </h2>
            <p className="text-[#c9d1d9] text-sm md:text-base leading-relaxed">
              {summary.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6 md:mb-8">
            <h2 className="text-[#58a6ff] text-xs md:text-sm font-semibold tracking-wide mb-3 md:mb-4">
              // experience
            </h2>
            {experience.map((job) => (
              <div key={job.id} className="mb-4 md:mb-5">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-white font-semibold text-sm md:text-base">
                    {job.role}
                  </span>
                  <span className="text-[#8b949e] text-xs md:text-sm">
                    {job.company} {job.startDate && formatDate(job.startDate)} –{" "}
                    {job.current ? "now" : job.endDate ? formatDate(job.endDate) : ""}
                  </span>
                </div>
                {job.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-[#c9d1d9] text-xs md:text-sm leading-relaxed mt-1 space-y-0.5">
                    {job.achievements.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6 md:mb-8">
            <h2 className="text-[#58a6ff] uppercase text-xs md:text-sm font-semibold tracking-wide mb-3 md:mb-4">
              education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-white font-semibold text-sm md:text-base">
                    {edu.degree}
                  </span>
                  <span className="text-[#8b949e] text-xs md:text-sm">
                    {edu.institution} {edu.startDate && formatDate(edu.startDate)} –{" "}
                    {edu.endDate ? formatDate(edu.endDate) : ""}
                  </span>
                </div>
                {edu.coursework.length > 0 && (
                  <p className="text-[#8b949e] text-xs md:text-sm mt-1">
                    {edu.coursework.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6 md:mb-8">
            <h2 className="text-[#58a6ff] text-xs md:text-sm font-semibold tracking-wide mb-3 md:mb-4">
              // skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-[#c9d1d9] text-xs md:text-sm bg-[#21262d] rounded-full px-3 py-0.5"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages (optional) */}
        {languages.length > 0 && (
          <div className="mb-6 md:mb-8">
            <h2 className="text-[#58a6ff] text-xs md:text-sm font-semibold tracking-wide mb-3 md:mb-4">
              // languages
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {languages.map((lang) => (
                <span key={lang.id} className="text-[#c9d1d9] text-xs md:text-sm">
                  {lang.name} <span className="text-[#8b949e]">({lang.proficiency})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications (optional) */}
        {certifications.length > 0 && (
          <div className="mb-6 md:mb-8">
            <h2 className="text-[#58a6ff] text-xs md:text-sm font-semibold tracking-wide mb-3 md:mb-4">
              // certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="text-[#c9d1d9] text-xs md:text-sm">
                {cert.name} – {cert.organization}
              </div>
            ))}
          </div>
        )}

        {/* Stack (optional) – you can derive from skills or a custom field */}
        <div className="mt-auto">
          <h2 className="text-[#58a6ff] text-xs md:text-sm font-semibold tracking-wide mb-2 md:mb-3">
            // stack
          </h2>
          <div className="space-y-1 text-[#c9d1d9] text-xs md:text-sm">
            <div>
              <span className="text-[#8b949e]">primary</span>
              <span className="text-[#8b949e] mx-2">:</span>
              <span className="text-[#f0f6fc]">
                "{
                  skills
                    .filter(s => s.category === "Technical Skills" || s.category === "Frameworks")
                    .slice(0, 5)
                    .map(s => s.name)
                    .join(" – ")
                }"
              </span>
            </div>
            <div>
              <span className="text-[#8b949e]">infra</span>
              <span className="text-[#8b949e] mx-2">:</span>
              <span className="text-[#f0f6fc]">
                "{
                  skills
                    .filter(s => s.category === "Cloud" || s.category === "Tools")
                    .slice(0, 4)
                    .map(s => s.name)
                    .join(" – ")
                }"
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// CORRECT
// import { Fragment } from "react";
// import {
//   Github,
//   Globe,
//   Linkedin,
//   Mail,
//   MapPin,
//   Phone,
// } from "lucide-react";
// import type { Resume, SectionMeta } from "../../../data/resume";
// import { dateRange, formatResumeDate } from "./shared";
// import { cn } from "../../../lib/utils";
// import { Skeleton } from "../../../components/ui/skeleton";

// const PAGE_WIDTH = 794;
// const PAGE_HEIGHT = 1123;

// export function PreviewSkeleton() {
//   return (
//     <div className="mx-auto w-full max-w-[794px] space-y-4 rounded-xl border border-border bg-card p-10">
//       <Skeleton className="h-7 w-52" />
//       <Skeleton className="h-3 w-72" />
//       <Skeleton className="h-px w-full" />
//       {[0, 1, 2].map((i) => (
//         <div key={i} className="space-y-2 pt-4">
//           <Skeleton className="h-4 w-36" />
//           <Skeleton className="h-3 w-full" />
//           <Skeleton className="h-3 w-11/12" />
//           <Skeleton className="h-3 w-9/12" />
//         </div>
//       ))}
//     </div>
//   );
// }

// function SectionTitle({ resume, children }: { resume: Resume; children: string }) {
//   const { sectionStyle, accent, headingSize } = resume.style;
//   const isCorporate = resume.style.templateId === "corporate";
//   const base = "font-semibold uppercase tracking-[0.08em]";
  
//   return (
//     <h3
//       className={cn(
//         base,
//         sectionStyle === "underline" && "border-b pb-1",
//         sectionStyle === "boxed" && "rounded px-2 py-1",
//         isCorporate && "text-[11pt] tracking-[0.12em] border-b-2 pb-1.5"
//       )}
//       style={{
//         fontSize: `${isCorporate ? headingSize + 2 : headingSize}pt`,
//         color: sectionStyle === "boxed" ? "#ffffff" : accent,
//         borderColor: accent,
//         backgroundColor: sectionStyle === "boxed" ? accent : undefined,
//         display: "flex",
//         alignItems: "center",
//         gap: 8,
//       }}
//     >
//       {sectionStyle === "bar" && (
//         <span style={{ width: 14, height: 3, background: accent, display: "inline-block" }} />
//       )}
//       {children}
//     </h3>
//   );
// }

// function Bullets({ items, isCorporate = false }: { items: string[]; isCorporate?: boolean }) {
//   if (!items.length) return null;
//   return (
//     <ul
//       style={{
//         margin: isCorporate ? "2px 0 0" : "4px 0 0",
//         paddingLeft: isCorporate ? 14 : 16,
//         listStyleType: "disc",
//         fontSize: isCorporate ? "9.5pt" : undefined,
//       }}
//     >
//       {items.map((item, i) => (
//         <li key={i} style={{ marginBottom: isCorporate ? 1 : 2 }}>{item}</li>
//       ))}
//     </ul>
//   );
// }

// function ContactRow({ resume }: { resume: Resume }) {
//   const p = resume.content.personal;
//   const showIcons = resume.style.showIcons;
//   const isCorporate = resume.style.templateId === "corporate";
  
//   const items = [
//     { icon: Mail, value: p.email },
//     { icon: Phone, value: p.phone },
//     { icon: MapPin, value: p.location },
//     { icon: Globe, value: p.website },
//     { icon: Linkedin, value: p.linkedin },
//     { icon: Github, value: p.github },
//   ].filter((i) => Boolean(i.value));

//   if (!items.length) return null;

//   // Corporate template: inline with pipe separators
//   if (isCorporate) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "2px 12px",
//           marginTop: 4,
//           marginBottom: 8,
//           color: "#4b5563",
//           fontSize: "9.5pt",
//           justifyContent: "center",
//         }}
//       >
//         {items.map(({ value }, index) => (
//           <span key={value} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
//             {value}
//             {index < items.length - 1 && <span style={{ color: "#d1d5db", marginLeft: 4 }}>|</span>}
//           </span>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", marginTop: 6, color: "#4b5563" }}>
//       {items.map(({ icon: Icon, value }) => (
//         <span key={value} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
//           {showIcons && <Icon style={{ width: 11, height: 11 }} />}
//           {value}
//         </span>
//       ))}
//     </div>
//   );
// }

// function Header({ resume }: { resume: Resume }) {
//   const p = resume.content.personal;
//   const isCorporate = resume.style.templateId === "corporate";

//   // Corporate: centered header
//   if (isCorporate) {
//     return (
//       <header style={{ textAlign: "center", marginBottom: 14, borderBottom: "2px solid #e5e7eb", paddingBottom: 12 }}>
//         <h1 style={{ fontSize: "22pt", fontWeight: 700, letterSpacing: "-0.02em", color: "#111827", marginBottom: 2 }}>
//           {p.fullName || "Your Name"}
//         </h1>
//         {p.title && (
//           <p style={{ fontSize: "12pt", color: "#4b5563", fontWeight: 500, marginBottom: 4 }}>{p.title}</p>
//         )}
//         <ContactRow resume={resume} />
//       </header>
//     );
//   }

//   return (
//     <header style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12 }}>
//       {resume.style.showPhoto && (
//         <div
//           style={{
//             width: 62,
//             height: 62,
//             borderRadius: "50%",
//             background: `${resume.style.accent}22`,
//             display: "grid",
//             placeItems: "center",
//             color: resume.style.accent,
//             fontWeight: 700,
//             flexShrink: 0,
//           }}
//         >
//           {(p.fullName || "?")
//             .split(" ")
//             .map((w) => w[0])
//             .slice(0, 2)
//             .join("")}
//         </div>
//       )}
//       <div style={{ minWidth: 0 }}>
//         <h1 style={{ fontSize: `${resume.style.headingSize + 8}pt`, fontWeight: 800, letterSpacing: "-0.01em", color: "#111827" }}>
//           {p.fullName || "Your Name"}
//         </h1>
//         {p.title && (
//           <p style={{ fontSize: `${resume.style.fontSize + 1}pt`, color: resume.style.accent, fontWeight: 600 }}>
//             {p.title}
//           </p>
//         )}
//         <ContactRow resume={resume} />
//       </div>
//     </header>
//   );
// }

// function SectionBody({ resume, section }: { resume: Resume; section: SectionMeta }) {
//   const c = resume.content;
//   const ds = resume.style.dateStyle;
//   const accent = resume.style.accent;
//   const isCorporate = resume.style.templateId === "corporate";

//   const entryHeader = (left: string, right: string, sub?: string) => {
//     if (isCorporate) {
//       return (
//         <div style={{ marginBottom: 2 }}>
//           <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
//             <strong style={{ color: "#111827", fontSize: "10.5pt" }}>{left}</strong>
//             <span style={{ color: "#6b7280", whiteSpace: "nowrap", fontSize: "9.5pt" }}>{right}</span>
//           </div>
//           {sub && <div style={{ color: accent, fontWeight: 500, fontSize: "9.5pt" }}>{sub}</div>}
//         </div>
//       );
//     }
//     return (
//       <div>
//         <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
//           <strong style={{ color: "#111827" }}>{left}</strong>
//           <span style={{ color: "#6b7280", whiteSpace: "nowrap" }}>{right}</span>
//         </div>
//         {sub && <div style={{ color: accent, fontWeight: 500 }}>{sub}</div>}
//       </div>
//     );
//   };

//   switch (section.kind) {
//     case "summary":
//       return (
//         <div>
//           {c.summary.summary && <p style={isCorporate ? { fontSize: "9.5pt", lineHeight: 1.5 } : undefined}>{c.summary.summary}</p>}
//           {c.summary.objective && (
//             <p style={{ marginTop: 6, fontStyle: "italic", color: "#4b5563" }}>{c.summary.objective}</p>
//           )}
//         </div>
//       );
//     case "experience":
//     case "volunteer": {
//       const items = section.kind === "experience" ? c.experience : c.volunteer;
//       return (
//         <div style={{ display: "grid", gap: isCorporate ? 6 : 10 }}>
//           {items.map((e) => (
//             <div key={e.id}>
//               {entryHeader(
//                 e.role || "Role",
//                 dateRange(e.startDate, e.endDate, e.current, ds),
//                 [e.company, e.location, e.employmentType].filter(Boolean).join(" · "),
//               )}
//               {e.description && <p style={isCorporate ? { marginTop: 2, fontSize: "9.5pt" } : { marginTop: 3 }}>{e.description}</p>}
//               <Bullets items={[...e.achievements, ...e.responsibilities]} isCorporate={isCorporate} />
//             </div>
//           ))}
//         </div>
//       );
//     }
//     case "education":
//       return (
//         <div style={{ display: "grid", gap: isCorporate ? 4 : 10 }}>
//           {c.education.map((e) => (
//             <div key={e.id}>
//               {isCorporate ? (
//                 <>
//                   <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
//                     <strong style={{ color: "#111827", fontSize: "10pt" }}>{e.institution}</strong>
//                     <span style={{ color: "#6b7280", fontSize: "9pt" }}>{dateRange(e.startDate, e.endDate, false, ds)}</span>
//                   </div>
//                   <div style={{ fontSize: "9.5pt", color: "#374151" }}>{e.degree}</div>
//                   {e.grade && <div style={{ fontSize: "9pt", color: "#6b7280" }}>{e.grade}</div>}
//                 </>
//               ) : (
//                 <>
//                   {entryHeader(
//                     e.degree || "Degree",
//                     dateRange(e.startDate, e.endDate, false, ds),
//                     [e.institution, e.location, e.grade].filter(Boolean).join(" · "),
//                   )}
//                   {e.description && <p style={{ marginTop: 3 }}>{e.description}</p>}
//                   {e.coursework.length > 0 && (
//                     <p style={{ marginTop: 2, color: "#4b5563" }}>Relevant coursework: {e.coursework.join(", ")}</p>
//                   )}
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       );
//     case "skills": {
//       if (isCorporate) {
//         return (
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 16px", fontSize: "9.5pt" }}>
//             {c.skills.map((s, i) => (
//               <span key={s.id}>
//                 {s.name}
//                 {i < c.skills.length - 1 && <span style={{ marginLeft: 4, color: "#d1d5db" }}>|</span>}
//               </span>
//             ))}
//           </div>
//         );
//       }
//       const groups = new Map<string, string[]>();
//       c.skills.forEach((s) => groups.set(s.category, [...(groups.get(s.category) ?? []), s.name]));
//       return (
//         <div style={{ display: "grid", gap: 4 }}>
//           {[...groups.entries()].map(([category, names]) => (
//             <div key={category}>
//               <strong style={{ color: "#111827" }}>{category}: </strong>
//               <span>{names.join(", ")}</span>
//             </div>
//           ))}
//         </div>
//       );
//     }
//     case "projects":
//       return (
//         <div style={{ display: "grid", gap: isCorporate ? 6 : 10 }}>
//           {c.projects.map((p) => (
//             <div key={p.id}>
//               {entryHeader(p.name || "Project", dateRange(p.startDate, p.endDate, false, ds), [p.role, p.technologies.join(", ")].filter(Boolean).join(" · "))}
//               {p.description && <p style={{ marginTop: 3 }}>{p.description}</p>}
//               <Bullets items={[...p.achievements, ...p.features]} isCorporate={isCorporate} />
//               {(p.repoUrl || p.demoUrl) && (
//                 <p style={{ marginTop: 2, color: accent }}>{[p.repoUrl, p.demoUrl].filter(Boolean).join("  ·  ")}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       );
//     case "certifications":
//       return (
//         <div style={{ display: "grid", gap: isCorporate ? 4 : 6 }}>
//           {c.certifications.map((cert) => (
//             <div key={cert.id}>
//               {entryHeader(cert.name || "Certification", formatResumeDate(cert.issueDate, ds), [cert.organization, cert.credentialId].filter(Boolean).join(" · "))}
//             </div>
//           ))}
//         </div>
//       );
//     case "achievements":
//     case "awards": {
//       const items = section.kind === "achievements" ? c.achievements : c.awards;
//       return (
//         <div style={{ display: "grid", gap: isCorporate ? 4 : 8 }}>
//           {items.map((a) => (
//             <div key={a.id}>
//               {entryHeader(a.title || "Achievement", formatResumeDate(a.date, ds), a.organization)}
//               {a.description && <p style={{ marginTop: 2 }}>{a.description}</p>}
//               {a.metrics && <p style={{ color: accent }}>{a.metrics}</p>}
//             </div>
//           ))}
//         </div>
//       );
//     }
//     case "languages":
//       return (
//         <p style={isCorporate ? { fontSize: "9.5pt" } : undefined}>
//           {c.languages.map((l, i) => (
//             <Fragment key={l.id}>
//               {i > 0 && "  ·  "}
//               <strong style={{ color: "#111827" }}>{l.name}</strong> ({l.proficiency})
//             </Fragment>
//           ))}
//         </p>
//       );
//     case "publications":
//       return (
//         <div style={{ display: "grid", gap: isCorporate ? 4 : 6 }}>
//           {c.publications.map((b) => (
//             <div key={b.id}>
//               {entryHeader(b.heading || "Publication", formatResumeDate(b.date, ds), b.subheading)}
//               {b.body && <p style={{ marginTop: 2 }}>{b.body}</p>}
//             </div>
//           ))}
//         </div>
//       );
//     case "custom": {
//       const custom = c.custom[section.id];
//       if (!custom) return null;
//       return (
//         <div style={{ display: "grid", gap: isCorporate ? 4 : 8 }}>
//           {custom.description && <p style={{ color: "#4b5563" }}>{custom.description}</p>}
//           {custom.blocks.map((b) => (
//             <div key={b.id}>
//               {entryHeader(b.heading || "Entry", formatResumeDate(b.date, ds), b.subheading)}
//               {b.body && <p style={{ marginTop: 2 }}>{b.body}</p>}
//             </div>
//           ))}
//         </div>
//       );
//     }
//     case "personal":
//     default:
//       return null;
//   }
// }

// function hasContent(resume: Resume, section: SectionMeta): boolean {
//   const c = resume.content;
//   switch (section.kind) {
//     case "personal": return true;
//     case "summary": return Boolean(c.summary.summary || c.summary.objective);
//     case "experience": return c.experience.length > 0;
//     case "volunteer": return c.volunteer.length > 0;
//     case "education": return c.education.length > 0;
//     case "skills": return c.skills.length > 0;
//     case "projects": return c.projects.length > 0;
//     case "certifications": return c.certifications.length > 0;
//     case "achievements": return c.achievements.length > 0;
//     case "awards": return c.awards.length > 0;
//     case "languages": return c.languages.length > 0;
//     case "publications": return c.publications.length > 0;
//     case "custom": return Boolean(c.custom[section.id]?.blocks.length);
//     default: return false;
//   }
// }

// export function ResumeDocument({
//   resume,
//   zoom = 1,
//   className,
// }: {
//   resume: Resume;
//   zoom?: number;
//   className?: string;
// }) {
//   const { style } = resume;
//   const sections = resume.sections.filter((s) => s.visible);
//   const isCorporate = style.templateId === "corporate";

//   // Corporate: simple single-column layout
//   if (isCorporate) {
//     const allSections = sections.filter(s => s.kind !== "personal" && hasContent(resume, s));
//     return (
//       <div className={cn("flex flex-col items-center", className)}>
//         <div
//           className="relative shrink-0 overflow-hidden rounded-[3px] bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.45)] ring-1 ring-black/10"
//           style={{
//             width: PAGE_WIDTH,
//             minHeight: PAGE_HEIGHT,
//             height: 'auto',
//           }}
//         >
//           <div
//             style={{
//               padding: style.margin,
//               fontFamily: style.fontFamily,
//               fontSize: `${style.fontSize}pt`,
//               lineHeight: 1.5,
//               color: "#1f2937",
//             }}
//           >
//             <Header resume={resume} />
//             {allSections.map((section) => (
//               <section key={section.id} style={{ marginTop: 10 }}>
//                 <SectionTitle resume={resume}>{section.title}</SectionTitle>
//                 <div style={{ marginTop: 4 }}>
//                   <SectionBody resume={resume} section={section} />
//                 </div>
//               </section>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Default layout for other templates
//   const sidebarKinds = new Set(["skills", "languages", "certifications"]);
//   const useSidebar = style.layout === "sidebar";
//   const mainSections = sections.filter((s) => !useSidebar || !sidebarKinds.has(s.kind));
//   const sidebarSections = useSidebar ? sections.filter((s) => sidebarKinds.has(s.kind)) : [];

//   const renderSections = (list: SectionMeta[]) =>
//     list.map((section) => {
//       if (section.kind === "personal" || !hasContent(resume, section)) return null;
//       return (
//         <section key={section.id} style={{ marginTop: style.sectionSpacing }}>
//           <SectionTitle resume={resume}>{section.title}</SectionTitle>
//           <div style={{ marginTop: 6 }}>
//             <SectionBody resume={resume} section={section} />
//           </div>
//         </section>
//       );
//     });

//   return (
//     <div className={cn("flex flex-col items-center", className)}>
//       <div
//         className="relative shrink-0 overflow-hidden rounded-[3px] bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.45)] ring-1 ring-black/10"
//         style={{
//           width: PAGE_WIDTH,
//           minHeight: PAGE_HEIGHT,
//           height: 'auto',
//         }}
//       >
//         <div
//           style={{
//             padding: style.margin,
//             fontFamily: style.fontFamily,
//             fontSize: `${style.fontSize}pt`,
//             lineHeight: style.lineHeight,
//             color: "#1f2937",
//           }}
//         >
//           <Header resume={resume} />
//           {useSidebar ? (
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 210px", gap: 24 }}>
//               <div>{renderSections(mainSections)}</div>
//               <div>{renderSections(sidebarSections)}</div>
//             </div>
//           ) : (
//             renderSections(mainSections)
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
