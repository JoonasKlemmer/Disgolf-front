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
        ],
      }
}
  
  export default nextConfig;
  