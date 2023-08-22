/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["files.stripe.com", "github.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
