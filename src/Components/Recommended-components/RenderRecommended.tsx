'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { SearchProduct } from '@/Components/utils/fetchProducts';
import { FormatCoin } from '../utils/formatCoin';
import ProductsRecommended from './child/ProductComponente';
import LoadingComponent from './child/LoadingComponente';

import './recommendation-style.css';
import { UpdateSectionProducts } from '../utils/UpdateSectionProduct';
import { UpdateAllProducts } from '../utils/UpdateAllProducts';

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
    id: string;
    available: boolean;
    stars: number;
  };
};

export default function RenderRecommended() {
  const [recommended, setRecommended] = useState<ProductProps>();

  const FetchProducts = async () => {
    let searchProps: SearchProps = {
      Info_Collection: 'Produtos',
      Info_DocCollection: 'AllProducts',
      folderNameImg: 'AllProducts',
    };

    let AllProducts = await SearchProduct(searchProps);

    let newData: ProductProps = {};

    for (let Product in AllProducts) {
      if (AllProducts[Product].category === 'recommendation') {
        newData = {
          ...newData,
          [Product]: AllProducts[Product],
        };
      }
    }

    setRecommended(newData);
  };

  const Format = (num: number) => {
    return FormatCoin(num);
  };

  const renderedProducts = () => {
    if (recommended) {
      return (
        <div className="container-all-produts">
          {Object.keys(recommended).map((productId) => {
            const currentProduct = recommended[productId];

            return (
              <Link
                className="link"
                key={productId}
                href={`/produto/${currentProduct.id}`}
                as={`/produto/${encodeURIComponent(currentProduct.id)}`}
              >
                <div className="container-product-card" key={productId}>
                  <ProductsRecommended
                    productImage={currentProduct.image}
                    productName={currentProduct.name}
                    productDescription={currentProduct.description}
                    productPrice={Format(currentProduct.price)}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      );
    } else {
      return <LoadingComponent />;
    }
  };

  useEffect(() => {
    FetchProducts();
  }, []);

  useEffect(() => {
    let alreadyExistData = sessionStorage.getItem('Recommendation');

    alreadyExistData
      ? setRecommended(JSON.parse(alreadyExistData))
      : FetchProducts();
    FetchProducts();
  }, []);

  useEffect(() => {
    recommended !== undefined &&
      (UpdateAllProducts(recommended),
      UpdateSectionProducts(recommended, 'Recommendation'));
  }, [recommended]);

  return <>{renderedProducts()}</>;
}
