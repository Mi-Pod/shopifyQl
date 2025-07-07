const colors = require("colors");
require("dotenv").config();

const apiVersion = process.env.SHOPIFY_API_VERSION;

// Configuration for integrated sites
const integratedSites = [
  {
    code: "B2B",
    storeName: "mi-one-com",
    token: process.env.B2B_TOKEN,
  },
  {
    code: "B2C",
    storeName: "smoking-vapor-consumer",
    token: process.env.B2C_TOKEN,
  },
  {
    code: "VAP",
    storeName: "vaping-usa",
    token: process.env.VAP_TOKEN,
  },
];

/**
 * Retrieve the base URL and token for a given site.
 * @param {string} site - The site code (e.g., "B2C", "B2B", "VAP").
 * @returns {object} - An object containing the base URL and token for the site.
 */
function getSiteConfig(site) {
  const siteConfig = integratedSites.find((s) => s.code === site);

  if (!siteConfig) {
    console.error(
      colors.bold.red(`Site configuration not found for code: ${site}`)
    );
    throw new Error(`Site configuration not found for code: ${site}`);
  }

  const { storeName, token } = siteConfig;
  const baseURL = `https://${storeName}.myshopify.com/admin/api/${apiVersion}`;
  return { baseURL, token };
}

module.exports = { getSiteConfig };
