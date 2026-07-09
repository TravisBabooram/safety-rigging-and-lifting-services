import { useEffect, useState } from "react";
import { motion, useAnimation, useReducedMotion, type AnimationControls } from "framer-motion";

interface HeroCranesProps {
  // Same signal LogoHero's onBuildComplete feeds into — the cranes hoist
  // the tagline into place on the same beat the words themselves rise.
  ready: boolean;
}

const STEEL = "hsl(var(--muted-foreground))";
const OUTLINE = "hsl(var(--foreground))";
const ORANGE = "hsl(var(--primary))";

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
  const cable: AnimationControls = useAnimation();
  const hook: AnimationControls = useAnimation();

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
    <svg viewBox="0 0 144 420" className="h-full w-auto overflow-visible">
      {/* counterweight + counter-jib, purely for silhouette balance */}
      <rect x="4" y="34" width="10" height="26" rx="2" fill={STEEL} />
      <rect x="14" y="38" width="14" height="8" fill={STEEL} />
      {/* mast */}
      <rect x="28" y="40" width="7" height="368" fill={STEEL} />
      {/* jib, extends toward the tagline */}
      <rect x="28" y="36" width="109" height="9" fill={STEEL} />
      {/* jib-tip bracket */}
      <rect x="133" y="31" width="5" height="18" fill={OUTLINE} />

      {/* cable — y2 animates from slack (HOOK_START_Y) up to resting (hookRestY) */}
      <motion.line
        x1={135.5}
        y1={45}
        x2={135.5}
        initial={{ y2: reduced ? hookRestY : HOOK_START_Y }}
        animate={cable}
        stroke={OUTLINE}
        strokeWidth={2}
      />

      {/* hook — translates in lockstep with the cable's endpoint, reaching
          down onto the plate's corner (rendered on top of it, per normal
          stacking, so it reads as gripping the edge) */}
      <motion.g initial={{ y: reduced ? hookRestY : HOOK_START_Y }} animate={hook}>
        <circle cx={135.5} cy={0} r={6} fill={ORANGE} stroke={OUTLINE} strokeWidth={2} />
        <path d="M135.5,4 q10,10 0,19" fill="none" stroke={OUTLINE} strokeWidth={2.5} strokeLinecap="round" />
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
