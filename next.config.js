/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  }, images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'i.annihil.us' }
    ]
  }
}

module.exports = nextConfig
