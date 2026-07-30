"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/LanguageProvider";
import styles from "./SiteFooter.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const marbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /* ── Colonnade drifts as the footer comes into view ── */
      gsap.fromTo(
        marbleRef.current,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      /* ── The inscription is carved in, then the rail is set below it ── */
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: footer,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        })
        .from(`.${styles.eyebrow}`, { y: 12, opacity: 0, duration: 0.5 })
        .from(
          `.${styles.inscription}`,
          { y: 30, opacity: 0, letterSpacing: "0.24em", duration: 1 },
          "-=0.25"
        )
        .from(`.${styles.lede}`, { y: 18, opacity: 0, duration: 0.6 }, "-=0.55")
        .from(
          `.${styles.btn}`,
          { y: 18, opacity: 0, stagger: 0.1, duration: 0.55 },
          "-=0.5"
        )
        .from(`.${styles.rule}`, { opacity: 0, duration: 0.6 }, "-=0.3")
        .from(
          [`.${styles.railLink}`, `.${styles.railText}`],
          { y: 10, opacity: 0, stagger: 0.06, duration: 0.4 },
          "-=0.35"
        );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef}>
      {/* ── Marble colonnade ── */}
      <div className={styles.backdrop} aria-hidden>
        <div className={styles.marble} ref={marbleRef} />
        <div className={styles.veil} />
      </div>

      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <div className={`${styles.cap} ${styles.eyebrow}`}>
              {t.footer.eyebrow}
            </div>

            <div className={`${styles.ms} ${styles.inscription}`}>
              {t.footer.inscription}
            </div>

            <div className={styles.lede}>
              {t.footer.lede}
            </div>
          </div>

          <div className={styles.actions}>
            <a className={`${styles.btn} ${styles.btnSolid}`} href="#">
              {t.footer.book}
            </a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#">
              {t.footer.cv}
            </a>
          </div>
        </div>

        <div className={styles.rule}>
          <span>✦</span>
        </div>

        {/* ── Contact rail ── */}
        <div className={styles.rail}>
          <a
            className={`${styles.cap} ${styles.railLink}`}
            href="https://github.com/analyticalcompetitor"
            target="_blank"
            rel="noopener noreferrer"
          >
            github / analyticalcompetitor
          </a>
          <a
            className={`${styles.cap} ${styles.railLink}`}
            href="https://www.linkedin.com/in/mathenrique"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin / mathenrique
          </a>
          <a
            className={`${styles.cap} ${styles.railLink}`}
            href="mailto:mathenrique@ufpi.edu.br"
          >
            mathenrique@ufpi.edu.br
          </a>
          <span className={`${styles.cap} ${styles.railText}`}>
            {t.footer.phone}
          </span>
          <span className={`${styles.cap} ${styles.railText}`}>
            {t.footer.location}
          </span>
        </div>
      </div>
    </footer>
  );
}
