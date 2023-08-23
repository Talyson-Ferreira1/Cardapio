'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { SearchProduct } from '@/Components/utils/fetchProducts';
import { FormatCoin } from '../utils/formatCoin';
import { UpdateAllProducts } from '../utils/UpdateAllProducts';
import { UpdateSectionProducts } from '../utils/UpdateSectionProduct';
import ProductsRecommended from './child-components/ProductComponente';
import LoadingComponent from './child-components/LoadingComponente';

import './recommendation-style.css';

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

export default function RecommendationCards() {
  const [data, setData] = useState<ProductProps>();

  const FetchProducts = async () => {
    let searchProps: SearchProps = {
      Info_Collection: 'Produtos',
      Info_DocCollection: 'Recomendacoes',
      folderNameImg: 'Recommendations',
    };

    const allProducts = await SearchProduct(searchProps);
    setData(allProducts);
  };

  const Format = (num: number) => {
    return FormatCoin(num);
  };

  const renderedProducts = () => {
    if (data) {
      return (
        <div className="container-all-produts">
          {Object.keys(data).map((productId) => {
            const currentProduct = data[productId];

            return (
              <Link
                className="link"
                key={productId}
                href={{
                  pathname: `/produto/${currentProduct.id}`,
                  query: { data: JSON.stringify(currentProduct) },
                }}
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
    let alreadyExistData = sessionStorage.getItem('Recommended Products');

    alreadyExistData ? setData(JSON.parse(alreadyExistData)) : FetchProducts();
  }, []);

  useEffect(() => {
    data !== undefined &&
      (UpdateAllProducts(data),
      UpdateSectionProducts(data, 'Recommended Products'));
  }, [data]);

  return <>{renderedProducts()}</>;
}
