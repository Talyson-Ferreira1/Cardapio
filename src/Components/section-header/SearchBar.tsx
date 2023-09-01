'use client';
import { useContext } from 'react';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { SearchContext } from '@/context/user/user';

import './style-searchBar.css';

export default function SearchBar() {
  const { setProductName } = useContext(SearchContext);

  const router = useRouter();
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);

    router.push('/buscar');
  };

  const returnPage = () => {
    router.back();
  };

  return (
    <>
      <div className="container-logo">
        <Image
          height="150"
          width="150"
          src="/images/Delicias_da_cenir.png"
          alt="Logotipo"
          priority
        />

        <div className="container-input">
          <label htmlFor="search">
            <Image
              width="15"
              height="10"
              layout="intrinsic"
              src="/icons/lupa.svg"
              alt="icon search"
            />

            <input
              type="text"
              name="search"
              title="Pesquisar prato"
              alt="input search product"
              placeholder="Pesquise aqui"
              onChange={inputChange}
              onBlur={returnPage}
            />
          </label>
        </div>
      </div>
    </>
  );
}
