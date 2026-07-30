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
  const stickyRef = useRef<HTMLDivElement>(null);
  const adamRef = useRef<HTMLDivElement>(null);
  const godRef = useRef<HTMLDivElement>(null);
  const adamTipRef = useRef<HTMLSpanElement>(null);
  const godTipRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const adam = adamRef.current;
    const god = godRef.current;
    const adamTip = adamTipRef.current;
    const godTip = godTipRef.current;

    if (!wrapper || !sticky || !adam || !god || !adamTip || !godTip) return;

    // Live-measured offsets. Populated on every ScrollTrigger refresh so
    // the fingertips always meet dead-centre regardless of viewport size.
    const A = { sx: 0, sy: 0, ex: 0, ey: 0 };
    const G = { sx: 0, sy: 0, ex: 0, ey: 0 };

    /*
      Everything is measured in coordinates LOCAL TO .sticky, never in
      viewport coordinates.

      This matters on resize. ScrollTrigger refreshes on every resize, and
      a refresh re-runs measure(). If the reader happens to be further down
      the page, .sticky has scrolled out of the viewport, so viewport-based
      rects come back hundreds of pixels off — the offsets are computed
      against a frame that isn't on screen and the arms get flung out of
      the hero for good. Subtracting .sticky's own rect makes the maths
      independent of where the page is scrolled to.
    */
    const centreOf = (el: HTMLElement, origin: DOMRect) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - origin.left,
        y: r.top + r.height / 2 - origin.top,
      };
    };

    const measure = () => {
      const frame = sticky.getBoundingClientRect();

      // Nothing sensible to measure against (display:none, zero-height
      // during an orientation change, etc.) — keep the last good values.
      if (!frame.width || !frame.height) return;

      const vw = frame.width;
      const vh = frame.height;
      const gap = Math.min(vw, vh) * HALF_GAP;

      // Neutralise translation (keep rotation) so we can read each
      // fingertip's resting position inside the frame.
      gsap.set(adam, { x: 0, y: 0, rotation: ADAM_ROT });
      gsap.set(god, { x: 0, y: 0, rotation: GOD_ROT });

      const restAdam = centreOf(adamTip, frame);
      const restGod = centreOf(godTip, frame);

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
          // Stop 100vh before the wrapper ends: that last 100vh is the
          // runway AboutSection uses to slide up over the pinned hero.
          end: "bottom bottom-=100vh",
          scrub: 0.9,
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
      <div className={styles.sticky} ref={stickyRef}>

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

      </div>
    </div>
  );
}
