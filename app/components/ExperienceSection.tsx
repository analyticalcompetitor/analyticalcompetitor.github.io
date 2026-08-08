"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Emphasis, Lines, useLanguage } from "../i18n/LanguageProvider";
import styles from "./ExperienceSection.module.css";

gsap.registerPlugin(ScrollTrigger);

/* Stack names stay in English in both languages. */
const CHIPS: string[][] = [
  ["Python", "Pandas", "Airflow", "Docker", "LLMs", "Angular", "TypeScript"],
  ["JavaScript", "Next.js", "React", "HTML", "CSS"],
  ["Python", "Scikit-learn", "Pandas", "spaCy", "NLTK", "Gensim"],
  ["Java"],
  [],
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const codexRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /* ── 1. Slow drift on the codex backdrop ── */
      gsap.fromTo(
        codexRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      /* ── 2. Header and title ── */
      gsap
        .timeline({
          defaults: { ease: "power3.out", duration: 0.6 },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        })
        .from(`.${styles.numeral}`, { scale: 0.4, opacity: 0, duration: 0.5 })
        .from(`.${styles.headerLabel}`, { x: -14, opacity: 0 }, "-=0.3")
        .from(`.${styles.headerRule}`, { scaleX: 0, duration: 0.9 }, "-=0.35")
        .from(`.${styles.title}`, { y: 26, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(`.${styles.cvLink}`, { x: 18, opacity: 0 }, "-=0.5");

      /* ── 3. The aside, sliding in from the right ── */
      gsap.from(`.${styles.aside}`, {
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.ledger}`,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      /* ── 4. Ledger rows written in one at a time, each with its chips
         following after. ── */
      gsap.utils.toArray<HTMLElement>(`.${styles.entry}`).forEach((entry) => {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: entry,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          })
          .from(entry, { opacity: 0, y: 26, duration: 0.6 })
          .from(
            entry.querySelectorAll(`.${styles.chip}`),
            { opacity: 0, y: 8, stagger: 0.03, duration: 0.3 },
            "-=0.25"
          );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      {/* ── Codex backdrop ── */}
      <div className={styles.backdrop} aria-hidden>
        <div className={styles.codex} ref={codexRef} />
        <div className={styles.veil} />
      </div>

      <div className={styles.inner}>
        {/* ── Section header ── */}
        <div className={styles.header}>
          <div className={styles.numeral}>III</div>
          <div className={`${styles.cap} ${styles.headerLabel}`}>
            {t.experience.eyebrow}
          </div>
          <div className={styles.headerRule} />
        </div>

        <div className={styles.titleRow}>
          <h2 className={`${styles.ms} ${styles.title}`}>
            {t.experience.title}
          </h2>
          <a className={`${styles.ms} ${styles.cvLink}`} href="#">
            {t.experience.cv}
          </a>
        </div>

        {/* ── The ledger ── */}
        <div className={styles.ledger}>
          <div>
            {t.experience.entries.map((e, i) => (
              <div className={styles.entry} key={e.role}>
                <div>
                  <div className={`${styles.ms} ${styles.entryDate}`}>
                    <Lines lines={e.date} />
                  </div>
                  <div className={`${styles.cap} ${styles.entryDuration}`}>
                    {e.duration}
                  </div>
                </div>

                <div>
                  <div className={`${styles.ms} ${styles.entryRole}`}>
                    {e.role}
                  </div>

                  {e.place && (
                    <div className={`${styles.cap} ${styles.entryPlace}`}>
                      {e.place}
                    </div>
                  )}

                  <div className={styles.entryText}>
                    <Emphasis text={e.text} />
                  </div>

                  {CHIPS[i].length > 0 && (
                    <div className={styles.entryChips}>
                      {CHIPS[i].map((c) => (
                        <span className={styles.chip} key={c}>
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── The anatomical aside ── */}
          <div className={styles.aside}>
            <div className={styles.frame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.plate}
                src="/images/side_img_exp.jpg"
                alt={t.experience.plateAlt}
                width={1366}
                height={2048}
                draggable={false}
              />
            </div>

            <div className={styles.brass}>
              <div className={`${styles.cap} ${styles.brassCap}`}>
                {t.experience.asideLabel}
              </div>
              <div className={styles.brassText}>{t.experience.asideText}</div>
            </div>

            <div className={styles.term}>{t.experience.chart}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
