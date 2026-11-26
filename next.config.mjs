/** Allow next/image to serve photos from ImageKit (default host, plus a custom URL endpoint if set). */
const hosts = new Set(['ik.imagekit.io']);
try {
  if (process.env.IMAGEKIT_URL_ENDPOINT) hosts.add(new URL(process.env.IMAGEKIT_URL_ENDPOINT).hostname);
} catch {}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [...hosts].map((hostname) => ({ protocol: 'https', hostname })) },
  // Animal photos are posted through a server action; allow up to the 5 MB photo limit plus form fields.
  experimental: { serverActions: { bodySizeLimit: '6mb' } },
};

export default nextConfig;
