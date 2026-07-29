"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroSection.module.css";

gsap.registerPlugin(ScrollTrigger);

/*
  ── Tunables ─────────────────────────────────────────────
  All in pixels/ratios relative to the current viewport, so the meeting
  point is recomputed on every resize and is identical on every device.
*/
// Rotation of each arm (matches the reference painting)
const ADAM_ROT = 0;
const GOD_ROT = 0;
// Half of the horizontal gap between the two fingertips at the meeting
// point, as a fraction of the smaller viewport dimension.
const HALF_GAP = 0.05;
// Vertical placement of the meeting point (fraction of viewport height).
const MEET_Y = 0.36;
// Small vertical offsets so Adam's tip sits a touch lower than God's,
// as in the painting (fraction of viewport height).
const ADAM_DY = -0.025;
const GOD_DY = 0.015;
// How far apart the arms sit at the START of the scroll, measured from
// the meeting point (fraction of viewport width / height).
const APART_X = 0.06;
const APART_Y = 0.28;

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const adamRef = useRef<HTMLDivElement>(null);
  const godRef = useRef<HTMLDivElement>(null);
  const adamTipRef = useRef<HTMLSpanElement>(null);
  const godTipRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const adam = adamRef.current;
    const god = godRef.current;
    const adamTip = adamTipRef.current;
    const godTip = godTipRef.current;

    if (!wrapper || !adam || !god || !adamTip || !godTip) return;

    // Live-measured offsets. Populated on every ScrollTrigger refresh so
    // the fingertips always meet dead-centre regardless of viewport size.
    const A = { sx: 0, sy: 0, ex: 0, ey: 0 };
    const G = { sx: 0, sy: 0, ex: 0, ey: 0 };

    const centreOf = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    const measure = () => {


      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const gap = Math.min(vw, vh) * HALF_GAP;

      // Neutralise translation (keep rotation) so we can read each
      // fingertip's resting screen position.
      gsap.set(adam, { x: 0, y: 0, rotation: ADAM_ROT });
      gsap.set(god, { x: 0, y: 0, rotation: GOD_ROT });

      const restAdam = centreOf(adamTip);
      const restGod = centreOf(godTip);

      // Where each fingertip should END UP (meeting point).
      const meetAdam = { x: vw / 2 - gap, y: vh * (MEET_Y + ADAM_DY) };
      const meetGod = { x: vw / 2 + gap, y: vh * (MEET_Y + GOD_DY) };

      // ...and where they START (pushed out to opposite corners).
      const startAdam = {
        x: meetAdam.x - vw * APART_X,
        y: meetAdam.y + vh * APART_Y,
      };
      const startGod = {
        x: meetGod.x + vw * APART_X,
        y: meetGod.y - vh * APART_Y,
      };

      A.ex = meetAdam.x - restAdam.x;
      A.ey = meetAdam.y - restAdam.y;
      A.sx = startAdam.x - restAdam.x;
      A.sy = startAdam.y - restAdam.y;

      G.ex = meetGod.x - restGod.x;
      G.ey = meetGod.y - restGod.y;
      G.sx = startGod.x - restGod.x;
      G.sy = startGod.y - restGod.y;
    };

    const ctx = gsap.context(() => {
      // Recompute the pixel targets before ScrollTrigger measures.
      ScrollTrigger.addEventListener("refreshInit", measure);
      measure();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        adam,
        { x: () => A.sx, y: () => A.sy, rotation: ADAM_ROT, scale: 1 },
        { x: () => A.ex, y: () => A.ey, duration: 0.7, scale: 1.1 },
        0
      );
      tl.fromTo(
        god,
        { x: () => G.sx, y: () => G.sy, rotation: GOD_ROT, scale: 1 },
        { x: () => G.ex, y: () => G.ey, duration: 0.7, scale: 1.1 },
        0
      );

      // Title fades out as the arms approach.
      tl.fromTo(
        titleRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.3 },
        0
      );

      // Contact box fades/scales in once the fingertips are together.
      tl.fromTo(
        contactRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.25 },
        0.72
      );
    });

    // Fonts loading can shift layout → re-measure once they're ready.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", measure);
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.sticky}>

        {/* ── Background ── */}
        <div
          className={styles.bg}
          style={{ backgroundImage: "url(/images/background.png)" }}
        />

        {/* ── Adam's arm — enters from bottom-left ── */}
        <div className={styles.adam} ref={adamRef}>
          <img src="/images/hand-left.png" alt="Adam's arm" draggable={false} />
          <span
            className={`${styles.tip} ${styles.tipAdam}`}
            ref={adamTipRef}
            aria-hidden
          />
        </div>

        {/* ── God's arm — enters from top-right ── */}
        <div className={styles.god} ref={godRef}>
          <img src="/images/hand-right.png" alt="God's arm" draggable={false} />
          <span
            className={`${styles.tip} ${styles.tipGod}`}
            ref={godTipRef}
            aria-hidden
          />
        </div>

        {/* ── Title — MedievalSharp, fades on scroll ── */}
        <div className={styles.title} ref={titleRef}>
          CREATION BEGINS IN CONTACT
        </div>

        {/* ── Contact box — appears when arms meet ── */}
        <div className={styles.contact} ref={contactRef}>
          <p className={styles.contactLabel}>get in touch</p>
          <div className={styles.contactLinks}>

            {/* GitHub */}
            <a
              href="https://github.com/analyticalcompetitor"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className={styles.iconLabel}>github</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mathenrique"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className={styles.iconLabel}>linkedin</span>
            </a>

            {/* Email */}
            <a href="mailto:mathenrique@email.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span className={styles.iconLabel}>email</span>
            </a>

          </div>
        </div>

      </div>
    </div>
  );
}
