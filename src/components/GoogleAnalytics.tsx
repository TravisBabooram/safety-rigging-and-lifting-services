import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = import.meta.env.VITE_GA_ID;

// The gtag.js bootstrap script and initial pageview live as static tags in
// index.html (so the very first load is tracked even before React mounts).
// This component only handles pageviews for subsequent client-side route
// changes, which the static script can't see on its own.
export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== 'function') return;
    window.gtag('config', GA_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location.pathname, location.search]);

  return null;
};

// Helper function to track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Helper function to track page views
export const trackPageView = (pagePath: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_ID) {
    window.gtag('config', GA_ID, {
      page_path: pagePath,
    });
  }
};

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
