/** @type {import('next').NextConfig} */
const nextConfig = { 
    images: {
      domains: ['loremflickr.com'], 
    },
      experimental: {
        missingSuspenseWithCSRBailout: false,
      },
  };
  
  export default nextConfig;
