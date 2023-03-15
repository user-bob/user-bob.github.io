/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  basePath: prod ? '/user-bob.github.io' : '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
