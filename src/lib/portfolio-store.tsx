/**
 * Portfolio Builder state layer.
 *
 * All persistence is mocked in memory (`portfolioRepository`) but every mutation
 * is an async promise call, so the repository can be swapped for real API calls
 * without touching any component.
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
  FREE_SECTION_LIMIT,
  FREE_THEME_IDS,
  MOCK_PORTFOLIOS,
  type Plan,
  type Portfolio,
  type ThemeId,
} from "@/data/portfolio";
import { CURRENT_PLAN } from "@/data/resume";

type Listener = () => void;

const clone = (p: Portfolio): Portfolio => JSON.parse(JSON.stringify(p)) as Portfolio;

let store: Portfolio[] = MOCK_PORTFOLIOS.map(clone);
const listeners = new Set<Listener>();
const emit = () => listeners.forEach((l) => l());

export const portfolioRepository = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  list(): Portfolio[] {
    return store;
  },
  get(id: string): Portfolio | undefined {
    return store.find((p) => p.id === id);
  },
  async save(portfolio: Portfolio): Promise<Portfolio> {
    await new Promise((r) => setTimeout(r, 520));
    const next: Portfolio = { ...clone(portfolio), updatedAt: new Date().toISOString() };
    store = store.some((p) => p.id === next.id)
      ? store.map((p) => (p.id === next.id ? next : p))
      : [next, ...store];
    emit();
    return next;
  },
  async remove(id: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 380));
    store = store.filter((p) => p.id !== id);
    emit();
  },
  async duplicate(id: string): Promise<Portfolio | undefined> {
    await new Promise((r) => setTimeout(r, 480));
    const source = store.find((p) => p.id === id);
    if (!source) return undefined;
    const copy: Portfolio = {
      ...clone(source),
      id: Math.random().toString(36).slice(2, 10),
      name: `${source.name} copy`,
      status: "draft",
      publishedAt: null,
      domain: { ...source.domain, slug: `${source.domain.slug || "portfolio"}-copy` },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store = [copy, ...store];
    emit();
    return copy;
  },
  async publish(id: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 1500));
    store = store.map((p) =>
      p.id === id ? { ...p, status: "published", publishedAt: new Date().toISOString() } : p,
    );
    emit();
  },
  async unpublish(id: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 700));
    store = store.map((p) => (p.id === id ? { ...p, status: "unpublished" } : p));
    emit();
  },
};

/** Subscribes a component to the mocked portfolio collection. */
export function usePortfolioLibrary() {
  const [items, setItems] = useState<Portfolio[]>(() => portfolioRepository.list());
  useEffect(() => portfolioRepository.subscribe(() => setItems([...portfolioRepository.list()])), []);
  return items;
}

/* ------------------------------------------------------------------ */
/* Plan gating                                                         */
/* ------------------------------------------------------------------ */

interface PortfolioPlanValue {
  plan: Plan;
  isSpark: boolean;
  upgradeFeature: string | null;
  openUpgrade: (feature: string) => void;
  closeUpgrade: () => void;
  requireSpark: (feature: string) => boolean;
  themeAllowed: (id: ThemeId) => boolean;
  sectionLimit: number;
}

const PlanCtx = createContext<PortfolioPlanValue | null>(null);

export function PortfolioPlanProvider({
  children,
  plan = CURRENT_PLAN,
}: {
  children: ReactNode;
  plan?: Plan;
}) {
  const [upgradeFeature, setUpgradeFeature] = useState<string | null>(null);
  const isSpark = plan !== "free";

  const value = useMemo<PortfolioPlanValue>(
    () => ({
      plan,
      isSpark,
      upgradeFeature,
      openUpgrade: (feature) => setUpgradeFeature(feature),
      closeUpgrade: () => setUpgradeFeature(null),
      requireSpark: (feature) => {
        if (isSpark) return true;
        setUpgradeFeature(feature);
        return false;
      },
      themeAllowed: (id) => isSpark || FREE_THEME_IDS.includes(id),
      sectionLimit: isSpark ? Number.POSITIVE_INFINITY : FREE_SECTION_LIMIT,
    }),
    [plan, isSpark, upgradeFeature],
  );

  return <PlanCtx.Provider value={value}>{children}</PlanCtx.Provider>;
}

export function usePortfolioPlan(): PortfolioPlanValue {
  const ctx = useContext(PlanCtx);
  if (!ctx) throw new Error("usePortfolioPlan must be used inside <PortfolioPlanProvider>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Editor context                                                      */
/* ------------------------------------------------------------------ */

export type SaveStatus = "saved" | "saving" | "unsaved" | "error";
export type PreviewDevice = "desktop" | "tablet" | "mobile";

interface EditorValue {
  portfolio: Portfolio;
  update: (mutate: (draft: Portfolio) => void) => void;
  replace: (next: Portfolio) => void;
  saveStatus: SaveStatus;
  saveNow: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
  device: PreviewDevice;
  setDevice: (device: PreviewDevice) => void;
}

const EditorCtx = createContext<EditorValue | null>(null);

export function PortfolioEditorProvider({
  initial,
  children,
}: {
  initial: Portfolio;
  children: ReactNode;
}) {
  const [portfolio, setPortfolio] = useState<Portfolio>(() => clone(initial));
  const [past, setPast] = useState<Portfolio[]>([]);
  const [future, setFuture] = useState<Portfolio[]>([]);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [activeSectionId, setActiveSectionId] = useState<string>(
    initial.sections[0]?.id ?? "hero",
  );
  const [device, setDevice] = useState<PreviewDevice>("desktop");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef(portfolio);
  latest.current = portfolio;

  const flush = useCallback(() => {
    setSaveStatus("saving");
    portfolioRepository
      .save(latest.current)
      .then(() => setSaveStatus("saved"))
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

  const update = useCallback<EditorValue["update"]>(
    (mutate) => {
      setPortfolio((current) => {
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
    (next: Portfolio) => {
      setPortfolio((current) => {
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
      setPortfolio((current) => {
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
      setPortfolio((current) => {
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

  const value = useMemo<EditorValue>(
    () => ({
      portfolio,
      update,
      replace,
      saveStatus,
      saveNow,
      undo,
      redo,
      canUndo: past.length > 0,
      canRedo: future.length > 0,
      activeSectionId,
      setActiveSectionId,
      device,
      setDevice,
    }),
    [portfolio, update, replace, saveStatus, saveNow, undo, redo, past.length, future.length, activeSectionId, device],
  );

  return <EditorCtx.Provider value={value}>{children}</EditorCtx.Provider>;
}

export function usePortfolioEditor(): EditorValue {
  const ctx = useContext(EditorCtx);
  if (!ctx) throw new Error("usePortfolioEditor must be used inside <PortfolioEditorProvider>");
  return ctx;
}
