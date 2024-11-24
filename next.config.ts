import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      ...(config.watchOptions || {}),
      ignored: [...(config.watchOptions?.ignored || []), '**/supabase/functions/**'],
    };
    return config;
  },
  
};

export default nextConfig;
