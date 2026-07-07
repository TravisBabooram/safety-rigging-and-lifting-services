import { useEffect, useRef, useState } from "react";

const LERP = 0.15;
const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary';
const CROSSHAIR_SELECTOR = '[data-cursor="crosshair"]';

/**
 * Desktop-only custom cursor: a small dot tracks the pointer directly, a
 * larger ring trails behind it with a lerp for weight. Shrinks the ring /
 * grows the dot over interactive elements (magnetic feel), and hides
 * itself entirely over anything tagged data-cursor="crosshair" so the
 * native crosshair cursor shows instead.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isPointerTarget, setIsPointerTarget] = useState(false);
  const [isCrosshair, setIsCrosshair] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsCrosshair(!!target.closest(CROSSHAIR_SELECTOR));
      setIsPointerTarget(!!target.closest(HOVER_SELECTOR));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);

    let raf: number;
    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * LERP;
      ring.current.y += (mouse.current.y - ring.current.y) * LERP;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const dotSize = isCrosshair ? 0 : isPointerTarget ? 12 : 8;
  const ringSize = isCrosshair ? 0 : isPointerTarget ? 20 : 32;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full bg-brand-orange transition-[width,height,opacity] duration-150 ease-out"
        style={{ width: dotSize, height: dotSize, opacity: isCrosshair ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full border border-brand-orange transition-[width,height,opacity] duration-150 ease-out"
        style={{ width: ringSize, height: ringSize, opacity: isCrosshair ? 0 : 0.6 }}
      />
    </>
  );
}

export default CustomCursor;
