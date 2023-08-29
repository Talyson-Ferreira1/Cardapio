'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UpdateBagShopping } from '@/Components/utils/UpdateBagShopping';

import Image from 'next/image';

import { FormatCoin } from '@/Components/utils/formatCoin';
import RenderStar from '@/Components/Bag-shopping-components/renderStars';
import ReturnPage from '@/Components/Bag-shopping-components/button-return';

import 'react-toastify/dist/ReactToastify.css';
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
  const notifySucess = () => toast('Produto adicionado');
  const notifyError = () => toast('Limite máximo de 5 produtos');

  const getDataInCache = () => {
    let dataInStorage = localStorage.getItem('All products');

    dataInStorage === null
      ? router.back()
      : setData(JSON.parse(dataInStorage)[params.id]);
  };

  const openWhatsApp = () => {
    const message = `Olá! Gostaria de fazer um pedido. \n- ${data?.name} (${data?.description}).`;

    const phoneNumber = '5588993707881';
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  const saveProductInBag = () => {
    if (data != undefined) {
      let response = UpdateBagShopping(data);

      response ? notifySucess() : notifyError();
    }
  };

  const returnLastPage = () => {
    router.back();
  };

  useEffect(() => {
    getDataInCache();
  }, []);

  const RenderProduct = () => {
    if (data != undefined) {
      const image = data.image;

      return (
        <>
          <ReturnPage funcReturn={returnLastPage} />

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
                objectFit="cover"
                width="20"
                height="20"
              />
              Pedir no whatsapp
            </button>

            <button className="details-add-carShop" onClick={saveProductInBag}>
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

  return (
    <main className="container-product-details">
      <div className="container-toast">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
      {RenderProduct()}
    </main>
  );
}
