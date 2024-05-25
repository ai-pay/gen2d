/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.gen2d.dev",
        port: "",
        pathname: "/**.jpg",
      },
      {
        protocol: "https",
        hostname: "icon.gen2d.dev",
        port: "",
        pathname: "/**.jpg",
      },
    ],
  },
};

export default nextConfig;
