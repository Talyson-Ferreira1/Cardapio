'use client';
import { useState } from 'react';
import Image from 'next/image';

import './style-shoping-cart.css';
export default function ProductCart() {
  const [isOpen, setIsOpen] = useState<boolean>();

  return (
    <>
      <button
        className={`button-shopping-cart ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src="/icons/bag.svg"
          alt="shopping cart"
          layout="insintric"
          width="20"
          height="20"
        />
      </button>

      <div className={`container-shopping-cart ${isOpen ? 'open' : 'closed'}`}>
        <div className={`list-products ${isOpen ? 'open' : 'closed'}`}></div>
      </div>
    </>
  );
}
