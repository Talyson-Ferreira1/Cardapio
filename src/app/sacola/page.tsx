'use client';
import { useEffect, useState } from 'react';

import ProductBag from '@/Components/section-bag-shopping-copy/Product';
import { FormatCoin } from '@/Components/utils/formatCoin';

import './style.page-sacola.css';

type ProductsProps = {
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

export default function BagShopping() {
  const [productsInBag, setProductsInBag] = useState<ProductBagShopping>();
  const [allProducts, setAllProducts] = useState<ProductsProps>();
  const [totalPrice, setTotalprice] = useState<number>(0);
  const [quantityChange, setQuantityChange] = useState<boolean>();

  const handleChange = (change: boolean) => {
    setQuantityChange(change);
    setTimeout(() => {
      setQuantityChange(false);
    }, 1000);
  };

  const UpdateTotalPrice = () => {
    let getTotalPricesInLocStorage = localStorage.getItem('Total prices');

    if (getTotalPricesInLocStorage) {
      let prices = JSON.parse(getTotalPricesInLocStorage);

      setTotalprice(prices);
    }
  };

  const openWhatsApp = () => {
    let getBagShoppingInLocStorage = localStorage.getItem('Shopping cart');
    let getAllProductsInLocStorage = localStorage.getItem('All products');
    let message = 'Olá! Gostaria de fazer um pedido.\n';

    if (getBagShoppingInLocStorage && getAllProductsInLocStorage) {
      let BagProducts = JSON.parse(getBagShoppingInLocStorage);
      let AllProducts = JSON.parse(getAllProductsInLocStorage);

      for (let product in BagProducts) {
        const quantity = BagProducts[product];
        const productName = AllProducts[product].name;
        const productDescription = AllProducts[product].description;

        message += `${quantity} X "${productName}": ("${productDescription}")\n`;
      }
    }

    const phoneNumber = '5588993707881';
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    let getBagShoppingInLocStorage = localStorage.getItem('Shopping cart');
    let getAllProductsInLocStorage = localStorage.getItem('All products');

    if (getBagShoppingInLocStorage && getAllProductsInLocStorage) {
      let productConvertedToObj = {
        bagShopping: JSON.parse(getBagShoppingInLocStorage),
        allProducts: JSON.parse(getAllProductsInLocStorage),
      };

      setProductsInBag(productConvertedToObj.bagShopping);
      setAllProducts(productConvertedToObj.allProducts);
    }
    UpdateTotalPrice();
  }, []);

  useEffect(() => {
    UpdateTotalPrice();
  }, [quantityChange]);

  return (
    <main className="container-bag-shoping">
      <>
        {productsInBag && allProducts ? (
          Object.keys(productsInBag).map((productId: string, index: number) => (
            <ProductBag
              key={index}
              id={allProducts[productId].id}
              name={allProducts[productId].name}
              image={allProducts[productId].image}
              price={allProducts[productId].price}
              handleChange={handleChange}
            />
          ))
        ) : (
          <h1>Adicione produtos</h1>
        )}
      </>
      <div className="container-total-price">
        <span>Valor total</span>
        <span>{FormatCoin(totalPrice)}</span>
        <button onClick={openWhatsApp}>Finalizar pedido</button>
      </div>
    </main>
  );
}
