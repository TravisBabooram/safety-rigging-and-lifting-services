import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * Renders a single JSON-LD <script> tag via react-helmet-async. Pass a
 * plain schema.org object; this just handles serializing and mounting it.
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export default StructuredData;
