import { build } from "velite";

class VeliteWebpackPlugin {
  static started = false;
  constructor(options = {}) {
    this.options = options;
  }
  apply(compiler) {
    // executed three times in nextjs !!!
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      this.options.watch = this.options.watch ?? dev;
      this.options.clean = this.options.clean ?? !dev;
      await build(this.options); // start velite
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // other next config here...
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
  productionBrowserSourceMaps: true,
  images: {
    // domains: ["github.com", "user-images.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/InhwanCho/**",
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github-production-user-asset-6210df.s3.amazonaws.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
