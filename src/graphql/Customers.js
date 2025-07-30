const { shopifyQl } = require("../api/Shopify.QL");

exports.getCustomer = async (site, customer_id) => {
  if (customer_id.substring(0, 3) !== "gid") {
    customer_id = `gid://shopify/Customer/${customer_id}`;
  }
  const query = /* GraphQL */ `query {
  customer(id: "${customer_id}") {
    id
    email
    createdAt
    updatedAt
  }
}`;
  const input = null;
  const res = await shopifyQl(site, query, input);
  return res.data;
};

exports.createCustomer = async (
  site,
  customer_email,
  phone,
  firstName,
  tags
) => {
  const query = /* GraphQL */ `
    mutation customerCreate($input: CustomerInput!) {
      customerCreate(input: $input) {
        userErrors {
          field
          message
        }
        customer {
          id
          email
          phone
          taxExempt
          firstName
          lastName
          tags
          amountSpent {
            amount
            currencyCode
          }
        }
      }
    }
  `;
  const input = {
    input: {
      email: customer_email,
      phone: phone,
      firstName: firstName,
      lastName: null,
      tags: tags,
    },
  };
  const response = await shopifyQl(site, query, input);
  return response.data.customerCreate;
};

exports.deleteCustomer = async (site, customer_id) => {
  if (customer_id.substring(0, 3) !== "gid") {
    customer_id = `gid://shopify/Customer/` + customer_id;
  }
  const query = /* GraphQL */ `
    mutation customerDelete($id: ID!) {
      customerDelete(input: { id: $id }) {
        shop {
          id
        }
        userErrors {
          field
          message
        }
        deletedCustomerId
      }
    }
  `;
  const input = {
    id: customer_id,
  };
  const res = await shopifyQl(site, query, input);
  return res.data;
};
