import { useEffect, useState } from "react";
import { motion, useAnimation, useReducedMotion, type LegacyAnimationControls } from "framer-motion";

interface HeroCranesProps {
  // Same signal LogoHero's onBuildComplete feeds into — the cranes hoist
  // the tagline into place on the same beat the words themselves rise.
  ready: boolean;
}

const STEEL = "hsl(var(--muted-foreground))";
const OUTLINE = "hsl(var(--foreground))";
const ORANGE = "hsl(var(--primary))";

// Lattice geometry — mast/jib rails plus evenly-spaced struts and
// alternating diagonal bracing, the same truss language the original
// crane hero animation used, so this reads as a real structure rather
// than a couple of flat bars.
const MAST_RAIL_L = 28;
const MAST_RAIL_R = 35;
const MAST_TOP = 40;
const MAST_BOTTOM = 408;
const JIB_TOP = 36;
const JIB_BOTTOM = 45;
const JIB_END_X = 133;
const COUNTER_END_X = 10;

function evenlySpaced(start: number, end: number, count: number) {
  const step = (end - start) / (count - 1);
  return Array.from({ length: count }, (_, i) => start + step * i);
}

const MAST_BRACE_YS = evenlySpaced(MAST_TOP, MAST_BOTTOM, 10);
const JIB_STRUT_XS = evenlySpaced(MAST_RAIL_R, JIB_END_X, 8);
const COUNTER_STRUT_XS = evenlySpaced(COUNTER_END_X, MAST_RAIL_L, 3);

// Local SVG units (viewBox is 0 0 144 420) — where the hook starts (slack,
// text not yet lifted) and where it rests once the tagline has risen. Rest
// lands the hook directly on the plate's corner (measured against the
// rendered layout, not estimated) so it reads as gripping it, not floating
// near a separate decoration.
const HOOK_START_Y = 300;
const HOOK_REST_Y = 137;
// The plate's width caps out (see Index.tsx) while the crane's own vh-based
// size keeps growing with viewport height, and those two don't grow at the
// same rate once the aspect ratio gets wide — so past 2xl the single
// HOOK_REST_Y above starts landing short of the plate. Re-measured against
// the actual rendered layout at 1920x1080 rather than derived.
const HOOK_REST_Y_WIDE = 182;

function useIsWideViewport() {
  const [isWide, setIsWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1536px)");
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isWide;
}

function CraneRig({ ready, reduced, hookRestY }: { ready: boolean; reduced: boolean; hookRestY: number }) {
  const cable: LegacyAnimationControls = useAnimation();
  const hook: LegacyAnimationControls = useAnimation();

  useEffect(() => {
    if (reduced) {
      cable.set({ y2: hookRestY });
      hook.set({ y: hookRestY });
      return;
    }
    if (!ready) return;

    let cancelled = false;
    (async () => {
      await Promise.all([
        cable.start({ y2: hookRestY, transition: { duration: 0.9, ease: "easeOut" } }),
        hook.start({ y: hookRestY, transition: { duration: 0.9, ease: "easeOut" } }),
      ]);
      if (cancelled) return;
      // Settle into the same gentle idle sway the logo itself has.
      cable.start({
        y2: [hookRestY, hookRestY + 6, hookRestY],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      });
      hook.start({
        y: [hookRestY, hookRestY + 6, hookRestY],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, reduced, hookRestY, cable, hook]);

  return (
    <svg viewBox="0 0 144 420" className="h-full w-auto overflow-visible" strokeLinecap="round">
      {/* counterweight block */}
      <rect x="2" y="30" width="12" height="27" rx="1.5" fill={STEEL} stroke={OUTLINE} strokeWidth={1.25} />

      {/* counter-jib truss (short arm balancing the counterweight) */}
      <line x1={COUNTER_END_X} y1={JIB_TOP} x2={MAST_RAIL_L} y2={JIB_TOP} stroke={STEEL} strokeWidth={1.75} />
      <line x1={COUNTER_END_X} y1={JIB_BOTTOM} x2={MAST_RAIL_L} y2={JIB_BOTTOM} stroke={STEEL} strokeWidth={1.75} />
      {COUNTER_STRUT_XS.map((x) => (
        <line key={`cs-${x}`} x1={x} y1={JIB_TOP} x2={x} y2={JIB_BOTTOM} stroke={STEEL} strokeWidth={1} />
      ))}

      {/* jib truss, extends toward the tagline */}
      <line x1={MAST_RAIL_R} y1={JIB_TOP} x2={JIB_END_X} y2={JIB_TOP} stroke={STEEL} strokeWidth={1.75} />
      <line x1={MAST_RAIL_R} y1={JIB_BOTTOM} x2={JIB_END_X} y2={JIB_BOTTOM} stroke={STEEL} strokeWidth={1.75} />
      {JIB_STRUT_XS.map((x) => (
        <line key={`js-${x}`} x1={x} y1={JIB_TOP} x2={x} y2={JIB_BOTTOM} stroke={STEEL} strokeWidth={1} />
      ))}
      {JIB_STRUT_XS.slice(0, -1).map((x, i) => {
        const nextX = JIB_STRUT_XS[i + 1];
        const forward = i % 2 === 0;
        return (
          <line
            key={`jd-${x}`}
            x1={forward ? x : nextX} y1={JIB_TOP}
            x2={forward ? nextX : x} y2={JIB_BOTTOM}
            stroke={STEEL} strokeWidth={0.75}
          />
        );
      })}

      {/* mast lattice */}
      <line x1={MAST_RAIL_L} y1={MAST_TOP} x2={MAST_RAIL_L} y2={MAST_BOTTOM} stroke={STEEL} strokeWidth={2.25} />
      <line x1={MAST_RAIL_R} y1={MAST_TOP} x2={MAST_RAIL_R} y2={MAST_BOTTOM} stroke={STEEL} strokeWidth={2.25} />
      {MAST_BRACE_YS.slice(0, -1).map((y, i) => {
        const nextY = MAST_BRACE_YS[i + 1];
        const forward = i % 2 === 0;
        return (
          <line
            key={`mb-${y}`}
            x1={forward ? MAST_RAIL_L : MAST_RAIL_R} y1={y}
            x2={forward ? MAST_RAIL_R : MAST_RAIL_L} y2={nextY}
            stroke={STEEL} strokeWidth={0.85}
          />
        );
      })}

      {/* operator's cab, tucked under the jib at the mast */}
      <rect x="19" y="46" width="21" height="14" rx="1.5" fill={STEEL} stroke={OUTLINE} strokeWidth={1.25} />

      {/* jib-tip bracket, anchors the cable */}
      <rect x={JIB_END_X} y={JIB_TOP - 5} width="5" height={JIB_BOTTOM - JIB_TOP + 10} fill={OUTLINE} />

      {/* cable — y2 animates from slack (HOOK_START_Y) up to resting (hookRestY) */}
      <motion.line
        x1={135.5}
        y1={JIB_BOTTOM}
        x2={135.5}
        initial={{ y2: reduced ? hookRestY : HOOK_START_Y }}
        animate={cable}
        stroke={OUTLINE}
        strokeWidth={2}
      />

      {/* hook block — translates in lockstep with the cable's endpoint,
          reaching down onto the plate's corner (rendered on top of it, per
          normal stacking, so it reads as gripping the edge) */}
      <motion.g initial={{ y: reduced ? hookRestY : HOOK_START_Y }} animate={hook}>
        <rect x={135.5 - 5.5} y={0} width={11} height={9} rx={1.5} fill={STEEL} stroke={OUTLINE} strokeWidth={1.5} />
        <circle cx={135.5} cy={4.5} r={1.6} fill={ORANGE} />
        <path
          d={`M${135.5 - 3.5},9 L${135.5 - 3.5},14.5 A3.5,3.5 0 0 0 ${135.5 + 3.5},14.5 L${135.5 + 3.5},9`}
          fill="none"
          stroke={OUTLINE}
          strokeWidth={2}
        />
      </motion.g>
    </svg>
  );
}

// Two flanking silhouette cranes whose hooks reel the tagline up into place
// on the same beat the text itself rises — desktop-only real estate, so
// they only appear once there's room beside a centered heading.
export function HeroCranes({ ready }: HeroCranesProps) {
  const reduced = !!useReducedMotion();
  const isWide = useIsWideViewport();
  const hookRestY = isWide ? HOOK_REST_Y_WIDE : HOOK_REST_Y;

  return (
    <>
      <div
        className="pointer-events-none absolute bottom-0 left-[2vw] hidden h-[82vh] lg:block xl:left-[4vw] 2xl:left-[13vw] [@media(max-height:700px)]:hidden"
        aria-hidden="true"
      >
        <CraneRig ready={ready} reduced={reduced} hookRestY={hookRestY} />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 right-[2vw] hidden h-[82vh] -scale-x-100 lg:block xl:right-[4vw] 2xl:right-[13vw] [@media(max-height:700px)]:hidden"
        aria-hidden="true"
      >
        <CraneRig ready={ready} reduced={reduced} hookRestY={hookRestY} />
      </div>
    </>
  );
}

export default HeroCranes;
