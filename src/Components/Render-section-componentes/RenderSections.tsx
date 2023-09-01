'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { FormatCoin } from '../../functions/formatCoin';
import { fetchProductsCategory } from '@/functions/fetchProducts';

import Product from './childs/Product';
import LoadingMeals from './childs/LoadingMeals';

import './renderSection.css';
import {
  SaveProductsInCache,
  UpdateAllProducts,
} from '@/functions/create-cache-storage';

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

type props = {
  category: string;
};

export default function RenderSection({ category }: props) {
  const [Products, setProducts] = useState<ProductProps>();

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
    if (Products) {
      return Object.keys(Products).map((productId) => {
        const currentProduct = Products[productId];

        return (
          <Link
            className="link"
            key={productId}
            href={`/produto/{currentProduct.id}`}
            as={`/produto/${encodeURIComponent(currentProduct.id)}`}
          >
            <div className="meal-product-card">
              <Product
                productImage={currentProduct.image}
                productName={currentProduct.name}
                productDescription={currentProduct.description}
                productPrice={Format(currentProduct.price)}
              />
            </div>
          </Link>
        );
      });
    } else {
      return <LoadingMeals />;
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
    Products !== undefined &&
      (UpdateAllProducts(Products),
      SaveProductsInCache(Products, `${category}`));
  }, [Products]);

  return <>{renderedProducts()}</>;
}
