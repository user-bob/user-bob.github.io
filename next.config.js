/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  basePath: prod ? "/user-bob.github.io" : "",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // webpack: (config) => {
  //   config.externals = [...config.externals, "bcrypt"];
  //   config.resolve.fallback = { ...config.resolve.fallback, net: false, os: false };
  //   return config;
  // },
};

module.exports = nextConfig;
