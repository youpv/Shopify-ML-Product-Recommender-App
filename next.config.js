/** @type {import('next').NextConfig} */

import "@shopify/shopify-api/adapters/node";
import setupCheck from "./utils/setupCheck.js";

setupCheck();

console.log(`--> Running in ${process.env.NODE_ENV} mode`);

const API_DESTINATION = process.env.API_DESTINATION;

const rewrites = () => {
  return [
    {
      source: "/api/recommendation/:productHandle",
      destination: `${API_DESTINATION}/api/recommendation/:productHandle`,
    },
    {
      source: "/api/recommendation/:productHandle/:numRecs",
      destination: `${API_DESTINATION}/api/recommendation/:productHandle/:numRecs`,
    },
    {
      source: "/api/products",
      destination: `${API_DESTINATION}/api/products`,
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
