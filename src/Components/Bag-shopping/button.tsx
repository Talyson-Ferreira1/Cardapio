'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import '@/app/sacola/bagShopping-styles.css';

export default function ButtonToOpenBagShopping() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === '/sacola') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [pathName]);

  const openBagShopping = () => {
    router.push('/sacola');
    setIsOpen(true);
  };

  return (
    <>
      {!isOpen && (
        <button className="button-open-bag-shopping" onClick={openBagShopping}>
          <Image
            src="/icons/bag.svg"
            alt="shopping cart"
            width="20"
            height="20"
          />
        </button>
      )}
    </>
  );
}
