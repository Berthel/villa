const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    domains: ['localhost'],
  },
}

module.exports = withNextIntl(nextConfig)
