'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { FormatCoin } from '@/Components/utils/formatCoin';
import RenderStar from '@/Components/section-product-details/renderStars';

import './product-details-style.css';

type ProductProps = {
  name: string;
  description: string;
  price: number;
  image: string;
  id: string;
  available: boolean;
  stars: number;
};

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<ProductProps>();
  const router = useRouter();

  const returnToHome = () => {
    router.back();
  };

  const getTheStoredData = () => {
    let dataInStorage = sessionStorage.getItem('All products');

    dataInStorage === null
      ? returnToHome()
      : setData(JSON.parse(dataInStorage)[params.id]);
  };

  const openWhatsApp = () => {
    const message = `Olá! Gostaria de fazer um pedido. \n- ${data?.name} (${data?.description}).`;

    const phoneNumber = '5588993707881';
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    getTheStoredData();
  }, []);

  const RenderProduct = () => {
    if (data != undefined) {
      const image = data.image;

      return (
        <>
          <button className="return-button" onClick={returnToHome}>
            <Image
              src="/icons/arrow-left.svg"
              alt="return"
              layout="intrinsic"
              width="15"
              height="15"
            />
            <span>Voltar</span>
          </button>
          <div className="container-details-img">
            <Image
              src={image}
              alt="Product image"
              layout="intrinsic"
              width="500"
              height="250"
            />
          </div>
          <div className="container-detail-info">
            <h1 className="details-product-name">{data.name}</h1>
            <div className="details-stars">
              <RenderStar counter={data.stars} />
            </div>
            <p className="details-description">{data.description}</p>
            <h2 className="details-price">{FormatCoin(data.price)}</h2>
            <button className="details-whatsapp" onClick={openWhatsApp}>
              <Image
                src="/icons/whatsapp.svg"
                alt="Product image"
                layout="intrinsic"
                width="20"
                height="20"
              />
              Pedir no whatsapp
            </button>
            <button className="details-add-carShop">
              <Image
                src="/icons/bag.svg"
                alt="Product image"
                layout="intrinsic"
                width="20"
                height="20"
              />
              Adicionar
              <wbr />
              &nbsp; a sacola
            </button>
          </div>
        </>
      );
    } else {
      <div></div>;
    }
  };

  return <main className="container-product-details">{RenderProduct()}</main>;
}
