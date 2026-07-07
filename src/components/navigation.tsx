import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

interface ViewTransition {
  ready: Promise<void>;
}

interface ViewTransitionDocument extends Document {
  startViewTransition?: (callback: () => void) => ViewTransition;
}

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { resolvedTheme, setTheme } = useTheme();

  const { scrollY } = useScroll();
  const navBlurPx = useTransform(scrollY, [0, 80], [0, 12]);
  const navBackdropFilter = useMotionTemplate`blur(${navBlurPx}px)`;
  const navBgAlpha = useTransform(scrollY, [0, 80], [1, 0.85]);
  const navBackgroundColor = useMotionTemplate`hsl(var(--nav-background) / ${navBgAlpha})`;
  const navPaddingY = useTransform(scrollY, [0, 80], [16, 8]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    const { clientX: x, clientY: y } = event;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => setTheme(nextTheme));

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 600, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      style={{ backdropFilter: navBackdropFilter, WebkitBackdropFilter: navBackdropFilter, backgroundColor: navBackgroundColor }}
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        isScrolled ? "border-border" : "border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ paddingTop: navPaddingY, paddingBottom: navPaddingY }}
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/assets/images/25e7cac9-955d-46a1-8e99-1fae325046d6.png"
              alt="Safety Rigging & Lifting Services Ltd. logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative py-1 text-sm font-medium text-nav-foreground transition-colors hover:text-brand-orange"
                >
                  <span className={isActive ? "text-brand-orange" : ""}>{item.name}</span>
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-left bg-brand-orange transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-nav-foreground hover:text-brand-orange transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {resolvedTheme === "dark" ? (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute"
                  >
                    <Moon className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="sun"
                    initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute"
                  >
                    <Sun className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden text-nav-foreground hover:text-brand-orange transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleMenu}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors hover:text-brand-orange hover:bg-white/5 ${
                      location.pathname === item.path
                        ? "text-brand-orange"
                        : "text-nav-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
