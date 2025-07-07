const { shopifyQl } = require("../api/Shopify.QL");
const colors = require("colors");
async function testConnection() {
  const sites = ["B2B", "B2C", "VAP"];
  console.log(`Testing connection for sites:`.cyan.bold, sites.length);
  let results = [];

  for (let i = 0; i < sites.length; i++) {
    const query = ` {
  shop {
    id
    name
  }
}`;
    const input = null;
    try {
      let response = await shopifyQl(sites[i], query, input);
      const shop = response.data.shop;
      console.log(`Connected to:`.green, shop.name);
      results.push({ site: sites[i], status: "Connected" });
    } catch (error) {
      results.push({ site: sites[i], status: "Error" });
    }
  }
  return results;
}

module.exports = { testConnection };
