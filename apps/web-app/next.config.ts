import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@devolution/ui', '@devolution/api-client'],
};

export default nextConfig;
