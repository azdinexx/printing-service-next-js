export const gql = String.raw;

type GraphQLResponse = {
  data: {
    products: {
      nodes: {
        title: string;
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

export const getProducts = async (): Promise<GraphQLResponse> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.ADMIN_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        query ProductsQuery {
          products(first: 6) {
            nodes {
              title
            }
          }
        }
      `,
    }),
  });
  if (!res.ok) {
    const text = await res.text(); // get the response body for more information

    throw new Error(`
          Failed to fetch data
          Status: ${res.status}
          Response: ${text}
        `);
  }

  return res.json();
};
