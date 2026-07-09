import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion, useReducedMotion } from "framer-motion";

interface LogoHeroProps {
  // Fired once the build-in sequence finishes (or immediately, under
  // prefers-reduced-motion) so callers can time other UI — e.g. the hero
  // tagline — to when the logo actually settles instead of guessing.
  onBuildComplete?: () => void;
}

// Ported from src/srls-logo-animated.html — the shackle-and-plate brand mark
// assembling itself, then swaying gently at rest. Runs entirely on GSAP
// against id selectors scoped to this component via gsap.context, mirroring
// the standalone demo file 1:1 so it stays easy to diff against.
//
// The choreography below is the demo's original, unhurried pacing; it's
// compressed with tl.timeScale() rather than rewritten so every relative
// beat (bounce, overlap, jolt) stays intact while the whole build-in fits
// a hero's attention span.
export function LogoHero({ onBuildComplete }: LogoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<SVGGElement>(null);
  const masterRef = useRef<gsap.core.Timeline | null>(null);
  const emberRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Ambient embers drifting across the whole hero — independent of the
  // build timeline above, so they're just atmosphere behind the logo.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = emberRef.current;
    if (!container) return;

    let cancelled = false;
    let timeoutId = window.setTimeout(spawn, 600);

    function spawn() {
      if (cancelled) return;
      const ember = document.createElement("span");
      const left = 6 + Math.random() * 88;
      const top = 20 + Math.random() * 70;
      const size = 2 + Math.random() * 2;
      Object.assign(ember.style, {
        position: "absolute",
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "9999px",
        background: "#E8510A",
        pointerEvents: "none",
        opacity: "0",
        filter: "blur(0.3px)",
      });
      container.appendChild(ember);

      gsap.to(ember, {
        opacity: 0.5 + Math.random() * 0.3,
        duration: 1.2,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(ember, {
            y: -(50 + Math.random() * 70),
            x: (Math.random() - 0.5) * 40,
            opacity: 0,
            duration: 3 + Math.random() * 2,
            ease: "power1.out",
            onComplete: () => ember.remove(),
          });
        },
      });

      timeoutId = window.setTimeout(spawn, 700 + Math.random() * 900);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      let ambient: gsap.core.Timeline | undefined;

      function spawnDust(x: number, y: number, color?: string) {
        const fx = fxRef.current;
        if (!fx) return;
        for (let i = 0; i < 6; i++) {
          const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          c.setAttribute("cx", String(x));
          c.setAttribute("cy", String(y));
          c.setAttribute("r", String(5 + Math.random() * 7));
          c.setAttribute("fill", color || "rgba(120,115,105,.45)");
          fx.appendChild(c);
          gsap.set(c, { opacity: 0.9, transformOrigin: "center" });
          gsap.to(c, {
            x: (Math.random() - 0.5) * 160,
            y: -(20 + Math.random() * 50),
            scale: 2.2 + Math.random(),
            opacity: 0,
            duration: 0.7 + Math.random() * 0.4,
            ease: "power2.out",
            onComplete: () => c.remove(),
          });
        }
      }

      function startAmbient() {
        ambient = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
        ambient
          .to("#logo", { rotation: 1.3, transformOrigin: "50% -8%", duration: 2.6 }, 0)
          .to("#logo", { y: 6, duration: 2.6 }, 0);

        const letterSway: [string, number, number, number][] = [
          ["#L1", 1.6, 1.9, 0.0],
          ["#L2", -1.4, 2.3, 0.4],
          ["#L3", 1.8, 2.1, 0.8],
          ["#L4", -1.6, 2.5, 0.2],
        ];
        letterSway.forEach(([sel, rot, dur, delay]) => {
          gsap.fromTo(
            sel,
            { rotation: -rot },
            { rotation: rot, transformOrigin: "50% -30%", duration: dur, delay, repeat: -1, yoyo: true, ease: "sine.inOut" }
          );
          gsap.to(sel, { y: 3, duration: dur * 0.8, delay: delay + 0.3, repeat: -1, yoyo: true, ease: "sine.inOut" });
        });

        gsap.fromTo(
          "#glint",
          { x: 0 },
          { x: 1600, duration: 1.2, ease: "power2.inOut", repeat: -1, repeatDelay: 4.2, delay: 1 }
        );
      }

      function build() {
        gsap.set("#logo", { rotation: 0, y: 0 });
        gsap.set("#L1, #L2, #L3, #L4", { rotation: 0, y: 0 });
        gsap.set(["#slingL_u", "#slingR_u", "#slingL_o", "#slingR_o"], { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set("#barClipRect", { attr: { width: 0 } });
        gsap.set("#glint", { x: -100 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            startAmbient();
            onBuildComplete?.();
          },
        });

        // 1 — bow crashes in from above
        tl.from("#bow", { y: -620, duration: 1.0, ease: "bounce.out" })
          .from("#bow", { rotation: 5, transformOrigin: "50% 20%", duration: 0.9, ease: "elastic.out(1,.35)" }, "-=.55")

          // 2 — pin slides through the lugs, head seats, nut spins on, cotter snaps
          .from("#pin", { x: 460, opacity: 0, duration: 0.45, ease: "power4.out" }, "-=.35")
          .from("#pinhead", { scale: 0, transformOrigin: "678px 97px", duration: 0.35, ease: "back.out(2.5)" }, "-=.1")
          .from("#nut", { x: -120, opacity: 0, duration: 0.35, ease: "power4.out" })
          .from("#nut", { rotation: 120, transformOrigin: "305px 97px", duration: 0.5, ease: "back.out(1.6)" }, "-=.2")
          .add(() => spawnDust(300, 97, "rgba(242,101,34,.5)"))

          // 3 — emblem locks together piece by piece
          .from("#emblem path", { scale: 0, rotation: -90, transformOrigin: "500px 326px", stagger: 0.09, duration: 0.4, ease: "back.out(2.2)" }, "-=.1")

          // 4 — slings pay out from the shackle to the corners
          .to(["#slingL_u", "#slingL_o"], { strokeDashoffset: 0, duration: 0.55, ease: "power2.inOut" }, "+=.05")
          .to(["#slingR_u", "#slingR_o"], { strokeDashoffset: 0, duration: 0.55, ease: "power2.inOut" }, "<.08")

          // 5 — plate hooks on and takes the load
          .from("#plateGroup", { y: 340, opacity: 0, duration: 0.7, ease: "back.out(1.2)" }, "-=.15")
          .to("#logo", { rotation: -1.6, transformOrigin: "50% -8%", duration: 0.25, ease: "power2.out" }, "-=.3")
          .to("#logo", { rotation: 0, duration: 1.1, ease: "elastic.out(1,.3)" });

        // 6 — letters drop in one by one, plate jolts on each impact
        const drops: [string, number][] = [["#L1", 200], ["#L2", 410], ["#L3", 605], ["#L4", 800]];
        drops.forEach(([sel, x], i) => {
          tl.from(sel, { y: -260, opacity: 0, duration: 0.45, ease: "bounce.out" }, i === 0 ? "-=.6" : "-=.18")
            .add(() => spawnDust(x, 748))
            .to("#plateGroup", { scaleY: 0.975, transformOrigin: "50% 100%", duration: 0.06, yoyo: true, repeat: 1 }, "-=.05");
        });

        // 7 — name bar stamps in, text wipes across
        tl.from("#barGroup", { scaleY: 0, transformOrigin: "50% 805px", duration: 0.35, ease: "back.out(2)" }, "-=.1")
          .to("#barClipRect", { attr: { width: 890 }, duration: 0.7, ease: "power2.inOut" })

          // 8 — final hoist: whole logo picks up and settles
          .to("#logo", { y: -22, duration: 0.5, ease: "power2.out" }, "+=.15")
          .to("#logo", { y: 0, rotation: 0.8, transformOrigin: "50% -8%", duration: 1.4, ease: "elastic.out(1,.3)" })

          // 9 — first glint sweep
          .fromTo("#glint", { x: -100 }, { x: 1600, duration: 1.1, ease: "power2.inOut" }, "-=1.0");

        // The full 9.4s choreography above is the demo's original pacing —
        // compress it 2x so the hero's tagline isn't waiting on it.
        tl.timeScale(2);

        return tl;
      }

      if (reduced) {
        gsap.set("#barClipRect", { attr: { width: 890 } });
        onBuildComplete?.();
      } else {
        masterRef.current = build();
      }

      return () => {
        ambient?.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Swing impulse on click, same as the standalone demo
  const handleClick = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const master = masterRef.current;
    if (reduced || (master && master.isActive())) return;
    gsap.timeline()
      .to("#logo", { rotation: -5, transformOrigin: "50% -8%", duration: 0.18, ease: "power2.out" })
      .to("#logo", { rotation: 0, duration: 2.2, ease: "elastic.out(1,.18)" });
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-start justify-center bg-background transition-colors duration-400 pt-[2vh] [@media(max-height:700px)]:pt-[1vh]"
      aria-hidden="true"
    >
      {/* Blueprint grid — faint, drifts slowly. Pure background atmosphere,
          drawn from --border so it adapts to theme with no JS. */}
      <motion.div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        animate={prefersReducedMotion ? undefined : { backgroundPosition: ["0px 0px", "56px 56px"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      {/* Radial glow — breathes behind the logo, sized/positioned to match
          its own height breakpoints so it stays centered on it. */}
      <div className="absolute left-1/2 top-[2vh] -translate-x-1/2 [@media(max-height:700px)]:top-[1vh]">
        <motion.div
          className="aspect-square h-[30vh] rounded-full blur-3xl sm:h-[32vh] md:h-[34vh] [@media(max-height:700px)]:h-[20vh]"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 70%)" }}
          animate={prefersReducedMotion ? undefined : { opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Ambient embers layer, populated by the effect above */}
      <div ref={emberRef} className="absolute inset-0 overflow-hidden" />

      {/* Sized against viewport height, not width — the constraint that
          matters here is clearing the tagline pinned below, which is a
          function of how tall the viewport is, not how wide. The
          max-height variant covers short/landscape viewports (old
          laptops, rotated phones) where 30vh would still collide. */}
      <div className="relative z-10 cursor-pointer" onClick={handleClick}>
        <svg
          viewBox="0 0 1000 920"
          className="h-[30vh] sm:h-[32vh] md:h-[34vh] [@media(max-height:700px)]:h-[20vh] w-auto max-w-[85vw] overflow-visible"
          aria-label="Safety Rigging &amp; Lifting Services Ltd. logo"
        >
          <defs>
            <linearGradient id="glintGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".5" stopColor="#fff" stopOpacity=".35" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="plateClip">
              <rect x="92" y="577" width="816" height="181" rx="12" />
            </clipPath>
            <clipPath id="barClip">
              <rect id="barClipRect" x="55" y="805" width="0" height="72" rx="10" />
            </clipPath>
            {/* Punches an actual hole in the bow circle for the keyhole —
                fill="none" on a path only skips painting new fill, it
                doesn't erase what's already been drawn underneath, so the
                circle needs to be masked to be genuinely see-through. */}
            <mask id="keyholeMask">
              <rect x="0" y="0" width="1000" height="920" fill="#fff" />
              <path d="M458,127 L458,240 A85,85 0 1 0 542,240 L542,127 Z" fill="#000" />
            </mask>
          </defs>

          <g id="logo" style={{ filter: "drop-shadow(0 22px 26px rgba(0,0,0,.35))" }}>
            {/* ================= SHACKLE ================= */}
            <g id="shackle">
              {/* pin assembly (drawn first = sits behind the bow) */}
              <g id="pinGroup">
                <rect id="pin" x="310" y="70" width="390" height="54" rx="27" fill="#5b5c5e" stroke="#1a1a1a" strokeWidth={7} />
                <g id="pinhead">
                  <circle cx="678" cy="97" r="48" fill="#47484a" stroke="#1a1a1a" strokeWidth={7} />
                  <circle cx="678" cy="97" r="19" fill="#2e2f30" stroke="#1a1a1a" strokeWidth={5} />
                </g>
                <g id="nut">
                  <rect x="278" y="56" width="54" height="82" rx="10" fill="#4d4e50" stroke="#1a1a1a" strokeWidth={7} />
                  <rect x="246" y="80" width="36" height="34" rx="6" fill="#57585a" stroke="#1a1a1a" strokeWidth={6} />
                  {/* cotter pin prongs */}
                  <path d="M246,88 L222,74" stroke="#1a1a1a" strokeWidth={7} strokeLinecap="round" />
                  <path d="M246,106 L222,120" stroke="#1a1a1a" strokeWidth={7} strokeLinecap="round" />
                </g>
              </g>
              {/* bow (drawn after = in front of the pin) */}
              <g id="bow">
                <circle cx="500" cy="300" r="160" fill="#57585a" stroke="#1a1a1a" strokeWidth={7} mask="url(#keyholeMask)" />
                {/* keyhole opening (stops just below the pin) — the mask
                    above does the actual cutting; this just draws the ink
                    border on top of the hole it left */}
                <path
                  d="M458,127 L458,240 A85,85 0 1 0 542,240 L542,127 Z"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth={6}
                  strokeLinejoin="round"
                />
                {/* lugs */}
                <rect x="380" y="62" width="78" height="170" rx="36" fill="#57585a" stroke="#1a1a1a" strokeWidth={7} />
                <rect x="542" y="62" width="78" height="170" rx="36" fill="#57585a" stroke="#1a1a1a" strokeWidth={7} />
                {/* emblem: black M peaks over inverted orange W */}
                <g id="emblem" strokeLinecap="square" fill="none" strokeWidth={9}>
                  <path d="M448,335 L478,300 L508,335" stroke="#1a1a1a" />
                  <path d="M492,335 L522,300 L552,335" stroke="#1a1a1a" />
                  <path d="M458,315 L488,347 L518,315" stroke="#F26522" />
                  <path d="M482,315 L512,347 L542,315" stroke="#F26522" />
                </g>
              </g>
            </g>

            {/* ================= SLINGS ================= */}
            <g id="slings" fill="none" strokeLinecap="round">
              <path id="slingL_u" d="M500,392 L118,560" stroke="#1a1a1a" strokeWidth={34} pathLength={1} />
              <path id="slingR_u" d="M500,392 L882,560" stroke="#1a1a1a" strokeWidth={34} pathLength={1} />
              <path id="slingL_o" d="M500,392 L118,560" stroke="#F26522" strokeWidth={22} pathLength={1} />
              <path id="slingR_o" d="M500,392 L882,560" stroke="#F26522" strokeWidth={22} pathLength={1} />
            </g>

            {/* ================= PLATE ================= */}
            <g id="plateGroup">
              <rect x="60" y="545" width="880" height="245" rx="22" fill="#F26522" stroke="#1a1a1a" strokeWidth={8} />
              <rect x="92" y="577" width="816" height="181" rx="12" fill="#4a4a4b" stroke="#1a1a1a" strokeWidth={6} />
            </g>

            {/* ================= LETTERS (block-built, not a font) ================= */}
            <g id="letters" fill="#F26522" stroke="#1a1a1a" strokeWidth={6} strokeLinejoin="round">
              <path id="L1" d="M120,595 h160 v40 h-120 v15 h120 v95 h-160 v-40 h120 v-15 h-120 z" />
              <path
                id="L2"
                fillRule="evenodd"
                d="M330,595 L490,595 L490,690 L450,690 L490,745 L440,745 L405,698 L370,698 L370,745 L330,745 Z
                   M370,635 h80 v15 h-80 z"
              />
              <path id="L3" d="M540,595 h40 v110 h90 v40 h-130 z" />
              <path id="L4" d="M720,595 h160 v40 h-120 v15 h120 v95 h-160 v-40 h120 v-15 h-120 z" />
            </g>

            {/* glint sweep over plate */}
            <g clipPath="url(#plateClip)">
              <rect id="glint" x="-380" y="540" width="220" height="260" fill="url(#glintGrad)" transform="skewX(-18)" />
            </g>

            {/* ================= NAME BAR ================= */}
            <g id="barGroup">
              <rect x="55" y="805" width="890" height="72" rx="10" fill="#3f4041" stroke="#1a1a1a" strokeWidth={6} />
              <g clipPath="url(#barClip)">
                <text
                  x="500"
                  y="856"
                  textAnchor="middle"
                  fontFamily="'Barlow Condensed','Arial Narrow',sans-serif"
                  fontWeight={700}
                  fontSize={47}
                  fill="#F26522"
                  stroke="#1a1a1a"
                  strokeWidth={1.5}
                  letterSpacing="2"
                >
                  SAFETY RIGGING &amp; LIFTING SERVICES LTD.
                </text>
              </g>
            </g>

            {/* fx layer (dust / sparks) */}
            <g id="fx" ref={fxRef} />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default LogoHero;
