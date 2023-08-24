'use client';
import { useEffect, useState } from 'react';

import ProductBag from '@/Components/section-bag-shopping-copy/Product';

import './style.page-sacola.css';

type ProductsProps = {
  [product: string]: {
    name: string;
    description: string;
    price: number;
    image: string;
    id: string;
    available: boolean;
    stars: number;
  };
};

type ProductBagShopping = {
  [id: string]: number;
};

export default function BagShopping() {
  const [productsInBag, setProductsInBag] = useState<ProductBagShopping>();
  const [allProducts, setAllProducts] = useState<ProductsProps>();

  useEffect(() => {
    let getBagShoppingInLocStorage = localStorage.getItem('Shopping cart');
    let getAllProductsInLocStorage = localStorage.getItem('All products');

    if (getBagShoppingInLocStorage && getAllProductsInLocStorage) {
      let productConvertedToObj = {
        bagShopping: JSON.parse(getBagShoppingInLocStorage),
        allProducts: JSON.parse(getAllProductsInLocStorage),
      };

      setProductsInBag(productConvertedToObj.bagShopping);
      setAllProducts(productConvertedToObj.allProducts);
    }
  }, []);

  useEffect(() => {
    console.log(productsInBag);
  }, [productsInBag]);

  return (
    <main className="container-bag-shoping">
      <>
        {productsInBag && allProducts ? (
          Object.keys(productsInBag).map((productId: string, index: number) => (
            <ProductBag
              key={index}
              id={allProducts[productId].id}
              name={allProducts[productId].name}
              image={allProducts[productId].image}
              price={allProducts[productId].price}
              quantityOfProduct={productsInBag[productId]}
            />
          ))
        ) : (
          <h1>Adicione produtos</h1>
        )}
      </>
    </main>
  );
}
