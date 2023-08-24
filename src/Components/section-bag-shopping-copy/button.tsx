'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import './style-bag-shopping-componentes.css';

export default function ButtonToOpenBagShopping() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      {isOpen ? (
        <button
          className="button-shopping-cart"
          onClick={() => {
            setIsOpen(!isOpen);
            router.back();
          }}
        >
          <Image
            src="/icons/close.svg"
            alt="shopping cart"
            layout="intrinsic"
            width="20"
            height="20"
          />
        </button>
      ) : (
        <button
          className="button-shopping-cart"
          onClick={() => {
            router.push('/sacola');
            setIsOpen(!isOpen);
          }}
        >
          <Image
            src="/icons/bag.svg"
            alt="shopping cart"
            layout="intrinsic"
            width="20"
            height="20"
          />
        </button>
      )}
    </>
  );
}
