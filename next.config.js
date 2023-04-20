/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /src[/\\]shaders[/\\]portal[/\\].+\.glsl$/,
      use: 'raw-loader',
    });
    return config;
  },
}

module.exports = nextConfig
