'use client';
import { useEffect, useState } from 'react';

import ProductBag from '@/Components/Bag-shopping-components/Product';
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
    let message = '*Olá! Gostaria de fazer um pedido*.\n \n';

    if (getBagShoppingInLocStorage && getAllProductsInLocStorage) {
      let BagProducts = JSON.parse(getBagShoppingInLocStorage);
      let AllProducts = JSON.parse(getAllProductsInLocStorage);

      for (let product in BagProducts) {
        const quantity = BagProducts[product];
        const productName = AllProducts[product].name;
        const productDescription = AllProducts[product].description;
        const productPrice = AllProducts[product].price;
        const totalProductprice = productPrice * quantity;

        message += ` *${quantity}* x - *${productName}*: ${FormatCoin(
          totalProductprice,
        )}   \n (${productDescription})\n \n`;
      }
    }

    message += `*Totalizando: ${FormatCoin(totalPrice)}*`;
    /*
    const phoneNumber = '5588993327359';
    */
    const phoneNumber = '5588993707881';
    const encodedMessage = encodeURIComponent(message);

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      // Open WhatsApp app
      window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    } else {
      // Open WhatsApp web
      const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
      window.open(url, '_blank');
    }
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
      <>
        {productsInBag && allProducts && (
          <div className="container-total-price">
            <span>Valor total</span>
            <span>{FormatCoin(totalPrice)}</span>
            <button onClick={openWhatsApp}>Finalizar pedido</button>
          </div>
        )}
      </>
    </main>
  );
}
