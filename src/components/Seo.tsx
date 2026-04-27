import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  ogTitle?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const SITE_NAME = "ARCG Systems";
const BASE_URL = "https://arcgsystems.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

export function Seo({
  title,
  description,
  ogTitle,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
}: SeoProps) {
  const resolvedCanonical = canonical
    ? `${BASE_URL}${canonical}`
    : BASE_URL;

  return (
    <Helmet>
      {/* Core */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={resolvedCanonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={resolvedCanonical} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
