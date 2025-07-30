const { shopifyQl } = require("../api/Shopify.QL");

exports.setMetafields = async (site, metafields) => {
  const query = /* GraphQL */ `
    mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          key
          namespace
          value
          createdAt
          updatedAt
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;
  const input = metafields;
  const res = await shopifyQl(site, query, input);
  return res.data;
};
