// next.config.mjs
import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s0oswg4s8sccggwogckkg84c.37.27.188.146.sslip.io",
      },
      {
        protocol: "http",
        hostname: "localhost:3000",
      },
    ],
  },
};

export default withPayload(nextConfig);
