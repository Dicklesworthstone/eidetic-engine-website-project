/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverMinification: false,  // Disable minification to prevent variable access issues
  },
}

module.exports = nextConfig 