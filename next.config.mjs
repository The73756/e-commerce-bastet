/** @type {import('next').NextConfig} */
import svg from '@neodx/svg/webpack';

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // Prevent doubling svg plugin, let's run it only for client build
    if (!isServer) {
      config.plugins.push(
        svg({
          root: 'assets/icons',
          group: true,
          output: 'public/sprites',
          metadata: {
            path: 'types/icon/sprite.gen.ts',
            runtime: {
              size: true,
              viewBox: true,
            },
          },
          resetColors: {
            exclude: ['assets/icons', /[a-z]*-colored\.svg$/],
            replaceUnknown: 'currentColor',
          },
        }),
      );
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
