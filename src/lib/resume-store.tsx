/**
 * Resume Builder state layer.
 *
 * Persistence is mocked in-memory (`resumeRepository`) but every mutation goes
 * through an async, promise-based repository call so the same components can be
 * pointed at real backend endpoints later without changes.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CURRENT_PLAN,
  MOCK_RESUMES,
  createBlankResume,
  uid,
  type Plan,
  type Resume,
} from "../data/resume";

/* ------------------------------------------------------------------ */
/* Mock repository                                                     */
/* ------------------------------------------------------------------ */

type Listener = () => void;

const clone = (r: Resume): Resume => JSON.parse(JSON.stringify(r)) as Resume;

let store: Resume[] = MOCK_RESUMES.map(clone);
const listeners = new Set<Listener>();
const emit = () => listeners.forEach((l) => l());

export const resumeRepository = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  list(): Resume[] {
    return store;
  },
  get(id: string): Resume | undefined {
    return store.find((r) => r.id === id);
  },
  async save(resume: Resume): Promise<Resume> {
    await new Promise((r) => setTimeout(r, 550));
    const next = { ...clone(resume), updatedAt: new Date().toISOString() };
    store = store.some((r) => r.id === next.id)
      ? store.map((r) => (r.id === next.id ? next : r))
      : [...store, next];
    emit();
    return next;
  },
  async create(name?: string): Promise<Resume> {
    const resume = createBlankResume(name);
    store = [...store, resume];
    emit();
    return resume;
  },
  async duplicate(id: string): Promise<Resume | undefined> {
    const source = store.find((r) => r.id === id);
    if (!source) return undefined;
    const copy: Resume = {
      ...clone(source),
      id: uid(),
      name: `${source.name} (copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store = [...store, copy];
    emit();
    return copy;
  },
  async remove(id: string): Promise<void> {
    store = store.filter((r) => r.id !== id);
    emit();
  },
  /** Test/dev helper used by the empty-state flows. */
  async clear(): Promise<void> {
    store = [];
    emit();
  },
};

export function useResumeLibrary() {
  const [resumes, setResumes] = useState<Resume[]>(() => resumeRepository.list());
  useEffect(() => {
    const unsubscribe = resumeRepository.subscribe(() => setResumes(resumeRepository.list()));
    return () => {
      unsubscribe();
    };
  }, []);
  return { resumes, repository: resumeRepository };
}

/* ------------------------------------------------------------------ */
/* Plan context                                                        */
/* ------------------------------------------------------------------ */

interface PlanContextValue {
  plan: Plan;
  isSpark: boolean;
  requireSpark: (feature: string) => boolean;
  upgradeFeature: string | null;
  closeUpgrade: () => void;
  openUpgrade: (feature: string) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children, plan = CURRENT_PLAN }: { children: ReactNode; plan?: Plan }) {
  const [upgradeFeature, setUpgradeFeature] = useState<string | null>(null);
  const isSpark = plan !== "free";

  const value = useMemo<PlanContextValue>(
    () => ({
      plan,
      isSpark,
      openUpgrade: (feature: string) => setUpgradeFeature(feature),
      closeUpgrade: () => setUpgradeFeature(null),
      requireSpark: (feature: string) => {
        if (isSpark) return true;
        setUpgradeFeature(feature);
        return false;
      },
      upgradeFeature,
    }),
    [plan, isSpark, upgradeFeature],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Editor context: history + autosave                                  */
/* ------------------------------------------------------------------ */

export type SaveStatus = "saved" | "saving" | "unsaved" | "error";

interface EditorContextValue {
  resume: Resume;
  update: (mutate: (draft: Resume) => void, options?: { historyLabel?: string }) => void;
  replace: (next: Resume) => void;
  saveStatus: SaveStatus;
  lastSavedAt: Date | null;
  saveNow: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
}

const EditorContext = createContext<EditorContextValue | null>(null);

export function ResumeEditorProvider({
  initial,
  children,
}: {
  initial: Resume;
  children: ReactNode;
}) {
  const [resume, setResume] = useState<Resume>(() => clone(initial));
  const [past, setPast] = useState<Resume[]>([]);
  const [future, setFuture] = useState<Resume[]>([]);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(new Date());
  const [activeSectionId, setActiveSectionId] = useState<string>(
    initial.sections[0]?.id ?? "personal",
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef(resume);
  latest.current = resume;

  const flush = useCallback(() => {
    setSaveStatus("saving");
    resumeRepository
      .save(latest.current)
      .then(() => {
        setSaveStatus("saved");
        setLastSavedAt(new Date());
      })
      .catch(() => setSaveStatus("error"));
  }, []);

  const queueSave = useCallback(() => {
    setSaveStatus("unsaved");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(flush, 1400);
  }, [flush]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  // Warn on unsaved changes before leaving.
  useEffect(() => {
    if (saveStatus === "saved") return;
    const handler = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [saveStatus]);

  const update = useCallback<EditorContextValue["update"]>(
    (mutate) => {
      setResume((current) => {
        const draft = clone(current);
        mutate(draft);
        setPast((p) => [...p.slice(-49), current]);
        setFuture([]);
        return draft;
      });
      queueSave();
    },
    [queueSave],
  );

  const replace = useCallback(
    (next: Resume) => {
      setResume((current) => {
        setPast((p) => [...p.slice(-49), current]);
        setFuture([]);
        return clone(next);
      });
      queueSave();
    },
    [queueSave],
  );

  const undo = useCallback(() => {
    setPast((p) => {
      if (!p.length) return p;
      const previous = p[p.length - 1]!;
      setResume((current) => {
        setFuture((f) => [current, ...f]);
        return previous;
      });
      queueSave();
      return p.slice(0, -1);
    });
  }, [queueSave]);

  const redo = useCallback(() => {
    setFuture((f) => {
      if (!f.length) return f;
      const next = f[0]!;
      setResume((current) => {
        setPast((p) => [...p, current]);
        return next;
      });
      queueSave();
      return f.slice(1);
    });
  }, [queueSave]);

  const saveNow = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    flush();
  }, [flush]);

  // Keyboard shortcuts: save / undo / redo
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey;
      if (!mod) return;
      const key = event.key.toLowerCase();
      if (key === "s") {
        event.preventDefault();
        saveNow();
      } else if (key === "z" && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if ((key === "z" && event.shiftKey) || key === "y") {
        event.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [saveNow, undo, redo]);

  const value = useMemo<EditorContextValue>(
    () => ({
      resume,
      update,
      replace,
      saveStatus,
      lastSavedAt,
      saveNow,
      undo,
      redo,
      canUndo: past.length > 0,
      canRedo: future.length > 0,
      activeSectionId,
      setActiveSectionId,
    }),
    [resume, update, replace, saveStatus, lastSavedAt, saveNow, undo, redo, past.length, future.length, activeSectionId],
  );

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

export function useResumeEditor(): EditorContextValue {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useResumeEditor must be used inside <ResumeEditorProvider>");
  return ctx;
}
