/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
        },
        {
          protocol: 'https',
          hostname: 'getstream.io',
          port: '',
          pathname: '/*',
        },
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
          port: '',
          pathname: '/*',
        }
    ],
  },
}

module.exports = nextConfig
