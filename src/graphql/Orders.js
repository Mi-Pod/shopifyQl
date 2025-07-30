const { shopifyQl } = require("../api/Shopify.QL");

exports.getOrderName = async (site, order_id) => {
  if (order_id.substring(0, 3) !== "gid") {
    order_id = "gid://shopify/Order/" + order_id;
  }
  const query = /* GraphQL */ `{
  order(id: "${order_id}") {
    id
    name
  }
}`;
  const input = null;
  const res = await shopifyQl(site, query, input);
  return res.data;
};

exports.getFulfillmentOrdersByOrderId = async (site, order_id) => {
  if (order_id.substring(0, 3) !== "gid") {
    order_id = "gid://shopify/Order/" + order_id;
  }
  const query = /* GraphQL */ `{
  order(id: "${order_id}") {
    id
    fulfillments {
      id
      name
      status
      trackingInfo(first: 10) {
        number
      }
    }
  }
}`;
  const input = null;
  const res = await shopifyQl(site, query, input);
  return res.data;
};
