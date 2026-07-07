import { ReactNode, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.25, ease: "easeOut" } },
};

/**
 * Wraps a single page's content so it fades/slides in on entry and out on
 * route change, paired with a thin orange progress bar across the top of
 * the viewport that fills while the entry transition plays.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const raf = requestAnimationFrame(() => setProgress(100));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-brand-orange z-[100]"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
      {children}
    </motion.div>
  );
}

export default PageTransition;
