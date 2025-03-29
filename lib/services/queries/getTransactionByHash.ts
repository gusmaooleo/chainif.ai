export const getTransactionsByHashQuery = (pk: string, hash: string) => ({
  query: `{
    transactions(
      owners: ["${pk}"],
      tags: [
        {
          name: "Hash",
          values: ["${hash}"]
        }
      ]
    ) {
      edges {
        node {
          id
          owner {
            address
          }
          tags {
            name
            value
          }
          block {
            timestamp
            height
          }
          data {
            size
            type
          }
          fee {
            winston
            ar
          }
        }
      }
    }
  }`,
});