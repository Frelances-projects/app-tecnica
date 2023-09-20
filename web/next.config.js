/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
}

module.exports = {
  ...nextConfig,
  env: {
    API_URL: process.env.API_URL,
  },
};
