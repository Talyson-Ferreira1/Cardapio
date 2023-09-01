'use client';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import { SearchContext } from '@/context/user/user';
import { FormatCoin } from '@/functions/formatCoin';
import ProductRecommended from '@/Components/Render-recommended-components/child/product';

import './style-buscar.css';

type ProductProps = {
  [product: string]: {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    id: string;
    available: boolean;
    stars: number;
  };
};

export default function Search() {
  const { productName } = useContext(SearchContext);
  const [name, setName] = useState('');
  const [products, setProducts] = useState<ProductProps>({});

  const hasAllLetter = (value1: string, value2: string) => {
    let array1 = value1.toLowerCase().split('');
    let array2 = value2.toLowerCase().split('');

    let result = true;
    let index = 0;

    for (let value of array2) {
      if (array1.length === index) break;

      if (!array1.includes(value)) {
        result = false;
      }

      index++;
    }

    return result;
  };

  const Format = (num: number) => {
    return FormatCoin(num);
  };

  useEffect(() => {
    let alreadyExistData = localStorage.getItem('All products');
    alreadyExistData && setProducts(JSON.parse(alreadyExistData));
  }, []);

  useEffect(() => {
    setName(productName);
  }, [productName]);

  return (
    <main>
      <>
        {products ? (
          <>
            {Object.keys(products).map((productId) => {
              let currentProduct = products[productId];
              let result = hasAllLetter(name, currentProduct.name);

              return (
                result && (
                  <Link
                    className="link"
                    key={productId}
                    href={`/produto/{currentProduct.id}`}
                    as={`/produto/${encodeURIComponent(currentProduct.id)}`}
                  >
                    <ProductRecommended
                      productImage={currentProduct.image}
                      productName={currentProduct.name}
                      productDescription={currentProduct.description}
                      productPrice={Format(currentProduct.price)}
                    />
                  </Link>
                )
              );
            })}
          </>
        ) : (
          <h1>Nada</h1>
        )}
      </>
    </main>
  );
}
