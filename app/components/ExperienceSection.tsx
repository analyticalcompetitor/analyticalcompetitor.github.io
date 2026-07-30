"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ExperienceSection.module.css";

gsap.registerPlugin(ScrollTrigger);

type Entry = {
  date: ReactNode;
  duration: string;
  role: string;
  place?: string;
  text: ReactNode;
  chips?: string[];
};

const ENTRIES: Entry[] = [
  {
    date: (
      <>
        Feb 2025
        <br />— Mar 2026
      </>
    ),
    duration: "1 yr 2 mo",
    role: "Tech Intern · Medsafe",
    place: "Teresina, Brazil · health tech",
    text: (
      <>
        Built Airflow ETL pipelines that transformed database data, generated
        visual outputs, and fed both structured data and images into LLM-based
        automated reporting. Cleaned and structured Excel and CSV datasets with
        Python and Pandas. Also worked on the front end in Angular for the{" "}
        <i>Piauí Primeira Infância</i> early-childhood system.
      </>
    ),
    chips: ["Airflow", "Python", "Pandas", "LLM", "Angular"],
  },
  {
    date: (
      <>
        Aug 2021
        <br />— Nov 2023
      </>
    ),
    duration: "2 yr 4 mo",
    role: "Undergraduate Researcher (PIBIC) · UFPI",
    place: "Department of Computer Science",
    text: "Researched automatic grading of free-text answers using NLP similarity methods, and built the experimental evaluation pipelines that compared them.",
    chips: ["Scikit-learn", "spaCy", "NLTK", "Research"],
  },
  {
    date: (
      <>
        Aug 2021
        <br />— Nov 2021
      </>
    ),
    duration: "4 mo",
    role: "Data Structures Teaching Assistant · UFPI",
    text: "Reviewed assignments and exams and taught linked lists, stacks, queues, trees, graphs, hash tables, heaps and algorithmic complexity one student at a time.",
  },
  {
    date: "→ Jul 2026",
    duration: "graduating",
    role: "BSc Computer Science · Federal University of Piauí",
    text: "Coursework in Artificial Intelligence, Natural Language Processing, and Topics in AI with an emphasis on RAG applications.",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const codexRef = useRef<HTMLDivElement>(null);

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

      /* ── 4. Ledger rows written in one at a time, each with its rule
         drawing itself left-to-right. ── */
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
            where i&apos;ve worked and studied
          </div>
          <div className={styles.headerRule} />
        </div>

        <div className={styles.titleRow}>
          <h2 className={`${styles.ms} ${styles.title}`}>
            Five years, in order.
          </h2>
          <a className={`${styles.ms} ${styles.cvLink}`} href="#">
            Download the full CV (PDF) →
          </a>
        </div>

        {/* ── The ledger ── */}
        <div className={styles.ledger}>
          <div>
            {ENTRIES.map((e) => (
              <div className={styles.entry} key={e.role}>
                <div>
                  <div className={`${styles.ms} ${styles.entryDate}`}>
                    {e.date}
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

                  <div className={styles.entryText}>{e.text}</div>

                  {e.chips && (
                    <div className={styles.entryChips}>
                      {e.chips.map((c) => (
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
                alt="Leonardo da Vinci, mechanical study from the Codex Atlanticus"
                width={1366}
                height={2048}
                draggable={false}
              />
            </div>

            <div className={styles.brass}>
              <div className={`${styles.cap} ${styles.brassCap}`}>in short</div>
              <div className={styles.brassText}>
                Two years in research taught me to measure things. One year in
                industry taught me to ship them. I&apos;d like to do both for
                you.
              </div>
            </div>

            <div className={styles.term}>
              {`research  ██████░░░░  2 yr
industry  ████░░░░░░  1.2 yr
teaching  █░░░░░░░░░  4 mo`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
