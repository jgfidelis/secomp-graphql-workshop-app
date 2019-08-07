import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

function App() {
  const { data, loading } = useQuery(
    gql`
      query Product($slug: String!) {
        minicart {
          itemCount
          cacheId
        }
        product(slug: $slug) {
          productName
          categoryNames
          firstItem {
            itemId
            imageUrl
            price
            nameComplete
          }
        }
      }
    `,
    {
      variables: {
        slug: "men-balm-apos-barba-110g-23755"
      }
    }
  );
  if (loading) {
    return <span>Loading!!</span>;
  }
  console.log("data:", data);
  const { product } = data;
  return <div>Name: {product.productName}</div>;
}

export default App;
