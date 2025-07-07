# Shopify QL Package

Custom wrapper for Shopify GraphQL, by Mi-One Brands

### Required `.ENV` Variables

```txt
B2C_TOKEN=null
B2B_TOKEN=null
VAP_TOKEN=null
SHOPIFY_API_VERSION=null
```

### Example Usage

```js
import { shopifyQl } from "mipod-shopifyql";

async function getShopName() {
  const site = "B2B";
  const query = `
{
  shop {
    id
    name
    }
}
  `;
  const input = null;
  const response = await shopifyQl(site, query, input);
  const shop = response.data.shop;
  console.log(`Found:`, shop.name);
}

getShopName();
```
