"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SiteNav.module.css";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { href: "#about", label: "who i am" },
  { href: "#projects", label: "projects" },
  { href: "#experience", label: "experience" },
];

export default function SiteNav() {
  const navRef = useRef<HTMLElement>(null);
  const [lang, setLang] = useState<"EN" | "PT">("EN");

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      /*
        The rail appears only once the hero is COMPLETELY gone.

        AboutSection is pulled up over the pinned hero and finishes
        covering it exactly when its own top edge reaches the top of the
        viewport — so "#about hits top top" is the precise frame the hero
        stops being visible. Using it as the trigger means the rail can
        never overlap the hero, whatever the viewport height.
      */
      const about = document.querySelector("#about");
      if (!about) return;

      const show = () =>
        gsap.to(nav, {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
          onStart: () => nav.classList.add(styles.visible),
        });

      const hide = () =>
        gsap.to(nav, {
          y: "-100%",
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          overwrite: true,
          onComplete: () => nav.classList.remove(styles.visible),
        });

      ScrollTrigger.create({
        trigger: about,
        start: "top top",
        onEnter: show,
        onLeaveBack: hide,
        // Handles landing mid-page on a reload or a #hash link.
        onRefresh: (self) => {
          if (self.isActive || self.progress > 0) {
            gsap.set(nav, { y: 0, opacity: 1 });
            nav.classList.add(styles.visible);
          } else {
            gsap.set(nav, { y: "-100%", opacity: 0 });
            nav.classList.remove(styles.visible);
          }
        },
      });
    }, nav);

    return () => ctx.revert();
  }, []);

  return (
    <nav className={styles.nav} ref={navRef} aria-label="Main">
      <a className={styles.brand} href="#about">
        Mateus Henrique
      </a>

      <div className={styles.links}>
        {LINKS.map((l) => (
          <a
            className={`${styles.cap} ${styles.link}`}
            href={l.href}
            key={l.href}
          >
            {l.label}
          </a>
        ))}

        <span className={styles.divider} aria-hidden />

        <button
          type="button"
          className={`${styles.lang} ${
            lang === "EN" ? styles.langActive : ""
          }`}
          onClick={() => setLang("EN")}
          aria-pressed={lang === "EN"}
        >
          EN
        </button>
        <button
          type="button"
          className={`${styles.lang} ${
            lang === "PT" ? styles.langActive : ""
          }`}
          onClick={() => setLang("PT")}
          aria-pressed={lang === "PT"}
        >
          PT
        </button>
      </div>
    </nav>
  );
}
