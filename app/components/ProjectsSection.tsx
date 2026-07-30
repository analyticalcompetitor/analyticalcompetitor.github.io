"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/LanguageProvider";
import styles from "./ProjectsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

/* Stack names and terminal output stay in English in both languages. */
const CHIPS: string[][] = [
  ["Python", "LangChain", "Embeddings", "Vector DB"],
  ["Airflow", "Pandas", "SQL", "LLM", "Docker"],
  ["Scikit-learn", "spaCy", "NLTK", "Pandas"],
];

const TERMS: ReactNode[] = [
  <>
    retrieve(question, k=5)
    <br />
    <span className={styles.dim}>→ 0.87 handbook_p12</span>
    <br />
    <span className={styles.dim}>→ 0.81 regulation_2024</span>
  </>,
  <>
    dag: daily_report
    <br />
    <span className={styles.dim}>extract → transform → plot</span>
    <br />
    <span className={styles.dim}>compose → deliver ✓ 4s</span>
  </>,
  <>
    cosine(tfidf) = 0.78
    <br />
    wmd(embeddings) = 0.41
    <br />
    <span className={styles.dim}>n = 1,240 answers</span>
  </>,
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /* ── 1. The plate.
         No parallax and no `background-attachment: fixed` here — both
         require cropping the drawing, and it has to be shown whole. It
         gets a quiet fade-and-settle instead. */
      gsap.from(plateRef.current, {
        opacity: 0,
        scale: 1.02,
        transformOrigin: "50% 30%",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      /* ── 2. Title rises out of the drawing ── */
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        })
        .from(`.${styles.eyebrow}`, { y: 16, opacity: 0, duration: 0.6 })
        .from(
          `.${styles.title}`,
          { y: 44, opacity: 0, letterSpacing: "0.3em", duration: 1 },
          "-=0.35"
        )
        .from(`.${styles.titleRule}`, { opacity: 0, duration: 0.6 }, "-=0.5");

      /* ── 3. The panel slides up over the plate, then the cards deal in ── */
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: `.${styles.panel}`,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        })
        .from(`.${styles.panel}`, { y: 70, opacity: 0, duration: 0.9 })
        .from(
          [`.${styles.panelTitle}`, `.${styles.panelLede}`],
          { y: 22, opacity: 0, stagger: 0.1, duration: 0.6 },
          "-=0.5"
        )
        .from(
          `.${styles.card}`,
          { y: 46, opacity: 0, stagger: 0.13, duration: 0.75 },
          "-=0.35"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className={styles.section} ref={sectionRef}>
      {/* ── The Vitruvian plate: whole image, full screen width, no crop ── */}
      <div className={styles.plateWrap} ref={plateRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.plate}
          src="/images/vitruvian-wide.jpg"
          alt={t.projects.plateAlt}
          width={1200}
          height={625}
          draggable={false}
        />
        <div className={styles.plateVeil} aria-hidden />

        {/* ── Title, seated above his head ── */}
        <div className={styles.titleBlock}>
          <div className={styles.eyebrow}>
            <div className={styles.numeral}>II</div>
            <div className={`${styles.cap} ${styles.eyebrowLabel}`}>
              {t.projects.eyebrow}
            </div>
          </div>

          <h2 className={`${styles.ms} ${styles.title}`}>{t.projects.title}</h2>

          <div className={styles.titleRule}>
            <span>✦</span>
          </div>
        </div>
      </div>

      {/* ── The overlay panel ── */}
      <div className={styles.panel}>
        <div className={styles.panelInner}>
          <div className={styles.panelHead}>
            <h3 className={`${styles.ms} ${styles.panelTitle}`}>
              {t.projects.panelTitle}
            </h3>
            <div className={styles.panelLede}>{t.projects.panelLede}</div>
          </div>

          <div className={styles.cards}>
            {t.projects.items.map((p, i) => (
              <div className={styles.card} key={p.title}>
                <div className={`${styles.cap} ${styles.cardMeta}`}>
                  {p.meta}
                </div>
                <div className={`${styles.ms} ${styles.cardTitle}`}>
                  {p.title}
                </div>
                <div className={styles.cardText}>{p.text}</div>

                <div className={styles.divider} />

                <div className={styles.cardResult}>
                  <b>{t.projects.resultLabel}</b> {p.result}
                </div>

                <div className={styles.chips}>
                  {CHIPS[i].map((c) => (
                    <span className={styles.chip} key={c}>
                      {c}
                    </span>
                  ))}
                </div>

                <div className={styles.term}>{TERMS[i]}</div>

                <a className={`${styles.ms} ${styles.cardLink}`} href="#">
                  {t.projects.caseStudy}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
