import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    CUSTOM_API_URL: 'https://untitled-twkmuar27a-uc.a.run.app',
    CUSTOM_API_TOKEN: '97848e8babeb149f26a044838f1fcb6f52d60e7b',
  },
  images: {
    domains: ['untitled-twkmuar27a-uc.a.run.app'],  // Add your image host domain here
  },
};

export default nextConfig;
