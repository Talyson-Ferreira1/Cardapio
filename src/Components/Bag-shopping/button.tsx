'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import '@/app/sacola/bagShopping-styles.css';

export default function ButtonToOpenBagShopping() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showSpiner, setShowSpiner] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === '/sacola') {
      setIsOpen(true);
    }
  }, []);

  const openBagShopping = () => {
    router.push('/sacola');
    setIsOpen(true);
    setShowSpiner(true);
  };

  const closeBagShopping = () => {
    setIsOpen(false);
    setShowSpiner(false);
    router.back();
  };

  return (
    <>
      {isOpen ? (
        <button className="button-open-bag-shopping" onClick={closeBagShopping}>
          <Image
            src="/icons/close.svg"
            alt="shopping cart"
            width="20"
            height="20"
          />
        </button>
      ) : (
        <button className="button-open-bag-shopping" onClick={openBagShopping}>
          {!showSpiner ? (
            <Image
              src="/icons/bag.svg"
              alt="shopping cart"
              width="20"
              height="20"
            />
          ) : (
            <h2>P</h2>
          )}
        </button>
      )}
    </>
  );
}
