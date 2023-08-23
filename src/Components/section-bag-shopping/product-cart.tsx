'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import ProductInBag from './child-components/Product';

import './style-shoping-cart.css';

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

type ProductBagShopping = {
  [id: string]: number;
};

export default function ProductCart() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasProduct, setHasProduct] = useState<boolean>(false);
  const [fullPriceProducts, setFullPriceProduct] = useState<number>(0);
  const [productsInBag, setProductsInBag] = useState<ProductBagShopping>({});
  const [allProducts, setAllProducts] = useState<ProductProps>({});
  var ProductsInTheBag = '';

  function getFullPrice(newPrice: number) {
    setFullPriceProduct((prevPrice) => prevPrice + newPrice);
  }

  const renderedProducts = () => {
    return hasProduct ? (
      Object.keys(productsInBag).map((productId: string, index: number) => (
        <ProductInBag
          key={index}
          getFullPrice={getFullPrice}
          id={allProducts[productId].id}
          name={allProducts[productId].name}
          image={allProducts[productId].image}
          price={allProducts[productId].price}
        />
      ))
    ) : (
      <h1>Adicione produtos</h1>
    );
  };

  useEffect(() => {
    let getProductsInStorage = localStorage.getItem('Shopping cart');

    if (getProductsInStorage) {
      ProductsInTheBag = getProductsInStorage;
    }
  }, []);

  useEffect(() => {
    console.log(fullPriceProducts);
  }, [fullPriceProducts]);

  useEffect(() => {
    const AllProducts = localStorage.getItem('All products');

    if (ProductsInTheBag && AllProducts) {
      setProductsInBag(JSON.parse(ProductsInTheBag));
      setAllProducts(JSON.parse(AllProducts));
    }
    renderedProducts;
  }, [ProductsInTheBag]);

  useEffect(() => {
    if (Object.values(productsInBag).length === 0) {
      setHasProduct(false);
    } else {
      setHasProduct(true);
    }
  }, [productsInBag]);

  return (
    <>
      <button
        className={`button-shopping-cart ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src="/icons/bag.svg"
          alt="shopping cart"
          layout="intrinsic"
          width="20"
          height="20"
        />
      </button>
      <div className={`container-shopping-cart ${isOpen ? 'open' : 'closed'}`}>
        <div className={`list-products ${isOpen ? 'open' : 'closed'}`}>
          {renderedProducts()}
        </div>
        <div className="container-full-price"></div>
      </div>
    </>
  );
}

/*<h1>Adicione Produtos</h1>*/
