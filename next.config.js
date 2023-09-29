/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['localhost:3005'],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.js$/,
      include: /[\\/]node_modules[\\/](@mui[\\/])/,
      use: [options.defaultLoaders.babel],
    });
    return config;
  },
};

module.exports = nextConfig;
