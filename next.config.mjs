/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["sql.js", "nodemailer"]
  }
};

export default nextConfig;
