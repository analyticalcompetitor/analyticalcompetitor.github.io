"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  meta: string;
  title: string;
  text: string;
  result: ReactNode;
  chips: string[];
  term: ReactNode;
  href: string;
};

const PROJECTS: Project[] = [
  {
    meta: "2026 · retrieval-augmented generation",
    title: "Institutional document chatbot",
    text: "A chatbot that answers questions using an institution's own documents instead of guessing. I worked on ingestion, chunking and retrieval quality — the parts that decide whether the answer is right.",
    result: "staff find policy answers in seconds instead of digging through PDFs.",
    chips: ["Python", "LangChain", "Embeddings", "Vector DB"],
    term: (
      <>
        retrieve(question, k=5)
        <br />
        <span className={styles.dim}>→ 0.87 handbook_p12</span>
        <br />
        <span className={styles.dim}>→ 0.81 regulation_2024</span>
      </>
    ),
    href: "#",
  },
  {
    meta: "2025–2026 · medsafe · data engineering",
    title: "Reports that write themselves",
    text: "Airflow pipelines that pull data from the database every day, transform it, generate the charts, then hand the numbers and images to an LLM that writes the report.",
    result:
      "a manual reporting routine became a scheduled job nobody has to remember.",
    chips: ["Airflow", "Pandas", "SQL", "LLM", "Docker"],
    term: (
      <>
        dag: daily_report
        <br />
        <span className={styles.dim}>extract → transform → plot</span>
        <br />
        <span className={styles.dim}>compose → deliver ✓ 4s</span>
      </>
    ),
    href: "#",
  },
  {
    meta: "2021–2023 · ufpi research · nlp",
    title: "Grading written answers automatically",
    text: "Two years of research on scoring free-text exam answers by meaning rather than keywords. I compared cosine, Jaccard and Word Mover Distance across Bag of Words, TF-IDF and word embeddings.",
    result: "a measured answer to which similarity method a teacher should trust.",
    chips: ["Scikit-learn", "spaCy", "NLTK", "Pandas"],
    term: (
      <>
        cosine(tfidf) = 0.78
        <br />
        wmd(embeddings) = 0.41
        <br />
        <span className={styles.dim}>n = 1,240 answers</span>
      </>
    ),
    href: "#",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

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
          alt="Leonardo da Vinci's Vitruvian Man"
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
              three things i built
            </div>
          </div>

          <h2 className={`${styles.ms} ${styles.title}`}>PROJECTS</h2>

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
              Built, shipped, still running.
            </h3>
            <div className={styles.panelLede}>
              Each one has a plain description, the stack, and what actually
              came out of it. Click a card for the full case study.
            </div>
          </div>

          <div className={styles.cards}>
            {PROJECTS.map((p) => (
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
                  <b>Result:</b> {p.result}
                </div>

                <div className={styles.chips}>
                  {p.chips.map((c) => (
                    <span className={styles.chip} key={c}>
                      {c}
                    </span>
                  ))}
                </div>

                <div className={styles.term}>{p.term}</div>

                <a className={`${styles.ms} ${styles.cardLink}`} href={p.href}>
                  Read the case study →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
