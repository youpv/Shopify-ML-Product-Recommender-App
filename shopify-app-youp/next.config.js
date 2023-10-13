/** @type {import('next').NextConfig} */

import "@shopify/shopify-api/adapters/node";
import setupCheck from "./utils/setupCheck.js";

setupCheck();

console.log(`--> Running in ${process.env.NODE_ENV} mode`);

const rewrites = () => {
  return [
    {
      source: "/api/recommendation/:productHandle",
      destination: "http://127.0.0.1:5137/api/recommendation/:productHandle",
    },
    {
      source: "/api/recommendation/:productHandle/:numRecs",
      destination: "http://127.0.0.1:5137/api/recommendation/:productHandle/:numRecs",
    },
  ];
};

const nextConfig = {
  rewrites,
  reactStrictMode: true,
  env: {
    CONFIG_SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    CONFIG_SHOPIFY_APP_URL: process.env.SHOPIFY_APP_URL,
  },
};

export default nextConfig;
