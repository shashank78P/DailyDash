// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    eslint: { 
        ignoreDuringBuilds: true, 
      },
};

module.exports = {
    ...nextConfig,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.externals.push({ bufferutil: "bufferutil", "utf-8-validate": "utf-8-validate", "supports-color": "supports-color" });
        }

        return config;
    },
};