"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DICTIONARIES, type Dict, type Lang } from "./dictionary";

const STORAGE_KEY = "portfolio-lang";

/*
  A tiny external store rather than useState + an effect.

  The server has no idea which language this reader picked last time, so
  it must render "en". Reading localStorage during the first client
  render instead would produce different markup and break hydration.
  useSyncExternalStore is built for exactly this split: it takes a server
  snapshot and a client snapshot and reconciles them after hydration.
*/
let current: Lang | null = null;
const listeners = new Set<() => void>();

function readStored(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") return stored;
  } catch {
    // Private mode or storage disabled.
  }
  return "en";
}

function getSnapshot(): Lang {
  // Cached, because getSnapshot must return a stable value between calls.
  if (current === null) current = readStored();
  return current;
}

function getServerSnapshot(): Lang {
  return "en";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function writeLang(next: Lang) {
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Not remembered across visits, but the toggle still works today.
  }
  listeners.forEach((l) => l());
}

type LanguageValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = DICTIONARIES[lang].htmlLang;

    /*
      Portuguese runs longer than English, so every section changes height
      when the language flips. ScrollTrigger caches those measurements —
      without a refresh the pins and reveals fire at the wrong scroll
      positions. Wait a frame so the browser has laid the new text out.
    */
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang: writeLang, t: DICTIONARIES[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}

/*
  Renders *asterisk-wrapped* runs from the dictionary as italics, so the
  copy files stay plain strings instead of embedded JSX.
*/
export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 === 1 ? <i key={i}>{part}</i> : <span key={i}>{part}</span>
      )}
    </>
  );
}

/* Renders an array of strings as separate lines. */
export function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </>
  );
}
