const { shopifyQl } = require("../api/Shopify.QL");

async function getShop(site) {
  const query = ` {
  shop {
    id
    name
  }
}`;
  const input = null;
  try {
    const response = await shopifyQl(site, query, input);
    return response.data;
  } catch (error) {
    return error;
  }
}

module.exports = { getShop };
