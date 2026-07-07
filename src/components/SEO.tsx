import { Helmet } from "react-helmet-async";

const DEFAULT_OG_IMAGE = "https://safetyriggingandliftingconsultancy.com/assets/images/cdae1e93-e234-4e65-8bf1-356fd65f4de2.png";
const DEFAULT_OG_TYPE = "website";

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
}

/**
 * Per-route SEO tags. Mount once near the top of each public page with
 * that page's own title/description/canonical — react-helmet-async merges
 * these into <head>, overriding the static defaults in index.html.
 */
export function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = DEFAULT_OG_TYPE,
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

export default SEO;
