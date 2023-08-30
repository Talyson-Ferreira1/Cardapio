'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { FormatCoin } from '../utils/formatCoin';
import { SearchProduct } from '@/Components/utils/fetchProducts';
import { UpdateAllProducts } from '../utils/UpdateAllProducts';
import { UpdateSectionProducts } from '../utils/UpdateSectionProduct';
import Product from './childs/Product';
import LoadingMeals from './childs/LoadingMeals';

import './renderSection.css';

type SearchProps = {
  Info_Collection: string;
  Info_DocCollection: string;
  folderNameImg: string;
};

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
    let searchProps: SearchProps = {
      Info_Collection: 'Produtos',
      Info_DocCollection: 'AllProducts',
      folderNameImg: 'AllProducts',
    };

    let AllProducts = await SearchProduct(searchProps);

    let newData: ProductProps = {};

    for (let Product in AllProducts) {
      if (AllProducts[Product].category === category) {
        newData = {
          ...newData,
          [Product]: AllProducts[Product],
        };
      }
    }

    setProducts(newData);
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
      UpdateSectionProducts(Products, `${category}`));
  }, [Products]);

  return <>{renderedProducts()}</>;
}
