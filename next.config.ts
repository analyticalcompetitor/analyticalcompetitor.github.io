import type { NextConfig } from "next";

/*
  Static export for GitHub Pages.
  ─────────────────────────────────────────────────────────
  · output: "export"  → `next build` writes a fully static site to out/
  · images.unoptimized → the Image Optimization API needs a server;
    Pages only serves files.
  · trailingSlash      → /about becomes /about/index.html, which is what
    a static file host expects.

  This is a user site (analyticalcompetitor.github.io), served from the
  domain root, so no basePath / assetPrefix is needed.
*/
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
