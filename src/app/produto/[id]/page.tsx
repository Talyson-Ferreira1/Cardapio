'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import './product-details-style.css';

type ProductProps = {
  name: string;
  description: string;
  price: number;
  image: string;
  id?: string;
  available?: boolean;
  stars?: number;
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

  useEffect(() => {
    getTheStoredData();
  }, []);

  const RenderProduct = () => {
    if (data != undefined) {
      return (
        <>
          <div className="container-details-img">
            <img src={data.image} alt="Product image" width={100} />
          </div>
          <button onClick={returnToHome}>Return</button>
        </>
      );
    } else {
      <div></div>;
    }
  };

  return <main className="container-product-details">{RenderProduct()}</main>;
}
