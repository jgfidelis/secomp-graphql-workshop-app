import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

function useAddItem() {
  const [addItem] = useMutation(gql`
    mutation AddItem($itemId: String!) {
      addItemToCart(itemId: $itemId) {
        id
        itemCount
      }
    }
  `);
  return addItem;
}

function App() {
  const { data, loading } = useQuery(
    gql`
      query Product($slug: String!) {
        minicart {
          itemCount
          id
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

  const addItem = useAddItem();
  console.log("teste additem: ", addItem);
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
      <button
        onClick={() => addItem({ variables: { itemId: firstItem.itemId } })}
        style={{ height: "30px", width: "50px" }}
      >
        <strong>BUY</strong>
      </button>
    </div>
  );
}

export default App;
