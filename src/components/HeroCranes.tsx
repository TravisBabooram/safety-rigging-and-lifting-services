import { useEffect } from "react";
import { motion, useAnimation, useReducedMotion, type AnimationControls } from "framer-motion";

interface HeroCranesProps {
  // Same signal LogoHero's onBuildComplete feeds into — the cranes hoist
  // the tagline into place on the same beat the words themselves rise.
  ready: boolean;
}

const STEEL = "hsl(var(--muted-foreground))";
const OUTLINE = "hsl(var(--foreground))";
const ORANGE = "hsl(var(--primary))";

// Local SVG units (viewBox is 0 0 130 420) — where the hook starts (slack,
// text not yet lifted) and where it rests once the tagline has risen.
const HOOK_START_Y = 300;
const HOOK_REST_Y = 55;

function CraneRig({ ready, reduced }: { ready: boolean; reduced: boolean }) {
  const cable: AnimationControls = useAnimation();
  const hook: AnimationControls = useAnimation();

  useEffect(() => {
    if (reduced) {
      cable.set({ y2: HOOK_REST_Y });
      hook.set({ y: HOOK_REST_Y });
      return;
    }
    if (!ready) return;

    let cancelled = false;
    (async () => {
      await Promise.all([
        cable.start({ y2: HOOK_REST_Y, transition: { duration: 0.9, ease: "easeOut" } }),
        hook.start({ y: HOOK_REST_Y, transition: { duration: 0.9, ease: "easeOut" } }),
      ]);
      if (cancelled) return;
      // Settle into the same gentle idle sway the logo itself has.
      cable.start({
        y2: [HOOK_REST_Y, HOOK_REST_Y + 6, HOOK_REST_Y],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      });
      hook.start({
        y: [HOOK_REST_Y, HOOK_REST_Y + 6, HOOK_REST_Y],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, reduced, cable, hook]);

  return (
    <svg viewBox="0 0 130 420" className="h-full w-auto overflow-visible">
      {/* counterweight + counter-jib, purely for silhouette balance */}
      <rect x="4" y="34" width="10" height="26" rx="2" fill={STEEL} />
      <rect x="14" y="38" width="14" height="8" fill={STEEL} />
      {/* mast */}
      <rect x="28" y="40" width="7" height="368" fill={STEEL} />
      {/* jib, extends toward the tagline */}
      <rect x="28" y="36" width="95" height="9" fill={STEEL} />
      {/* jib-tip bracket */}
      <rect x="119" y="31" width="5" height="18" fill={OUTLINE} />

      {/* cable — y2 animates from slack (HOOK_START_Y) up to resting (HOOK_REST_Y) */}
      <motion.line
        x1={121.5}
        y1={45}
        x2={121.5}
        initial={{ y2: reduced ? HOOK_REST_Y : HOOK_START_Y }}
        animate={cable}
        stroke={OUTLINE}
        strokeWidth={2}
      />

      {/* hook — translates in lockstep with the cable's endpoint */}
      <motion.g initial={{ y: reduced ? HOOK_REST_Y : HOOK_START_Y }} animate={hook}>
        <circle cx={121.5} cy={0} r={6} fill={ORANGE} stroke={OUTLINE} strokeWidth={2} />
        <path d="M121.5,4 q10,10 0,19" fill="none" stroke={OUTLINE} strokeWidth={2.5} strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

// Two flanking silhouette cranes whose hooks reel the tagline up into place
// on the same beat the text itself rises — desktop-only real estate, so
// they only appear once there's room beside a centered heading.
export function HeroCranes({ ready }: HeroCranesProps) {
  const reduced = !!useReducedMotion();

  return (
    <>
      <div
        className="pointer-events-none absolute bottom-0 left-[2vw] hidden h-[64vh] lg:block xl:left-[4vw] [@media(max-height:700px)]:hidden"
        aria-hidden="true"
      >
        <CraneRig ready={ready} reduced={reduced} />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 right-[2vw] hidden h-[64vh] -scale-x-100 lg:block xl:right-[4vw] [@media(max-height:700px)]:hidden"
        aria-hidden="true"
      >
        <CraneRig ready={ready} reduced={reduced} />
      </div>
    </>
  );
}

export default HeroCranes;
