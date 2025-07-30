const { shopifyQl } = require("./src/api/Shopify.QL");
const { testConnection } = require("./src/test/connection");

// Pre-canned GraphQL Interactions
const Shop = require("./src/graphql/Shop");
const AccountCredit = require("./src/graphql/AccountCredit");
const Customers = require("./src/graphql/Customers");
const Metafields = require("./src/graphql/Metafields");
const Webhooks = require("./src/graphql/Webhooks");

module.exports = {
  shopifyQl,
  testConnection,
  Shop,
  AccountCredit,
  Customers,
  Metafields,
  Webhooks,
};
