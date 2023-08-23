import { useEffect, useState } from 'react';
import Image from 'next/image';

import { UdateProductInBag } from '@/Components/utils/UpdateBagShopping';
import { FormatCoin } from '@/Components/utils/formatCoin';

type ProductInBagProps = {
  name: string;
  image: string;
  price: number;
  id: string;
  getFullPrice: (_price: number) => void;
};

export default function ProductInBag({
  name,
  image,
  price,
  id,
}: ProductInBagProps) {
  const [quantity, setQuantity] = useState<number>(0);

  const UpdateQuantityState = () => {
    let productsInBagShopping = localStorage.getItem('Shopping cart');

    if (productsInBagShopping != null)
      setQuantity(JSON.parse(productsInBagShopping)[id]);
  };

  const UpdateQuantityInStorage = (action: string) => {
    UdateProductInBag({ id: id, action: action });
    UpdateQuantityState();
  };

  useEffect(() => {
    UpdateQuantityState();
  }, []);

  return (
    <div className="container-product-shoping-bag">
      <div className="product-image-bag ">
        <Image
          src={image}
          alt="Product image"
          layout="intrinsic"
          width={300}
          height={300}
        />
      </div>
      <h2>{name}</h2>
      <span className="increase">
        <button
          onClick={() => {
            UpdateQuantityInStorage('increase');
          }}
        >
          +
        </button>
      </span>
      <span>{quantity}</span>
      <span className="decrease">
        <button
          onClick={() => {
            UpdateQuantityInStorage('decrease');
          }}
        >
          -
        </button>
      </span>
      <h2>{FormatCoin(price)}</h2>
    </div>
  );
}
