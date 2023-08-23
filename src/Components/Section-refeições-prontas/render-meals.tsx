'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { SearchProduct } from '../utils/fetchProducts';
import { FormatCoin } from '../utils/formatCoin';
import { UpdateSectionProducts } from '../utils/UpdateSectionProduct';
import { UpdateAllProducts } from '../utils/UpdateAllProducts';
import ProductsMeal from './chil-components/ProductComponent';
import LoadingComponent from './chil-components/LoadingComponent';

import './meals-styles.css';

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
          <Link
            className="link"
            key={productId}
            href={{
              pathname: `/produto/${currentProduct.id}`,
              query: { data: JSON.stringify(currentProduct) },
            }}
            as={`/produto/${encodeURIComponent(currentProduct.id)}`}
          >
            <div className="product-card-container">
              <ProductsMeal
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
      return <LoadingComponent />;
    }
  };

  useEffect(() => {
    let alreadyExistData = sessionStorage.getItem('Products meals');
    alreadyExistData ? setData(JSON.parse(alreadyExistData)) : FetchProducts();
  }, []);

  useEffect(() => {
    data !== undefined &&
      (UpdateAllProducts(data), UpdateSectionProducts(data, 'Products meals'));
  }, [data]);

  return <>{renderedProducts()}</>;
}
