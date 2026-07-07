import { Children, ReactNode, isValidElement } from "react";
import { motion, Variants } from "framer-motion";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  as?: "div" | "ul";
}

const containerVariants = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay },
  },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Wraps a list of children (service cards, portfolio items, team members…)
 * so each one staggers in 0.1s apart the first time the group scrolls into
 * view. Children don't need to be motion-aware themselves — each is cloned
 * into its own motion.div that inherits the stagger timing from the parent.
 */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  as = "div",
}: StaggerContainerProps) {
  const items = Children.map(children, (child, index) =>
    isValidElement(child) ? (
      <motion.div key={child.key ?? index} variants={itemVariants} className="h-full">
        {child}
      </motion.div>
    ) : (
      child
    )
  );

  const sharedProps = {
    className,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.15 },
    variants: containerVariants(staggerDelay),
  };

  return as === "ul" ? (
    <motion.ul {...sharedProps}>{items}</motion.ul>
  ) : (
    <motion.div {...sharedProps}>{items}</motion.div>
  );
}

export default StaggerContainer;
