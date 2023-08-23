const Meals = {
  '161141721531273151327618114715': {
    name: 'Panqueca com frango',
    description:
      'Panqueca de frango, file de peito sassame, arroz, feijão, macarrão, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '16114172153127': {
    name: 'Panqueca',
    description:
      'Panqueca de frango, arroz, macarrão, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '6181147152761892015': {
    name: 'Frango frito',
    description:
      'Frango frito, arroz, feijão, macarrão, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '6181147152731513273118145': {
    name: 'Frango com carne',
    description:
      'Frango frito, bife de carne de gado, arroz, feijão, macarrão, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '311814527452771415': {
    name: 'Carne de gado',
    description:
      'Bife de carne de gado, arroz, feijão, macarrão, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '1659245273151327219115': {
    name: 'Peixe com baião',
    description: 'Peixe frito, Baião, batata frita, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '21911527139192015': {
    name: 'Baião misto',
    description:
      'Linguiça frita, ovo frito, baião, batata frita, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '3185135274527618114715': {
    name: 'Creme de frango',
    description:
      'Creme de frango, arroz, macarrão, batata palha, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '31851352745276181147152731513276181147152761892015': {
    name: 'Creme de frango com frango frito',
    description:
      'Creme de frango, frango frito, arroz, macarrão, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
};

Meals;
/* 'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import ProductInBag from '../section-bag-shopping/child-components/product';
import './style-shoping-cart.css';

export default function ProductCart() {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [fullPriceProducts, setFullPriceProduct] = useState<number>(0);
  const AllProducts = sessionStorage.getItem('All products');

  function getFullPrice(newPrice: number) {
    setFullPriceProduct(fullPriceProducts + newPrice);
  }

  const RenderProductsInThebag = () => {
    const ProductsInTheBag = localStorage.getItem('Shopping cart');

    if (ProductsInTheBag === null) {
      return <h1>Adicione produtos</h1>;
    } else if (AllProducts != null) {
      let ProductsInTheBagConverted = JSON.parse(ProductsInTheBag);
      let AllProductsConverted = JSON.parse(AllProducts);

      return (
        <div
          className={`container-shopping-cart ${isOpen ? 'open' : 'closed'}`}
        >
          <div className={`list-products ${isOpen ? 'open' : 'closed'}`}>
            {ProductsInTheBagConverted.map((element: string, index: number) => (
              <ProductInBag
                key={index}
                getFullPrice={getFullPrice}
                name={AllProductsConverted[element].name}
                image={AllProductsConverted[element].image}
                price={AllProductsConverted[element].price}
              />
            ))}
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    console.log(fullPriceProducts);
  }, [fullPriceProducts]);

  return (
    <>
      <button
        className={`button-shopping-cart ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src="/icons/bag.svg"
          alt="shopping cart"
          layout="insintric"
          width="20"
          height="20"
        />
      </button>

      {RenderProductsInThebag()}
    </>
  );
}
 */
