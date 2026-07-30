"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    index: "i",
    title: "Automate the work nobody wants to do",
    text: "Spreadsheets cleaned, reports generated, sites scraped, jobs scheduled. Python, Pandas, Airflow, Playwright.",
  },
  {
    index: "ii",
    title: (
      <>
        Chatbots that answer from <i>your</i> documents
      </>
    ),
    text: "RAG done properly: ingestion, chunking, embeddings, retrieval you can measure — and every answer cites its source.",
  },
  {
    index: "iii",
    title: "Put an LLM inside your product",
    text: "Prompt workflows, structured output, text and images in one pipeline. Integrated into the system you already have.",
  },
  {
    index: "iv",
    title: "Ship the whole thing",
    text: "Angular, Next.js, SQL and NoSQL, Docker. Front end, back end, and the deployment in between.",
  },
];

const CHIPS = [
  "Python",
  "Pandas",
  "Airflow",
  "LangChain",
  "Embeddings",
  "Scikit-learn",
  "spaCy",
  "NLTK",
  "SQL / NoSQL",
  "Docker",
  "Playwright",
  "Angular",
  "Next.js",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      /* NOTE: the section itself is never transformed. The overlay is
         done in CSS (margin-top:-100vh + z-index over the pinned hero),
         so the hero animation is never covered before it finishes. */

      /* ── 1. Slow parallax drift on the stone backdrop ── */
      gsap.fromTo(
        stoneRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      /* ── 2. Content entrances, as the section rises over the hero ── */
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.5 },
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(`.${styles.numeral}`, { scale: 0.4, opacity: 0, duration: 0.5 })
        .from(`.${styles.headerLabel}`, { x: -14, opacity: 0 }, "-=0.3")
        .from(`.${styles.headerRule}`, { scaleX: 0, duration: 0.9 }, "-=0.3")
        .from(
          `.${styles.frame}`,
          { y: 46, opacity: 0, rotateZ: -1.2, duration: 0.9 },
          "-=0.6"
        )
        .from(`.${styles.brass}`, { y: 26, opacity: 0 }, "-=0.55")
        .from(`.${styles.term}`, { y: 20, opacity: 0 }, "-=0.5")
        .from(`.${styles.statement}`, { y: 34, opacity: 0, duration: 0.9 }, 0.15)
        .from(`.${styles.lede}`, { y: 24, opacity: 0 }, "-=0.55")
        .from(`.${styles.body}`, { y: 24, opacity: 0 }, "-=0.55")
        .from(`.${styles.rule}`, { opacity: 0, duration: 0.6 }, "-=0.4")
        .from(
          `.${styles.card}`,
          { y: 30, opacity: 0, stagger: 0.09, duration: 0.65 },
          "-=0.35"
        )
        .from(
          `.${styles.chip}`,
          { y: 10, opacity: 0, stagger: 0.025, duration: 0.35 },
          "-=0.3"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className={styles.section} ref={sectionRef}>
      {/* ── Stone-wall backdrop ── */}
      <div className={styles.backdrop} aria-hidden>
        <div className={styles.stoneClip}>
          <div className={styles.stone} ref={stoneRef} />
        </div>
        <div className={styles.tint} />
        <div className={styles.veil} />
      </div>

      <div className={styles.inner}>
        {/* ── Section header ── */}
        <div className={styles.header}>
          <div className={styles.numeral}>I</div>
          <div className={`${styles.cap} ${styles.headerLabel}`}>
            Meet Mathew
          </div>
          <div className={styles.headerRule} />
        </div>

        <div className={styles.grid}>
          {/* ── Portrait, hung like a canvas ── */}
          <div>
            <div className={styles.frame}>
              <div className={styles.portrait}>
                <div className={styles.portraitVeil} />
              </div>
            </div>

            <div className={styles.brass}>
              <div className={`${styles.cap} ${styles.brassCap}`}>
                Teresina, Piauí · Brazil · UTC−3
              </div>
              <div className={`${styles.ms} ${styles.brassTitle}`}>
                AI Engineer · open to remote roles and freelance builds
              </div>
            </div>

            <div className={styles.term}>
              available_from = &quot;2026-07&quot;
              <br />
              languages = [&quot;pt-BR&quot;, &quot;en&quot;, &quot;es&quot;,
              &quot;fr&quot;]
              <br />
              timezone = &quot;UTC-3&quot;
            </div>
          </div>

          {/* ── The statement ── */}
          <div>
            <h2 className={`${styles.ms} ${styles.statement}`}>
              I build the machinery
              <br />
              that makes AI actually useful.
            </h2>

            <div className={styles.lede}>
              <span className={styles.dropCap}>M</span>y name is Mateus
              Henrique. I&apos;m a Computer Science student at the Federal
              University of Piauí, graduating in July 2026, and I&apos;ve spent
              the last five years doing one thing: taking messy real-world data
              and turning it into systems that run by themselves.
            </div>

            <div className={styles.body}>
              Two years of NLP research. A year building ETL pipelines and
              LLM-generated reports for a health-tech company. A retrieval
              chatbot that answers from an institution&apos;s own documents. Not
              demos — things that stayed running after I walked away.
            </div>

            <div className={styles.rule}>
              <span className={`${styles.cap} ${styles.ruleLabel}`}>
                what i can build for you
              </span>
            </div>

            <div className={styles.cards}>
              {CAPABILITIES.map((c) => (
                <div className={styles.card} key={c.index}>
                  <div className={`${styles.cap} ${styles.cardIndex}`}>
                    {c.index}
                  </div>
                  <div className={`${styles.ms} ${styles.cardTitle}`}>
                    {c.title}
                  </div>
                  <div className={styles.cardText}>{c.text}</div>
                </div>
              ))}
            </div>

            <div className={styles.chips}>
              {CHIPS.map((chip) => (
                <span className={styles.chip} key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
