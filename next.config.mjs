/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence the workspace root lockfile warning
  outputFileTracingRoot: '/Users/erkinislam/Desktop/nas-website-v3',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
