import { useState } from "react";
import { AnimatePresence } from "motion/react";
import {
  Copy,
  Plus,
  Sparkles,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import { z } from "zod";
import {
  mockAiRewrite,
  uid,
  type AiAction,
  type AchievementItem,
  type CertificationItem,
  type CustomBlock,
  type EducationItem,
  type EmploymentType,
  type ExperienceItem,
  type LanguageItem,
  type LanguageProficiency,
  type ProjectItem,
  type Resume,
  type SkillCategory,
  type SkillItem,
  type SkillLevel,
} from "@/data/resume";
import { useResumeEditor } from "@/lib/resume-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiSuggestion, EditorSectionShell, Field, IconButton, ItemCard, useDragReorder } from "./shared";

const EMPLOYMENT_TYPES: EmploymentType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];
const SKILL_CATEGORIES: SkillCategory[] = [
  "Technical Skills",
  "Frameworks",
  "Tools",
  "Databases",
  "Cloud",
  "Soft Skills",
  "Languages",
  "Other",
];
const PROFICIENCIES: LanguageProficiency[] = [
  "Basic",
  "Conversational",
  "Professional",
  "Fluent",
  "Native",
];

const personalSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().max(32).optional(),
  website: z.string().trim().url("Enter a full URL including https://").or(z.literal("")),
  linkedin: z.string().trim().url("Enter a full URL including https://").or(z.literal("")),
  github: z.string().trim().url("Enter a full URL including https://").or(z.literal("")),
});

function fieldError(field: keyof typeof personalSchema.shape, value: string, touched: boolean) {
  if (!touched) return null;
  const single = personalSchema.shape[field];
  const result = single.safeParse(value);
  return result.success ? null : (result.error.issues[0]?.message ?? "Invalid value");
}

/* ------------------------------ text with AI ----------------------------- */

function AiTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  maxLength,
  actions = ["improve", "shorten", "expand", "professional", "ats"],
  label,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  actions?: AiAction[];
  label: string;
}) {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const run = async (action: AiAction) => {
    setSuggestion(null);
    setLoading(true);
    const result = await mockAiRewrite(action, value);
    setLoading(false);
    setSuggestion(result);
  };

  return (
    <div className="space-y-2">
      <Textarea
        value={value}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
      />
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="secondary" className="gap-1 rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-3 w-3" /> AI
        </Badge>
        {actions.map((action) => (
          <Button
            key={action}
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 rounded-full px-2.5 text-[0.7rem] capitalize"
            onClick={() => void run(action)}
            disabled={loading}
          >
            {action === "ats" ? "ATS keywords" : action}
          </Button>
        ))}
        {maxLength && (
          <span className="ml-auto text-[0.7rem] tabular-nums text-muted-foreground">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <AiSuggestion
        loading={loading}
        suggestion={suggestion}
        onApply={() => {
          if (suggestion) onChange(suggestion);
          setSuggestion(null);
        }}
        onReject={() => setSuggestion(null)}
      />
    </div>
  );
}

/* ------------------------------ bullet editor ---------------------------- */

function BulletEditor({
  label,
  items,
  onChange,
  aiAction = "bullet",
  placeholder = "Describe one outcome, starting with a strong verb",
}: {
  label: string;
  items: string[];
  onChange: (next: string[]) => void;
  aiAction?: AiAction;
  placeholder?: string;
}) {
  const [busyIndex, setBusyIndex] = useState<number | null>(null);
  const [suggestion, setSuggestion] = useState<{ index: number; text: string } | null>(null);
  const { handlers, dragIndex } = useDragReorder((from, to) => {
    const next = [...items];
    const [moved] = next.splice(from, 1);
    if (moved !== undefined) next.splice(to, 0, moved);
    onChange(next);
  });

  const set = (index: number, value: string) =>
    onChange(items.map((item, i) => (i === index ? value : item)));

  return (
    <Field label={label} hint="Drag to reorder. Aim for two to four measurable bullets.">
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <div
              {...handlers(index)}
              className={`flex items-start gap-1.5 ${dragIndex === index ? "opacity-50" : ""}`}
            >
              <Textarea
                value={item}
                rows={2}
                placeholder={placeholder}
                aria-label={`${label} ${index + 1}`}
                onChange={(event) => set(index, event.target.value)}
                className="min-h-16"
              />
              <div className="flex shrink-0 flex-col">
                <IconButton
                  label="Rewrite with AI"
                  onClick={() => {
                    setSuggestion(null);
                    setBusyIndex(index);
                    void mockAiRewrite(aiAction, item).then((text) => {
                      setBusyIndex(null);
                      setSuggestion({ index, text });
                    });
                  }}
                >
                  <Wand2 className="h-3.5 w-3.5" />
                </IconButton>
                <IconButton
                  label="Remove bullet"
                  onClick={() => onChange(items.filter((_, i) => i !== index))}
                >
                  <X className="h-3.5 w-3.5" />
                </IconButton>
              </div>
            </div>
            {(busyIndex === index || suggestion?.index === index) && (
              <AiSuggestion
                loading={busyIndex === index}
                suggestion={suggestion?.index === index ? suggestion.text : null}
                onApply={() => {
                  if (suggestion) set(index, suggestion.text);
                  setSuggestion(null);
                }}
                onReject={() => setSuggestion(null)}
              />
            )}
          </div>
        ))}
        <Button
          type="button"
          size="sm"
          variant="soft"
          className="rounded-full"
          onClick={() => onChange([...items, ""])}
        >
          <Plus /> Add bullet
        </Button>
      </div>
    </Field>
  );
}

/* ------------------------------ tag editor ------------------------------- */

function TagEditor({
  label,
  items,
  onChange,
  placeholder = "Add and press Enter",
}: {
  label: string;
  items: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");
  const commit = () => {
    const value = draft.trim();
    if (!value || items.includes(value)) return setDraft("");
    onChange([...items, value]);
    setDraft("");
  };
  return (
    <Field label={label}>
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-input bg-background p-2">
        {items.map((item) => (
          <Badge key={item} variant="secondary" className="gap-1 rounded-full">
            {item}
            <button
              type="button"
              aria-label={`Remove ${item}`}
              onClick={() => onChange(items.filter((i) => i !== item))}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <input
          value={draft}
          placeholder={placeholder}
          aria-label={label}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              commit();
            }
          }}
          onBlur={commit}
          className="min-w-28 flex-1 bg-transparent px-1 text-sm outline-none"
        />
      </div>
    </Field>
  );
}

/* ------------------------------ list scaffold ---------------------------- */

function ListEditor<T extends { id: string }>({
  items,
  onChange,
  create,
  titleOf,
  subtitleOf,
  addLabel,
  render,
}: {
  items: T[];
  onChange: (next: T[]) => void;
  create: () => T;
  titleOf: (item: T) => string;
  subtitleOf: (item: T) => string;
  addLabel: string;
  render: (item: T, patch: (changes: Partial<T>) => void) => React.ReactNode;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const { handlers, dragIndex } = useDragReorder((from, to) => {
    const next = [...items];
    const [moved] = next.splice(from, 1);
    if (moved) next.splice(to, 0, moved);
    onChange(next);
  });

  const patchAt = (id: string) => (changes: Partial<T>) =>
    onChange(items.map((item) => (item.id === id ? { ...item, ...changes } : item)));

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          <ItemCard
            key={item.id}
            title={titleOf(item)}
            subtitle={subtitleOf(item)}
            active={openId === item.id}
            dragProps={{ ...handlers(index), className: dragIndex === index ? "opacity-50" : "" }}
            actions={
              <>
                <IconButton
                  label="Duplicate"
                  onClick={() => onChange([...items, { ...item, id: uid() }])}
                >
                  <Copy className="h-3.5 w-3.5" />
                </IconButton>
                <IconButton label="Delete" onClick={() => onChange(items.filter((i) => i.id !== item.id))}>
                  <Trash2 className="h-3.5 w-3.5" />
                </IconButton>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2 text-xs"
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                >
                  {openId === item.id ? "Collapse" : "Edit"}
                </Button>
              </>
            }
          >
            {openId === item.id ? render(item, patchAt(item.id)) : null}
          </ItemCard>
        ))}
      </AnimatePresence>
      <Button
        type="button"
        variant="soft"
        className="w-full rounded-xl"
        onClick={() => {
          const item = create();
          onChange([...items, item]);
          setOpenId(item.id);
        }}
      >
        <Plus /> {addLabel}
      </Button>
    </div>
  );
}

const two = "grid gap-4 sm:grid-cols-2";

/* ------------------------------ section forms ---------------------------- */

function PersonalForm() {
  const { resume, update } = useResumeEditor();
  const p = resume.content.personal;
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const set = (changes: Partial<typeof p>) =>
    update((draft) => {
      draft.content.personal = { ...draft.content.personal, ...changes };
    });

  const text = (
    key: keyof typeof personalSchema.shape,
    label: string,
    placeholder: string,
    type = "text",
  ) => {
    const value = String(p[key] ?? "");
    const error = fieldError(key, value, touched[key] ?? false);
    return (
      <Field label={label} htmlFor={`personal-${key}`}>
        <Input
          id={`personal-${key}`}
          type={type}
          value={value}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          onChange={(event) => set({ [key]: event.target.value } as Partial<typeof p>)}
          onBlur={() => setTouched((t) => ({ ...t, [key]: true }))}
        />
        {error && <p className="text-[0.7rem] text-destructive">{error}</p>}
      </Field>
    );
  };

  return (
    <EditorSectionShell
      title="Personal information"
      description="Recruiters read this block first — keep it factual and complete."
    >
      <div className={two}>
        {text("fullName", "Full name", "Amara Okafor")}
        <Field label="Professional title" htmlFor="personal-title">
          <Input
            id="personal-title"
            value={p.title}
            placeholder="Senior Frontend Engineer"
            onChange={(event) => set({ title: event.target.value })}
          />
        </Field>
        {text("email", "Email", "you@example.com", "email")}
        {text("phone", "Phone", "+1 555 010 4477", "tel")}
        <Field label="Location" htmlFor="personal-location">
          <Input
            id="personal-location"
            value={p.location}
            placeholder="Berlin, Germany"
            onChange={(event) => set({ location: event.target.value })}
          />
        </Field>
        {text("website", "Website / Portfolio", "https://yourdomain.com", "url")}
        {text("linkedin", "LinkedIn", "https://linkedin.com/in/you", "url")}
        {text("github", "GitHub", "https://github.com/you", "url")}
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Additional links
        </p>
        <div className={two}>
          <Field label="Twitter / X">
            <Input value={p.twitter} onChange={(e) => set({ twitter: e.target.value })} />
          </Field>
          <Field label="Behance">
            <Input value={p.behance} onChange={(e) => set({ behance: e.target.value })} />
          </Field>
          <Field label="Dribbble">
            <Input value={p.dribbble} onChange={(e) => set({ dribbble: e.target.value })} />
          </Field>
          <Field label="Photo URL" hint="Photos can reduce ATS parsing reliability.">
            <Input value={p.photoUrl} onChange={(e) => set({ photoUrl: e.target.value })} />
          </Field>
        </div>
      </div>
    </EditorSectionShell>
  );
}

function SummaryForm() {
  const { resume, update } = useResumeEditor();
  const s = resume.content.summary;
  return (
    <EditorSectionShell
      title="Professional summary"
      description="Three lines: seniority and domain, one signature result, and what you want next."
    >
      <Field label="Summary" hint="Recommended 400–600 characters.">
        <AiTextarea
          label="Professional summary"
          value={s.summary}
          rows={6}
          maxLength={800}
          onChange={(summary) =>
            update((draft) => {
              draft.content.summary.summary = summary;
            })
          }
          placeholder="Senior frontend engineer with 7 years building design systems..."
        />
      </Field>
      <Field label="Career objective (optional)" hint="Useful for career changes or targeted roles.">
        <AiTextarea
          label="Career objective"
          value={s.objective}
          rows={3}
          maxLength={300}
          actions={["improve", "shorten", "professional"]}
          onChange={(objective) =>
            update((draft) => {
              draft.content.summary.objective = objective;
            })
          }
        />
      </Field>
    </EditorSectionShell>
  );
}

function ExperienceForm({ volunteer = false }: { volunteer?: boolean }) {
  const { resume, update } = useResumeEditor();
  const items = volunteer ? resume.content.volunteer : resume.content.experience;
  const write = (next: ExperienceItem[]) =>
    update((draft) => {
      if (volunteer) draft.content.volunteer = next;
      else draft.content.experience = next;
    });

  return (
    <EditorSectionShell
      title={volunteer ? "Volunteer experience" : "Work experience"}
      description="Most recent first. Lead every bullet with a verb and a number where you have one."
    >
      <ListEditor<ExperienceItem>
        items={items}
        onChange={write}
        addLabel={volunteer ? "Add volunteer role" : "Add position"}
        titleOf={(item) => item.role || "New position"}
        subtitleOf={(item) => [item.company, item.location].filter(Boolean).join(" · ")}
        create={() => ({
          id: uid(),
          role: "",
          company: "",
          location: "",
          employmentType: "Full-time",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          responsibilities: [],
          achievements: [],
        })}
        render={(item, patch) => (
          <>
            <div className={two}>
              <Field label="Job title">
                <Input value={item.role} onChange={(e) => patch({ role: e.target.value })} />
              </Field>
              <Field label="Company">
                <Input value={item.company} onChange={(e) => patch({ company: e.target.value })} />
              </Field>
              <Field label="Location">
                <Input value={item.location} onChange={(e) => patch({ location: e.target.value })} />
              </Field>
              <Field label="Employment type">
                <Select
                  value={item.employmentType}
                  onValueChange={(value) => patch({ employmentType: value as EmploymentType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYMENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Start date">
                <Input
                  type="month"
                  value={item.startDate}
                  onChange={(e) => patch({ startDate: e.target.value })}
                />
              </Field>
              <Field label="End date">
                <Input
                  type="month"
                  value={item.endDate}
                  disabled={item.current}
                  onChange={(e) => patch({ endDate: e.target.value })}
                />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <Switch
                checked={item.current}
                onCheckedChange={(checked) => patch({ current: checked, endDate: checked ? "" : item.endDate })}
              />
              I currently work here
            </label>
            <Field label="Role summary">
              <AiTextarea
                label="Role summary"
                value={item.description}
                rows={3}
                onChange={(description) => patch({ description })}
              />
            </Field>
            <BulletEditor
              label="Key achievements"
              items={item.achievements}
              aiAction="achievement"
              onChange={(achievements) => patch({ achievements })}
            />
            <BulletEditor
              label="Responsibilities"
              items={item.responsibilities}
              onChange={(responsibilities) => patch({ responsibilities })}
              placeholder="Owned the checkout experience across web and mobile"
            />
          </>
        )}
      />
    </EditorSectionShell>
  );
}

function EducationForm() {
  const { resume, update } = useResumeEditor();
  return (
    <EditorSectionShell title="Education" description="Degrees, bootcamps and relevant coursework.">
      <ListEditor<EducationItem>
        items={resume.content.education}
        onChange={(next) =>
          update((draft) => {
            draft.content.education = next;
          })
        }
        addLabel="Add education"
        titleOf={(item) => item.degree || "New qualification"}
        subtitleOf={(item) => item.institution}
        create={() => ({
          id: uid(),
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          grade: "",
          description: "",
          coursework: [],
        })}
        render={(item, patch) => (
          <>
            <div className={two}>
              <Field label="Degree">
                <Input value={item.degree} onChange={(e) => patch({ degree: e.target.value })} />
              </Field>
              <Field label="Institution">
                <Input value={item.institution} onChange={(e) => patch({ institution: e.target.value })} />
              </Field>
              <Field label="Location">
                <Input value={item.location} onChange={(e) => patch({ location: e.target.value })} />
              </Field>
              <Field label="Grade / GPA">
                <Input value={item.grade} onChange={(e) => patch({ grade: e.target.value })} />
              </Field>
              <Field label="Start date">
                <Input type="month" value={item.startDate} onChange={(e) => patch({ startDate: e.target.value })} />
              </Field>
              <Field label="End date">
                <Input type="month" value={item.endDate} onChange={(e) => patch({ endDate: e.target.value })} />
              </Field>
            </div>
            <TagEditor
              label="Relevant coursework"
              items={item.coursework}
              onChange={(coursework) => patch({ coursework })}
            />
            <Field label="Notes">
              <Textarea
                value={item.description}
                rows={2}
                onChange={(e) => patch({ description: e.target.value })}
              />
            </Field>
          </>
        )}
      />
    </EditorSectionShell>
  );
}

function SkillsForm() {
  const { resume, update } = useResumeEditor();
  const skills = resume.content.skills;
  const write = (next: SkillItem[]) =>
    update((draft) => {
      draft.content.skills = next;
    });
  const [draft, setDraft] = useState("");
  const [category, setCategory] = useState<SkillCategory>("Technical Skills");

  const suggestions = ["TypeScript", "React", "Testing", "Accessibility", "CI/CD", "GraphQL"].filter(
    (s) => !skills.some((skill) => skill.name.toLowerCase() === s.toLowerCase()),
  );

  const add = (name: string, cat: SkillCategory = category) => {
    const value = name.trim();
    if (!value) return;
    write([...skills, { id: uid(), name: value, category: cat, level: 4 }]);
    setDraft("");
  };

  const grouped = SKILL_CATEGORIES.map((cat) => ({
    cat,
    items: skills.filter((s) => s.category === cat),
  })).filter((g) => g.items.length);

  return (
    <EditorSectionShell
      title="Skills"
      description="Group by category and only list tools you can defend in an interview."
    >
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_180px_auto]">
        <Input
          value={draft}
          placeholder="Add a skill"
          aria-label="Add a skill"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add(draft);
            }
          }}
        />
        <Select value={category} onValueChange={(value) => setCategory(value as SkillCategory)}>
          <SelectTrigger aria-label="Skill category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SKILL_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="button" variant="soft" onClick={() => add(draft)}>
          <Plus /> Add
        </Button>
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[0.7rem] font-semibold text-primary">
            <Sparkles className="h-3 w-3" /> Suggested
          </span>
          {suggestions.map((s) => (
            <Button
              key={s}
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 rounded-full border border-dashed border-border px-2.5 text-[0.7rem]"
              onClick={() => add(s, "Technical Skills")}
            >
              + {s}
            </Button>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {grouped.map(({ cat, items }) => (
          <div key={cat} className="rounded-2xl border border-border bg-card/60 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {cat}
            </p>
            <div className="space-y-3">
              {items.map((skill) => (
                <div key={skill.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{skill.name}</p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <Slider
                        value={[skill.level]}
                        min={1}
                        max={5}
                        step={1}
                        aria-label={`${skill.name} proficiency`}
                        className="max-w-40"
                        onValueChange={([level]) =>
                          write(
                            skills.map((s) =>
                              s.id === skill.id ? { ...s, level: (level ?? 3) as SkillLevel } : s,
                            ),
                          )
                        }
                      />
                      <span className="text-[0.7rem] text-muted-foreground">{skill.level}/5</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button type="button" size="sm" variant="ghost" className="h-8 text-xs">
                          Move
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {SKILL_CATEGORIES.map((c) => (
                          <DropdownMenuItem
                            key={c}
                            onSelect={() =>
                              write(skills.map((s) => (s.id === skill.id ? { ...s, category: c } : s)))
                            }
                          >
                            {c}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <IconButton
                      label={`Remove ${skill.name}`}
                      onClick={() => write(skills.filter((s) => s.id !== skill.id))}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </EditorSectionShell>
  );
}

function ProjectsForm() {
  const { resume, update } = useResumeEditor();
  return (
    <EditorSectionShell title="Projects" description="Shipped work with the stack and one measurable outcome.">
      <ListEditor<ProjectItem>
        items={resume.content.projects}
        onChange={(next) =>
          update((draft) => {
            draft.content.projects = next;
          })
        }
        addLabel="Add project"
        titleOf={(item) => item.name || "New project"}
        subtitleOf={(item) => item.technologies.join(", ")}
        create={() => ({
          id: uid(),
          name: "",
          role: "",
          description: "",
          technologies: [],
          repoUrl: "",
          demoUrl: "",
          startDate: "",
          endDate: "",
          achievements: [],
          features: [],
        })}
        render={(item, patch) => (
          <>
            <div className={two}>
              <Field label="Project name">
                <Input value={item.name} onChange={(e) => patch({ name: e.target.value })} />
              </Field>
              <Field label="Your role">
                <Input value={item.role} onChange={(e) => patch({ role: e.target.value })} />
              </Field>
              <Field label="Repository URL">
                <Input value={item.repoUrl} onChange={(e) => patch({ repoUrl: e.target.value })} />
              </Field>
              <Field label="Live demo URL">
                <Input value={item.demoUrl} onChange={(e) => patch({ demoUrl: e.target.value })} />
              </Field>
              <Field label="Start date">
                <Input type="month" value={item.startDate} onChange={(e) => patch({ startDate: e.target.value })} />
              </Field>
              <Field label="End date">
                <Input type="month" value={item.endDate} onChange={(e) => patch({ endDate: e.target.value })} />
              </Field>
            </div>
            <TagEditor
              label="Technologies"
              items={item.technologies}
              onChange={(technologies) => patch({ technologies })}
            />
            <Field label="Description">
              <AiTextarea
                label="Project description"
                value={item.description}
                rows={3}
                onChange={(description) => patch({ description })}
              />
            </Field>
            <BulletEditor
              label="Outcomes"
              items={item.achievements}
              onChange={(achievements) => patch({ achievements })}
            />
            <BulletEditor
              label="Key features"
              items={item.features}
              onChange={(features) => patch({ features })}
              placeholder="Offline-first sync with conflict resolution"
            />
          </>
        )}
      />
    </EditorSectionShell>
  );
}

function CertificationsForm() {
  const { resume, update } = useResumeEditor();
  return (
    <EditorSectionShell title="Certifications" description="Credentials with verifiable IDs where possible.">
      <ListEditor<CertificationItem>
        items={resume.content.certifications}
        onChange={(next) =>
          update((draft) => {
            draft.content.certifications = next;
          })
        }
        addLabel="Add certification"
        titleOf={(item) => item.name || "New certification"}
        subtitleOf={(item) => item.organization}
        create={() => ({
          id: uid(),
          name: "",
          organization: "",
          issueDate: "",
          expirationDate: "",
          credentialId: "",
          credentialUrl: "",
        })}
        render={(item, patch) => (
          <div className={two}>
            <Field label="Certification name">
              <Input value={item.name} onChange={(e) => patch({ name: e.target.value })} />
            </Field>
            <Field label="Issuing organization">
              <Input value={item.organization} onChange={(e) => patch({ organization: e.target.value })} />
            </Field>
            <Field label="Issue date">
              <Input type="month" value={item.issueDate} onChange={(e) => patch({ issueDate: e.target.value })} />
            </Field>
            <Field label="Expiration date">
              <Input
                type="month"
                value={item.expirationDate}
                onChange={(e) => patch({ expirationDate: e.target.value })}
              />
            </Field>
            <Field label="Credential ID">
              <Input value={item.credentialId} onChange={(e) => patch({ credentialId: e.target.value })} />
            </Field>
            <Field label="Credential URL">
              <Input value={item.credentialUrl} onChange={(e) => patch({ credentialUrl: e.target.value })} />
            </Field>
          </div>
        )}
      />
    </EditorSectionShell>
  );
}

function AchievementsForm({ awards = false }: { awards?: boolean }) {
  const { resume, update } = useResumeEditor();
  const items = awards ? resume.content.awards : resume.content.achievements;
  return (
    <EditorSectionShell
      title={awards ? "Awards" : "Achievements"}
      description="Quantify the impact — numbers make these lines credible."
    >
      <ListEditor<AchievementItem>
        items={items}
        onChange={(next) =>
          update((draft) => {
            if (awards) draft.content.awards = next;
            else draft.content.achievements = next;
          })
        }
        addLabel={awards ? "Add award" : "Add achievement"}
        titleOf={(item) => item.title || "New entry"}
        subtitleOf={(item) => item.organization}
        create={() => ({ id: uid(), title: "", organization: "", date: "", description: "", metrics: "" })}
        render={(item, patch) => (
          <>
            <div className={two}>
              <Field label="Title">
                <Input value={item.title} onChange={(e) => patch({ title: e.target.value })} />
              </Field>
              <Field label="Organization">
                <Input value={item.organization} onChange={(e) => patch({ organization: e.target.value })} />
              </Field>
              <Field label="Date">
                <Input type="month" value={item.date} onChange={(e) => patch({ date: e.target.value })} />
              </Field>
              <Field label="Metrics">
                <Input
                  value={item.metrics}
                  placeholder="Top 2% of 1,400 entrants"
                  onChange={(e) => patch({ metrics: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Description">
              <AiTextarea
                label="Achievement description"
                value={item.description}
                rows={2}
                actions={["improve", "shorten", "achievement"]}
                onChange={(description) => patch({ description })}
              />
            </Field>
          </>
        )}
      />
    </EditorSectionShell>
  );
}

function LanguagesForm() {
  const { resume, update } = useResumeEditor();
  return (
    <EditorSectionShell title="Languages" description="Spoken languages and honest proficiency levels.">
      <ListEditor<LanguageItem>
        items={resume.content.languages}
        onChange={(next) =>
          update((draft) => {
            draft.content.languages = next;
          })
        }
        addLabel="Add language"
        titleOf={(item) => item.name || "New language"}
        subtitleOf={(item) => item.proficiency}
        create={() => ({ id: uid(), name: "", proficiency: "Professional" })}
        render={(item, patch) => (
          <div className={two}>
            <Field label="Language">
              <Input value={item.name} onChange={(e) => patch({ name: e.target.value })} />
            </Field>
            <Field label="Proficiency">
              <Select
                value={item.proficiency}
                onValueChange={(value) => patch({ proficiency: value as LanguageProficiency })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROFICIENCIES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        )}
      />
    </EditorSectionShell>
  );
}

function BlockListForm({
  sectionId,
  title,
  description,
  publications = false,
}: {
  sectionId: string;
  title: string;
  description: string;
  publications?: boolean;
}) {
  const { resume, update } = useResumeEditor();
  const custom = resume.content.custom[sectionId];
  const items = publications ? resume.content.publications : (custom?.blocks ?? []);

  const write = (next: CustomBlock[]) =>
    update((draft) => {
      if (publications) draft.content.publications = next;
      else {
        const target = draft.content.custom[sectionId] ?? { description: "", blocks: [] };
        target.blocks = next;
        draft.content.custom[sectionId] = target;
      }
    });

  return (
    <EditorSectionShell
      title={title}
      description={description}
      action={
        !publications ? (
          <Input
            value={resume.sections.find((s) => s.id === sectionId)?.title ?? ""}
            aria-label="Section title"
            className="h-9 w-44"
            onChange={(event) =>
              update((draft) => {
                const target = draft.sections.find((s) => s.id === sectionId);
                if (target) target.title = event.target.value;
              })
            }
          />
        ) : undefined
      }
    >
      <ListEditor<CustomBlock>
        items={items}
        onChange={write}
        addLabel="Add entry"
        titleOf={(item) => item.heading || "New entry"}
        subtitleOf={(item) => item.subheading}
        create={() => ({ id: uid(), heading: "", subheading: "", date: "", body: "" })}
        render={(item, patch) => (
          <>
            <div className={two}>
              <Field label="Heading">
                <Input value={item.heading} onChange={(e) => patch({ heading: e.target.value })} />
              </Field>
              <Field label="Subheading">
                <Input value={item.subheading} onChange={(e) => patch({ subheading: e.target.value })} />
              </Field>
              <Field label="Date">
                <Input type="month" value={item.date} onChange={(e) => patch({ date: e.target.value })} />
              </Field>
            </div>
            <Field label="Details">
              <AiTextarea
                label="Entry details"
                value={item.body}
                rows={3}
                onChange={(body) => patch({ body })}
              />
            </Field>
          </>
        )}
      />
    </EditorSectionShell>
  );
}

/* ------------------------------ dispatcher ------------------------------- */

export function SectionEditor() {
  const { resume, activeSectionId } = useResumeEditor();
  const section = resume.sections.find((s) => s.id === activeSectionId) ?? resume.sections[0];
  if (!section) return null;

  switch (section.kind) {
    case "personal":
      return <PersonalForm />;
    case "summary":
      return <SummaryForm />;
    case "experience":
      return <ExperienceForm />;
    case "volunteer":
      return <ExperienceForm volunteer />;
    case "education":
      return <EducationForm />;
    case "skills":
      return <SkillsForm />;
    case "projects":
      return <ProjectsForm />;
    case "certifications":
      return <CertificationsForm />;
    case "achievements":
      return <AchievementsForm />;
    case "awards":
      return <AchievementsForm awards />;
    case "languages":
      return <LanguagesForm />;
    case "publications":
      return (
        <BlockListForm
          publications
          sectionId={section.id}
          title="Publications"
          description="Papers, articles and talks with links where available."
        />
      );
    case "custom":
    default:
      return (
        <BlockListForm
          sectionId={section.id}
          title={section.title}
          description="A flexible section — rename it and add any entries you need."
        />
      );
  }
}

export type { Resume };
