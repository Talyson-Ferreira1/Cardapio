'use client';
import { useState, useEffect } from 'react';
import { SearchProduct } from '@/Components/utils/fetchProducts';
import { FormatCoin } from '../utils/formatCoin';

import ProductsRecommended from './child-components/ProductComponente';
import LoadingComponent from './child-components/LoadingComponente';

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
    id?: string;
    available?: boolean;
    stars?: number;
  };
};

import './recommendation-style.css';

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
      return Object.keys(data).map((productId) => {
        const currentProduct = data[productId];

        return (
          <div className="container-product-card" key={productId}>
            <ProductsRecommended
              productImage={currentProduct.image}
              productName={currentProduct.name}
              productDescription={currentProduct.description}
              productPrice={Format(currentProduct.price)}
            />
          </div>
        );
      });
    } else {
      return <LoadingComponent />;
    }
  };

  useEffect(() => {
    let alreadyExistData = sessionStorage.getItem('Recommended Products');

    if (alreadyExistData) {
      setData(JSON.parse(alreadyExistData));
    } else {
      FetchProducts();
    }
  }, []);

  useEffect(() => {
    if (data != undefined) {
      let cacheDataInSessionStorage = sessionStorage.setItem(
        'Recommended Products',
        JSON.stringify(data),
      );
      cacheDataInSessionStorage;
    }
  }, [data]);

  return <div className="container-all-produts">{renderedProducts()}</div>;
}
