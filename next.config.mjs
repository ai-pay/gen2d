/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/image/:path*', // Matches any path after /image/
            destination: 'https://img.gen2d.workers.dev/:path*',
          },
        ]
      },
};

export default nextConfig;
