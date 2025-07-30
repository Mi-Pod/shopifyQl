const { shopifyQl } = require("../api/Shopify.QL");

exports.getWebhooks = async (site, filter = `first: 10`) => {
  const query = /* GraphQL */ `{
    webhookSubscriptions(${filter}) {
      edges {
        node {
          id
          topic
          endpoint {
            ... on WebhookHttpEndpoint {
              __typename
              callbackUrl
            }
          }
          format
          includeFields
        }
        cursor
      }
    }
  }`;
  const input = null;
  const res = await shopifyQl(site, query, input);
  return res.data;
};

exports.createWebhook = async (
  site,
  topic,
  callbackUrl,
  includeFields = []
) => {
  const query = /* GraphQL */ `
    mutation webhookSubscriptionCreate(
      $topic: WebhookSubscriptionTopic!
      $webhookSubscription: WebhookSubscriptionInput!
    ) {
      webhookSubscriptionCreate(
        topic: $topic
        webhookSubscription: $webhookSubscription
      ) {
        webhookSubscription {
          id
          topic
          filter
          format
          includeFields
          endpoint {
            __typename
            ... on WebhookHttpEndpoint {
              callbackUrl
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const input = {
    topic,
    webhookSubscription: {
      callbackUrl,
      format: "JSON",
    },
  };
  if (includeFields.length > 0) {
    input.webhookSubscription.includeFields = includeFields;
  }

  const res = await shopifyQl(site, query, input);
  return res.data;
};

exports.deleteWebhook = async (site, webhookId) => {
  if (webhookId.substring(0, 3) !== "gid") {
    webhookId = `gid://shopify/WebhookSubscription/` + webhookId;
  }
  const query = /* GraphQL */ `
    mutation webhookSubscriptionDelete($id: ID!) {
      webhookSubscriptionDelete(id: $id) {
        userErrors {
          field
          message
        }
        deletedWebhookSubscriptionId
      }
    }
  `;
  const input = {
    id: webhookId,
  };
  const res = await shopifyQl(site, query, input);
  return res.data;
};
