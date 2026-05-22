import type { NextConfig } from "next";

const remotePatterns: any[] = [];

if (process.env.NODE_ENV === "development") {
  remotePatterns.push({
    protocol: "http",
    hostname: "localhost",
    port: "1340",
    pathname: "/api/**",
  });
  remotePatterns.push({
    protocol: "http",
    hostname: "0.0.0.0",
    port: "1340",
    pathname: "/uploads/**",
  });
} else {
  remotePatterns.push({
    protocol: "https",
    hostname: "quanglaam.com",
    port: "",
    pathname: "/**",
  });
  remotePatterns.push({
    protocol: "https",
    hostname: "cms.quanglaam.com",
    port: "",
    pathname: "/**",
  });
}
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  distDir: "build",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: `/work`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
