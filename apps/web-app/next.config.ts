import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@devolution/ui', '@devolution/api-client'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.INTERNAL_API_URL ?? 'http://localhost:3001'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
