import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Matches every canonical URL already indexed by search engines (/features/,
  // /docker-management-tools/, etc.) -- CONTENT_REGISTRY and sitemap.xml both
  // assume a trailing slash, so this avoids a wave of redirects on migration.
  trailingSlash: true,
  images: {
    // Image Optimization API needs a server; unavailable under output: 'export'.
    // The site has no next/image usage today, so this is a no-op safety net.
    unoptimized: true,
  },
};

export default nextConfig;
