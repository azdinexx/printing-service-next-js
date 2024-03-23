// Assuming you're using TypeScript, adjust the types as necessary for your setup

import { gql } from './gql';

type GraphQLResponse = {
  data: {
    customerAccessTokenCreate?: {
      customerAccessToken: {
        accessToken: string;
        expiresAt: string;
      };
      userErrors: {
        field: string;
        message: string;
      }[];
    };
    customerCreate?: {
      customer: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
      };
      userErrors: {
        field: string;
        message: string;
      }[];
    };
  };
  extensions: {
    cost: {
      requestedQueryCost: number;
      actualQueryCost: number;
      throttleStatus: {
        maximumAvailable: number;
        currentlyAvailable: number;
        restoreRate: number;
      };
    };
  };
};

export const loginCustomer = async (
  email: string,
  password: string
): Promise<GraphQLResponse> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        process.env.STOREFRONT_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customerUserErrors {
              code
              field
              message
            }
            customer {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          email: email,
          password: password,
        },
      },
    }),
  });
  console.log(res);
  if (!res.ok) {
    const text = await res.text(); // get the response body for more information

    throw new Error(`
          Failed to log in customer
          Status: ${res.status}
          Response: ${text}
        `);
  }

  return res.json();
};

export const createCustomer = async (
  email: string,
  firstName: string,
  lastName: string
): Promise<GraphQLResponse> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        process.env.STOREFRONT_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        mutation CustomerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customer {
              id
              email
              firstName
              lastName
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        input: {
          email: email,
          firstName: firstName,
          lastName: lastName,
        },
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text(); // get the response body for more information

    throw new Error(`
          Failed to create customer
          Status: ${res.status}
          Response: ${text}
        `);
  }

  return res.json();
};
