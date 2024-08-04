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
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      },
    ],
  },
};

export default nextConfig;
