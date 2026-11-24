/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique servi par Cloudflare (Workers static assets)
  output: "export",

  // Pas d'optimiseur d'images côté serveur en export statique
  images: { unoptimized: true },
};

export default nextConfig;
