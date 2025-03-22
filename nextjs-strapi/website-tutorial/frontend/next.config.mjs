/** @type {import('next').NextConfig} */

const nextConfig = {
  images: { // set this up because nextjs restrict external image domains by default
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**/*",
      },
    ],
  },
};

export default nextConfig;
