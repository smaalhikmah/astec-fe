/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'api.smaalhikmah.com',
        port: '',
        pathname: '/image/**',
      },
    ],
  }
};

export default nextConfig;
