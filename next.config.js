/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    domains: ["localhost" , "encrypted-tbn0.gstatic.com" , "res.cloudinary.com" ,  'influencermarketinghub.com' , 'i0.wp.com' , 'itscasualblog.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
