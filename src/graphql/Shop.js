const { shopifyQl } = require("../api/Shopify.QL");

exports.getShop = async (site) => {
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

};


