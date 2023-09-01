'use client';
import { useEffect, useState } from 'react';
import { fetchProductsCategory } from '../../functions/fetchProducts';
import { FormatCoin } from '../../functions/formatCoin';
import ProductRecommended from './child/product';
import Link from 'next/link';
import LoadingComponent from './child/LoadingComponente';

import './recommendation-style.css';
import {
  SaveProductsInCache,
  UpdateAllProducts,
} from '@/functions/create-cache-storage';

type ProductProps = {
  [product: string]: {
    name: string;
    description: string;
    price: number;
    id: string;
    image: string;
    category: string;
    available: boolean;
    stars: number;
  };
};

type props = {
  category: string;
};

export default function Recommended({ category }: props) {
  const [products, setProducts] = useState<ProductProps>({});

  const FetchProducts = async () => {
    let AllProducts = await fetchProductsCategory(category);

    if (AllProducts != undefined) {
      setProducts(AllProducts);
    }
  };

  const Format = (num: number) => {
    return FormatCoin(num);
  };

  const renderedProducts = () => {
    if (Object.values(products).length > 0) {
      return Object.keys(products).map((productId) => {
        const currentProduct = products[productId];

        return (
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
        );
      });
    } else {
      return <LoadingComponent />;
    }
  };

  useEffect(() => {
    let alreadyExistData = sessionStorage.getItem(`${category}`);

    alreadyExistData
      ? setProducts(JSON.parse(alreadyExistData))
      : FetchProducts();
    FetchProducts();
  }, []);

  useEffect(() => {
    products !== undefined &&
      (UpdateAllProducts(products),
      SaveProductsInCache(products, `${category}`));
  }, [products]);

  return <>{renderedProducts()}</>;
}
