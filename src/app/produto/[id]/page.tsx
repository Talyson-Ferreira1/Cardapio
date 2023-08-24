'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UpdateBagShopping } from '@/Components/utils/UpdateBagShopping';

import Image from 'next/image';

import { FormatCoin } from '@/Components/utils/formatCoin';
import RenderStar from '@/Components/section-bag-shopping-copy/renderStars';
import ReturnPage from '@/Components/section-bag-shopping-copy/button-return';

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
