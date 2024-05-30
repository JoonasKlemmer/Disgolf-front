/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.discsport.ee',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'discgolf.ee',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'discgolfar.ee',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'discy.ee',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig;
