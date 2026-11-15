/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  async redirects() { return [{ source: "/shop", destination: "/training#shop", permanent: true }]; },
};
