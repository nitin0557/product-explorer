import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['fakestoreapi.com'], // replace with your API image domain
  },
};

export default nextConfig;
