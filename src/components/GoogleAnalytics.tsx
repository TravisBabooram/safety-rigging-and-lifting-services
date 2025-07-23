import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  trackingId?: string;
}

export const GoogleAnalytics = ({ trackingId }: GoogleAnalyticsProps) => {
  useEffect(() => {
    if (!trackingId) return;

    // Create gtag script element
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script1);

    // Create gtag config script
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}');
    `;
    document.head.appendChild(script2);

    // Cleanup function
    return () => {
      // Remove scripts on unmount (though this rarely happens)
      const scripts = document.querySelectorAll(`script[src*="${trackingId}"]`);
      scripts.forEach(script => script.remove());
    };
  }, [trackingId]);

  return null; // This component doesn't render anything
};

// Helper function to track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Helper function to track page views
export const trackPageView = (pagePath: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_TRACKING_ID', {
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