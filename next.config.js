/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";

const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export',
  basePath: !debug ? '/user-bob.github.io' : '',
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
    }
  },
  // assetPrefix: !debug ? '/user-bob.github.io' : '',
}

module.exports = nextConfig
