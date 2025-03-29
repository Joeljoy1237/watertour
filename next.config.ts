module.exports = {
  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/',
      },
      {
        source: '/dashboard',
        destination: '/dashboard/profile',
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ujg1omlqoz.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};
