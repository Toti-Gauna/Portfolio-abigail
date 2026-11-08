import type { NextConfig } from 'next';

// GitHub Pages serves the project under /<repo>: the workflow passes it in NEXT_PUBLIC_BASE_PATH.
// A custom domain needs no basePath.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

const config: NextConfig = {
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default config;
