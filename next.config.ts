import type { NextConfig } from "next";
import { projectsRaw } from "./app/constants/projects";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  async redirects() {
    return projectsRaw.map((project) => ({
      source: `/projects/${project.id}`,
      destination: `/projects/${project.slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
