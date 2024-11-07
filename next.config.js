// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: 'export',
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/welcome',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
