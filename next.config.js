const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: "loose" },
  webpack: (config) => {
    // Zorg dat zowel "@" als "@/components" en "@/pages" resolven
    config.resolve.alias["@"] = path.resolve(__dirname);
    config.resolve.alias["@/components"] = path.resolve(__dirname, "components");
    config.resolve.alias["@/pages"] = path.resolve(__dirname, "pages");
    return config;
  },
};

module.exports = nextConfig;