const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Zorg dat @/... vanaf projectroot resolve’t
    config.resolve.alias["@"] = path.resolve(__dirname);
    config.resolve.alias["@/components"] = path.resolve(__dirname, "components");
    config.resolve.alias["@/pages"] = path.resolve(__dirname, "pages");
    return config;
  },
};

module.exports = nextConfig;
