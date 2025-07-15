/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'tile.openstreetmap.org',
      'a.tile.openstreetmap.org',
      'b.tile.openstreetmap.org',
      'c.tile.openstreetmap.org' // OpenStreetMap tile servers
    ],
  },
};

export default nextConfig;