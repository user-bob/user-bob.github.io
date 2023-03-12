/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";

const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export',
  basePath: !debug ? '/user-bob.github.io' : '',
  assetPrefix: !debug ? '/user-bob.github.io' : '',
  images: {
    loader: 'akamai',
    path: '',
  },
}

module.exports = nextConfig
