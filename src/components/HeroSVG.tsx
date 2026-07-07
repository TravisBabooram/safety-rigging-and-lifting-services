import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

const VIEW_W = 800;
const VIEW_H = 600;

// Mast
const MAST_X = 390;
const MAST_Y = 150;
const MAST_W = 20;
const MAST_H = 380;
const MAST_CENTER_X = MAST_X + MAST_W / 2; // 400

// Jib (extends right)
const JIB_TOP_Y = 165;
const JIB_BOTTOM_Y = 195;
const JIB_START_X = 410;
const JIB_END_X = 700;
const JIB_STRUTS = [410, 470, 530, 590, 650, 700];

// Counter-jib (extends left)
const COUNTER_START_X = 390;
const COUNTER_END_X = 180;
const COUNTERWEIGHT = { x: 155, y: 155, width: 30, height: 50 };

// Cab
const CAB = { x: 370, y: 130, width: 60, height: 35 };

// Trolley — GSAP tweens its x attribute directly between these two values
const TROLLEY_Y = 158;
const TROLLEY_W = 24;
const TROLLEY_H = 14;
const TROLLEY_X_MIN = 480;
const TROLLEY_X_MAX = 650;

// Cable / hook / load — fixed horizontally under the trolley's rest position
const RIG_X = 592;
const CABLE_TOP_Y = 172;
const CABLE_LENGTH = 180;
const HOOK_BLOCK_Y = CABLE_TOP_Y + CABLE_LENGTH; // 352
const LOAD = { width: 60, height: 45, y: 390 };

type Stage = "draw" | "settle" | "idle";

const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay, duration: 1.5, ease: "easeInOut" as const },
  }),
};

const STROKE_MAIN = 2.5;
const STROKE_LATTICE = 1.5;
const DRAW_DURATION_MS = 3000;

interface Palette {
  bg: string;
  structure: string;
  accent: string;
  cable: string;
  loadFill: string;
}

function usePalette(): Palette {
  const { resolvedTheme } = useTheme();
  if (resolvedTheme === "light") {
    return { bg: "#F4F4F4", structure: "#2A2A2A", accent: "#E8510A", cable: "#888888", loadFill: "rgba(232,81,10,0.15)" };
  }
  return { bg: "#1A1A1A", structure: "#3D3D3D", accent: "#E8510A", cable: "#888888", loadFill: "rgba(232,81,10,0.15)" };
}

function evenlySpaced(start: number, end: number, count: number) {
  const cell = (end - start) / count;
  return Array.from({ length: count }, (_, i) => start + cell * (i + 0.5));
}

const MAST_BRACE_CENTERS = evenlySpaced(MAST_Y, MAST_Y + MAST_H, 6);

export function HeroSVG() {
  const palette = usePalette();
  const [stage, setStage] = useState<Stage>("draw");
  const trolleyRef = useRef<SVGRectElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);

  const bounceControls = useAnimation(); // shared hook+load drop/settle
  const hookSwayControls = useAnimation();
  const loadSwayControls = useAnimation();
  const counterweightControls = useAnimation();

  // Advance draw -> settle -> idle
  useEffect(() => {
    const t = setTimeout(() => setStage("settle"), DRAW_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  // Phase B — settle
  useEffect(() => {
    if (stage !== "settle") return;

    counterweightControls.start({
      y: [0, -3, 0],
      transition: { duration: 0.6, ease: "easeOut" },
    });

    (async () => {
      await bounceControls.start({ y: 8, transition: { duration: 0.15, ease: "easeIn" } });
      await bounceControls.start({ y: 0, transition: { type: "spring", stiffness: 300, damping: 8 } });
      await loadSwayControls.start({
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.8, type: "spring", damping: 8 },
      });
      setStage("idle");
    })();
  }, [stage, bounceControls, loadSwayControls, counterweightControls]);

  // Phase C — continuous idle loops
  useEffect(() => {
    if (stage !== "idle") return;

    hookSwayControls.start({
      rotate: [0, 3, -3, 0],
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
    });
    loadSwayControls.start({
      rotate: [0, -2, 2, 0],
      transition: { duration: 4, ease: "easeInOut", repeat: Infinity, delay: 0.5 },
    });
  }, [stage, hookSwayControls, loadSwayControls]);

  // Phase D — GSAP trolley slide (tweens the rect's x attribute directly,
  // never a wrapping transform, so it can't fight framer-motion/CSS transforms)
  useEffect(() => {
    if (stage !== "idle" || !trolleyRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        trolleyRef.current,
        { attr: { x: TROLLEY_X_MIN } },
        { attr: { x: TROLLEY_X_MAX }, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" }
      );
    });
    return () => ctx.revert();
  }, [stage]);

  // Phase D — GSAP ambient welding-spark particles
  useEffect(() => {
    if (stage !== "idle" || !sparksRef.current) return;
    const container = sparksRef.current;
    const origins = [
      [50, 28], [56, 32], [44, 40], [60, 45], [38, 55], [52, 60], [46, 25], [58, 50],
    ]; // [x%, y%] roughly along the crane silhouette

    let cancelled = false;
    let timeoutId = window.setTimeout(spawn, 300);

    function spawn() {
      if (cancelled) return;
      const [ox, oy] = origins[Math.floor(Math.random() * origins.length)];
      const spark = document.createElement("span");
      Object.assign(spark.style, {
        position: "absolute",
        left: `${ox + (Math.random() * 4 - 2)}%`,
        top: `${oy}%`,
        width: "4px",
        height: "4px",
        borderRadius: "9999px",
        background: "#E8510A",
        pointerEvents: "none",
        opacity: "0",
      });
      container.appendChild(spark);

      gsap.fromTo(
        spark,
        { opacity: 0.9, y: 0, x: 0 },
        {
          opacity: 0,
          y: -(30 + Math.random() * 30),
          x: Math.random() * 20 - 10,
          duration: 1.5 + Math.random() * 1.3,
          ease: "power1.out",
          onComplete: () => spark.remove(),
        }
      );

      timeoutId = window.setTimeout(spawn, 400 + Math.random() * 700);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [stage]);

  let latticeIndex = 0;
  const latticeDelay = () => 0.45 + latticeIndex++ * 0.03;

  return (
    <div
      className="absolute inset-0 transition-colors duration-400"
      style={{ backgroundColor: palette.bg }}
      aria-hidden="true"
      data-cursor="crosshair"
    >
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-full w-full">
        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Mast (draw index 0) */}
          <motion.rect
            x={MAST_X} y={MAST_Y} width={MAST_W} height={MAST_H}
            stroke={palette.structure} strokeWidth={STROKE_MAIN}
            variants={drawVariants} initial="hidden" animate="visible" custom={0}
          />

          {/* Counter-jib (draw index 1) */}
          <motion.line
            x1={COUNTER_START_X} y1={JIB_TOP_Y} x2={COUNTER_END_X} y2={JIB_TOP_Y}
            stroke={palette.structure} strokeWidth={STROKE_MAIN}
            variants={drawVariants} initial="hidden" animate="visible" custom={0.15}
          />
          <motion.line
            x1={COUNTER_START_X} y1={JIB_BOTTOM_Y} x2={COUNTER_END_X} y2={JIB_BOTTOM_Y}
            stroke={palette.structure} strokeWidth={STROKE_MAIN}
            variants={drawVariants} initial="hidden" animate="visible" custom={0.15}
          />
          <motion.g animate={counterweightControls}>
            <motion.rect
              x={COUNTERWEIGHT.x} y={COUNTERWEIGHT.y} width={COUNTERWEIGHT.width} height={COUNTERWEIGHT.height}
              stroke={palette.structure} strokeWidth={STROKE_MAIN} fill={palette.structure}
              variants={drawVariants} initial="hidden" animate="visible" custom={0.15}
            />
          </motion.g>

          {/* Jib (draw index 2) */}
          <motion.line
            x1={JIB_START_X} y1={JIB_TOP_Y} x2={JIB_END_X} y2={JIB_TOP_Y}
            stroke={palette.accent} strokeWidth={STROKE_MAIN}
            variants={drawVariants} initial="hidden" animate="visible" custom={0.3}
          />
          <motion.line
            x1={JIB_START_X} y1={JIB_BOTTOM_Y} x2={JIB_END_X} y2={JIB_BOTTOM_Y}
            stroke={palette.accent} strokeWidth={STROKE_MAIN}
            variants={drawVariants} initial="hidden" animate="visible" custom={0.3}
          />

          {/* Lattice bracing — mast X-patterns (draw index 3) */}
          {MAST_BRACE_CENTERS.map((cy) => (
            <g key={`mast-brace-${cy}`}>
              <motion.line
                x1={MAST_CENTER_X - 30} y1={cy - 25} x2={MAST_CENTER_X + 30} y2={cy + 25}
                stroke={palette.structure} strokeWidth={STROKE_LATTICE}
                variants={drawVariants} initial="hidden" animate="visible" custom={latticeDelay()}
              />
              <motion.line
                x1={MAST_CENTER_X + 30} y1={cy - 25} x2={MAST_CENTER_X - 30} y2={cy + 25}
                stroke={palette.structure} strokeWidth={STROKE_LATTICE}
                variants={drawVariants} initial="hidden" animate="visible" custom={latticeDelay()}
              />
            </g>
          ))}

          {/* Jib struts + alternating diagonal bracing (draw index 3, continued) */}
          {JIB_STRUTS.map((x) => (
            <motion.line
              key={`strut-${x}`}
              x1={x} y1={JIB_TOP_Y} x2={x} y2={JIB_BOTTOM_Y}
              stroke={palette.accent} strokeWidth={STROKE_LATTICE}
              variants={drawVariants} initial="hidden" animate="visible" custom={latticeDelay()}
            />
          ))}
          {JIB_STRUTS.slice(0, -1).map((x, i) => {
            const nextX = JIB_STRUTS[i + 1];
            const forward = i % 2 === 0;
            return (
              <motion.line
                key={`diag-${x}`}
                x1={forward ? x : nextX} y1={JIB_TOP_Y}
                x2={forward ? nextX : x} y2={JIB_BOTTOM_Y}
                stroke={palette.accent} strokeWidth={STROKE_LATTICE}
                variants={drawVariants} initial="hidden" animate="visible" custom={latticeDelay()}
              />
            );
          })}

          {/* Ambient orange pulse glow over the jib lattice, once settled */}
          <motion.g
            stroke={palette.accent}
            strokeWidth={STROKE_LATTICE}
            opacity={0.4}
            animate={stage === "idle" ? { opacity: [0.4, 0.8, 0.4] } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {JIB_STRUTS.slice(0, -1).map((x, i) => {
              const nextX = JIB_STRUTS[i + 1];
              const forward = i % 2 === 0;
              return (
                <line
                  key={`glow-${x}`}
                  x1={forward ? x : nextX} y1={JIB_TOP_Y}
                  x2={forward ? nextX : x} y2={JIB_BOTTOM_Y}
                />
              );
            })}
          </motion.g>

          {/* Cab (draw index 4) */}
          <motion.rect
            x={CAB.x} y={CAB.y} width={CAB.width} height={CAB.height}
            stroke={palette.structure} strokeWidth={STROKE_MAIN}
            variants={drawVariants} initial="hidden" animate="visible" custom={0.6}
          />

          {/* Trolley (draw index 5) — GSAP slides its x attribute once idle */}
          <motion.rect
            ref={trolleyRef}
            x={TROLLEY_X_MIN} y={TROLLEY_Y} width={TROLLEY_W} height={TROLLEY_H}
            stroke={palette.structure} strokeWidth={STROKE_MAIN}
            variants={drawVariants} initial="hidden" animate="visible" custom={0.75}
          />

          {/* Cable (draw index 6) */}
          <motion.line
            x1={RIG_X} y1={CABLE_TOP_Y} x2={RIG_X} y2={HOOK_BLOCK_Y}
            stroke={palette.cable} strokeWidth={STROKE_LATTICE}
            variants={drawVariants} initial="hidden" animate="visible" custom={0.9}
          />

          {/* Hook assembly + load box share the settle bounce */}
          <motion.g animate={bounceControls}>
            {/* Hook (draw index 7) */}
            <motion.g style={{ transformOrigin: `${RIG_X}px ${HOOK_BLOCK_Y}px` }} animate={hookSwayControls}>
              <motion.rect
                x={RIG_X - 10} y={HOOK_BLOCK_Y} width={20} height={12}
                stroke={palette.accent} strokeWidth={2}
                variants={drawVariants} initial="hidden" animate="visible" custom={1.05}
              />
              <motion.path
                d={`M ${RIG_X - 10} ${HOOK_BLOCK_Y + 12} L ${RIG_X - 10} ${HOOK_BLOCK_Y + 22} A 10 10 0 0 0 ${RIG_X + 10} ${HOOK_BLOCK_Y + 22} L ${RIG_X + 10} ${HOOK_BLOCK_Y + 12}`}
                stroke={palette.accent} strokeWidth={STROKE_MAIN}
                variants={drawVariants} initial="hidden" animate="visible" custom={1.05}
              />
            </motion.g>

            {/* Load box (draw index 8) */}
            <motion.g style={{ transformOrigin: `${RIG_X}px ${LOAD.y}px` }} animate={loadSwayControls}>
              <motion.rect
                x={RIG_X - LOAD.width / 2} y={LOAD.y} width={LOAD.width} height={LOAD.height}
                stroke={palette.accent} strokeWidth={STROKE_MAIN} fill={palette.loadFill}
                variants={drawVariants} initial="hidden" animate="visible" custom={1.2}
              />
            </motion.g>
          </motion.g>
        </g>
      </svg>

      {/* Spark particles overlay */}
      <div ref={sparksRef} className="absolute inset-0 overflow-hidden" />
    </div>
  );
}

export default HeroSVG;
