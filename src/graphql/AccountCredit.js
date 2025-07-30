const { shopifyQl } = require("../api/Shopify.QL");

exports.CreditAccount = async (site, customer_id, creditAmount) => {
  if (customer_id.substring(0, 3) !== "gid")
    customer_id = `gid://shopify/Customer/` + customer_id;
  const query = /* GraphQL */ `
    mutation storeCreditAccountCredit(
      $id: ID!
      $creditInput: StoreCreditAccountCreditInput!
    ) {
      storeCreditAccountCredit(id: $id, creditInput: $creditInput) {
        storeCreditAccountTransaction {
          amount {
            amount
            currencyCode
          }
          account {
            id
            balance {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          message
          field
        }
      }
    }
  `;

  const input = {
    id: customer_id,
    creditInput: {
      creditAmount: {
        amount: creditAmount,
        currencyCode: "USD",
      },
    },
  };

  const res = await shopifyQl(site, query, input);

  const transaction = res.data.storeCreditAccountCredit;
  return transaction;
};

exports.DebitAccount = async (site, storeCreditAccountId, debitAmount) => {
  if (storeCreditAccountId.substring(0, 3) !== "gid") {
    storeCreditAccountId = `gid://shopify/StoreCreditAccount/` + storeCreditAccountId;
  }

  const query = /* GraphQL */ `
    mutation storeCreditAccountDebit(
      $id: ID!
      $debitInput: StoreCreditAccountDebitInput!
    ) {
      storeCreditAccountDebit(id: $id, debitInput: $debitInput) {
        storeCreditAccountTransaction {
          amount {
            amount
            currencyCode
          }
          account {
            id
            balance {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          message
          field
        }
      }
    }
  `;
  const input = {
    id: storeCreditAccountId,
    debitInput: {
      debitAmount: {
        amount: debitAmount,
        currencyCode: "USD",
      },
    },
  };

  const res = await shopifyQl(site, query, input);

  const transaction = res.data.storeCreditAccountDebit;
  return transaction;
};
