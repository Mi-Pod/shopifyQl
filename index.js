const { shopifyQl } = require("./src/api/Shopify.QL");
const { testConnection } = require("./src/test/connection");
const Shop = require("./src/graphql/Shop");

module.exports = { shopifyQl, testConnection, Shop };
