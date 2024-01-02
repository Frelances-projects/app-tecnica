/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  ...nextConfig,
  env: {
    API_URL: process.env.API_URL,
  },
};
