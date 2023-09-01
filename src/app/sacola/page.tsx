'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { getTotalPrices } from '@/functions/UpdateBagShopping';
import { sendRequestByWhatsapp } from '@/functions/OpenWhatsapp';
import { getAllProductsInBagShopping } from '@/functions/UpdateBagShopping';
import { deleteProductInBag } from '@/functions/UpdateBagShopping';
import { UdateProductInBag } from '@/functions/UpdateBagShopping';
import EskeletonLoading from '@/Components/Bag-shopping/EskeletonLoading';
import TotalPrices from '@/Components/Bag-shopping/TotalPrices';

import './bagShopping-styles.css';
import ProductInBag from '@/Components/Bag-shopping/ProductInBag';

type Product = {
  name: string;
  description: string;
  price: number;
  image: string;
  id: string;
  category: string;
  available: boolean;
  stars: number;
  quantity: number;
};

type ProductsProps = {
  [id: string]: Product;
};

export default function BagShopping() {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [hasProductsInBag, setHasProductsInBag] = useState<boolean>(false);
  const [productsInBag, setProductsInBag] = useState<ProductsProps>({});

  const getPrices = () => {
    let totalpricesOfProducts = getTotalPrices();
    setTotalPrice(totalpricesOfProducts);
  };

  const getAllProducts = () => {
    let AllProductsInBag = getAllProductsInBagShopping();
    setProductsInBag(AllProductsInBag);
  };

  const fineshedRequest = () => {
    sendRequestByWhatsapp();
  };

  const refresh = () => {
    getPrices();
    getAllProducts();
  };

  const editQuantityOfProduct = (action: string, id: string) => {
    UdateProductInBag({ id: id, action: action });
    refresh();
  };

  const deleteProduct = (id: string) => {
    deleteProductInBag(id);
    console.log('produto deletado', id);
    refresh();
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    Object.keys(productsInBag).length > 0
      ? setHasProductsInBag(true)
      : setHasProductsInBag(false);
  }, [productsInBag]);

  return (
    <main className="main-bag-shopping">
      {hasProductsInBag ? (
        <>
          {productsInBag ? (
            <>
              {Object.keys(productsInBag).map((product, index) => {
                return (
                  <ProductInBag
                    key={index}
                    quantityProduct={editQuantityOfProduct}
                    deleteProduct={deleteProduct}
                    product={productsInBag[product]}
                  />
                );
              })}
              <TotalPrices
                totalPrice={totalPrice}
                fineshedRequest={fineshedRequest}
              />
            </>
          ) : (
            <>
              <EskeletonLoading />
              <EskeletonLoading />
              <EskeletonLoading />
              <EskeletonLoading />
              <EskeletonLoading />
              <EskeletonLoading />
              <EskeletonLoading />
            </>
          )}
        </>
      ) : (
        <div className="container-empty-bag">
          <h2>Sua sacola está vazia</h2>

          <Image
            src="/ilustracoes/bag-shopping.png"
            alt="empty bag ilustration"
            width="150"
            height="150"
            layout="intrinsic"
          />

          <h2>adicione produtos</h2>
        </div>
      )}
    </main>
  );
}
