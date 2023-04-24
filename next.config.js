/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["geobook-backend-production.up.railway.app", "localhost"],
  },
};

// module.exports = {
//   images: {
//     domain: ["geobook-backend-production.up.railway.app/"],
//   },
// };

module.exports = nextConfig;
