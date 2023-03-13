/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  basePath: prod ? '/user-bob.github.io' : '',
}

module.exports = nextConfig
