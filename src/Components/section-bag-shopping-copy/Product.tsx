import { useEffect, useState } from 'react';
import Image from 'next/image';

import { UdateProductInBag } from '@/Components/utils/UpdateBagShopping';
import { FormatCoin } from '@/Components/utils/formatCoin';

import './style-bag-shopping-componentes.css';

type ProductInBagProps = {
  name: string;
  image: string;
  price: number;
  id: string;
  quantityOfProduct: number;
  /*  getFullPrice: (_price: number) => void; */
};

export default function ProductBag({
  name,
  image,
  price,
  id,
  quantityOfProduct,
}: ProductInBagProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const UpdateQuantityInStorage = (action: string) => {
    let Productprops = {
      id: id,
      action: action,
    };
    UdateProductInBag(Productprops);
  };

  const UpdateStateQuantity = () => {
    let getBagShoppingInLocStorage = localStorage.getItem('Shopping cart');

    if (getBagShoppingInLocStorage) {
      let productConvertedToObj = JSON.parse(getBagShoppingInLocStorage);
      setQuantity(productConvertedToObj[id]);
    }
  };

  useEffect(() => {
    UpdateStateQuantity();
    console.log(quantityOfProduct);
  }, []);

  return (
    <div className="product-shopping-bag">
      <div className="image-product-shopping-bag ">
        <Image
          src={image}
          alt="Product image"
          layout="intrinsic"
          width={300}
          height={300}
        />
      </div>
      <h2 className="name-product-shopping-bag">{name}</h2>
      <span className="increase">
        <button
          onClick={() => {
            UpdateQuantityInStorage('increase');
            UpdateStateQuantity();
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
            UpdateStateQuantity();
          }}
        >
          -
        </button>
      </span>
      <h2 className="price-product-shopping-bag">{FormatCoin(price)}</h2>
    </div>
  );
}
