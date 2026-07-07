import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "srls-loading-shown";
const LOGO_DRAW_DURATION = 1.2;
const COMPANY_NAME = "SAFETY RIGGING & LIFTING SERVICES LTD.";
const TYPE_INTERVAL_MS = 32;
const HOLD_MS = 2200;

/**
 * First-load-only splash: draws a simplified shackle mark, types out the
 * company name, fills an orange progress bar, then fades to reveal the
 * page. Gated on sessionStorage so it only plays once per browser tab.
 */
export function LoadingScreen() {
  const [skip, setSkip] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const [typedChars, setTypedChars] = useState(0);
  const [barFilled, setBarFilled] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setSkip(true);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "true");
    setSkip(false);
  }, []);

  useEffect(() => {
    if (skip !== false) return;

    const typeTimer = setInterval(() => {
      setTypedChars((c) => (c >= COMPANY_NAME.length ? c : c + 1));
    }, TYPE_INTERVAL_MS);
    const fillTimer = setTimeout(() => setBarFilled(true), 100);
    const hideTimer = setTimeout(() => setVisible(false), HOLD_MS);

    return () => {
      clearInterval(typeTimer);
      clearTimeout(fillTimer);
      clearTimeout(hideTimer);
    };
  }, [skip]);

  if (skip === null || skip === true) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-6 bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <svg width={72} height={90} viewBox="0 0 72 90" fill="none" aria-hidden="true">
            <motion.rect
              x={26} y={4} width={20} height={20}
              stroke="#3D3D3D" strokeWidth={4}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: LOGO_DRAW_DURATION * 0.4, ease: "easeInOut" }}
            />
            <motion.path
              d="M16 20 L16 42 A20 20 0 0 0 56 42 L56 20"
              stroke="#E8510A" strokeWidth={4} strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: LOGO_DRAW_DURATION * 0.6, ease: "easeInOut", delay: LOGO_DRAW_DURATION * 0.4 }}
            />
          </svg>

          <div className="font-heading text-base sm:text-xl tracking-[0.15em] text-foreground uppercase min-h-[1.5em]">
            {COMPANY_NAME.slice(0, typedChars)}
            <span className="text-brand-orange animate-pulse">|</span>
          </div>

          <div className="w-48 h-0.5 bg-brand-charcoal overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-brand-orange"
              initial={{ width: "0%" }}
              animate={{ width: barFilled ? "100%" : "0%" }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
