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
  const { product, minicart } = data;
  const { firstItem } = product;

  return (
    <div>
      <div>
        <h3>Items in cart: {minicart.itemCount}</h3>
      </div>
      <h1>{product.productName}</h1>
      <img height={150} width={150} src={firstItem.imageUrl} />
      <div>
        <span>
          For only: <strong>{firstItem.price}</strong>
        </span>
      </div>
    </div>
  );
}

export default App;
