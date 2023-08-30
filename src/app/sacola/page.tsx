'use client';
import { useEffect, useState } from 'react';

import { getTotalPrices } from '@/Components/utils/UpdateBagShopping';
import { sendRequestByWhatsapp } from '@/Components/utils/OpenWhatsapp';
import { getAllProductsInBagShopping } from '@/Components/utils/UpdateBagShopping';
import { deleteProductInBag } from '@/Components/utils/UpdateBagShopping';
import { UdateProductInBag } from '@/Components/utils/UpdateBagShopping';
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

  const editQuantityOfProduct = (action: string, id: string) => {
    UdateProductInBag({ id: id, action: action });
    getAllProducts();
    getPrices();
  };

  const deleteProduct = (id: string) => {
    deleteProductInBag(id);
    console.log('produto deletado', id);
    getAllProducts();
    getPrices();
  };

  useEffect(() => {
    getPrices();
    getAllProducts();
  }, []);

  useEffect(() => {
    Object.keys(productsInBag).length > 0
      ? setHasProductsInBag(true)
      : setHasProductsInBag(false);
  }, [productsInBag]);

  return (
    <main>
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
        <h2>Adicione produtos</h2>
      )}
    </main>
  );
}
