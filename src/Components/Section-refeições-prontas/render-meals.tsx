'use client';
import { useEffect, useState } from 'react';
import { SearchProduct } from '../utils/fetchProducts';
import { FormatCoin } from '../utils/formatCoin';

import ProductsMeal from './chil-components/ProductComponent';
import LoadingComponent from './chil-components/LoadingComponent';

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

import './meals-styles.css';

export default function Meals() {
  const [data, setData] = useState<ProductProps>();

  const FetchProducts = async () => {
    let searchProps: SearchProps = {
      Info_Collection: 'Produtos',
      Info_DocCollection: 'Refeicoes prontas',
      folderNameImg: 'Meals',
    };

    let Meals = await SearchProduct(searchProps);
    setData(Meals);
  };

  const Format = (num: number) => {
    return FormatCoin(num);
  };

  const renderedProducts = () => {
    if (data) {
      return Object.keys(data).map((productId) => {
        const currentProduct = data[productId];

        return (
          <div className="product-card-container" key={productId}>
            <ProductsMeal
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
    let alreadyExistData = sessionStorage.getItem('Products Meals');

    if (alreadyExistData) {
      setData(JSON.parse(alreadyExistData));
      console.log('Produto resgatado');
    } else {
      FetchProducts();
      console.log('Produto requisitado');
    }
  }, []);

  useEffect(() => {
    if (data != undefined) {
      let cacheDataInSessionStorage = sessionStorage.setItem(
        'Products Meals',
        JSON.stringify(data),
      );
      cacheDataInSessionStorage;
    }
  }, [data]);

  return <>{renderedProducts()}</>;
}
