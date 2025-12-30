import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Required for transformers.js WebAssembly support
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };
    return config;
  },

  // Image optimization - add external domains for Strapi and Squarespace images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: '*.strapiapp.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Experimental features for Next.js 15
  experimental: {
    // Enable PPR (Partial Prerendering) for optimal performance
    // ppr: true,
  },

  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com',
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        // Global security headers
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache CSS and JS with revalidation
        source: '/(.*)\\.(css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // API routes - no cache
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
      {
        // OG images - cache for 1 hour
        source: '/api/og',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // Redirects for legacy URLs and SEO
  async redirects() {
    return [
      // Legacy URL redirects (add your legacy URLs here)
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      // Common misspellings or variations
      {
        source: '/carrers',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/carreers',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/aboutus',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contactus',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      // Service page variations
      {
        source: '/services',
        destination: '/#services',
        permanent: true,
      },
      {
        source: '/rooftop-farming',
        destination: '/outdoor-farm',
        permanent: true,
      },
      {
        source: '/vertical-farming',
        destination: '/indoor-farm',
        permanent: true,
      },
      {
        source: '/urban-farming',
        destination: '/',
        permanent: true,
      },
      // Legal page variations
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/terms-of-service',
        permanent: true,
      },
      {
        source: '/cookies',
        destination: '/cookie-policy',
        permanent: true,
      },
      // Trailing slash normalization handled by Next.js trailingSlash config
    ];
  },
};

export default nextConfig;
