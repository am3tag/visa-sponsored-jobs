/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  // This tells Next not to pre-render API routes
  typescript: {
    ignoreBuildErrors: false,
  },
  generateBuildId: async () => 'build-' + Date.now(),
};

export default nextConfig;
