import { ReactNode } from "react";
import { motion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  className?: string;
  as?: "div" | "section";
}

const OFFSET = 40;

function getOffset(direction: Direction) {
  switch (direction) {
    case "down":
      return { y: -OFFSET, x: 0 };
    case "left":
      return { y: 0, x: OFFSET };
    case "right":
      return { y: 0, x: -OFFSET };
    case "up":
    default:
      return { y: OFFSET, x: 0 };
  }
}

/**
 * Reusable scroll-reveal wrapper: fades and slides content in the first time
 * it enters the viewport. Default direction is "up" (the common section/card
 * reveal); pass "down"/"left"/"right" for variety where it reads better.
 */
export function MotionWrapper({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className,
  as = "div",
}: MotionWrapperProps) {
  const offset = getOffset(direction);
  const sharedProps = {
    className,
    initial: { opacity: 0, ...offset },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { delay, duration, ease: "easeOut" as const },
  };

  return as === "section" ? (
    <motion.section {...sharedProps}>{children}</motion.section>
  ) : (
    <motion.div {...sharedProps}>{children}</motion.div>
  );
}

export default MotionWrapper;
