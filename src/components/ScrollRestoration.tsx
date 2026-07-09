import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// This is a client-rendered SPA (see CLAUDE.md), so the browser never gets
// a fresh document load between routes — without this, navigating to a new
// page keeps whatever scroll position the previous page was left at.
// useLayoutEffect (not useEffect) so the jump happens before paint, not as
// a visible flash after the new page's content is already on screen.
export function ScrollRestoration() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollRestoration;
