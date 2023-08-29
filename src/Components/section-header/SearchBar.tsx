'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

import './style-searchBar.css';

export default function SearchBar() {
  const router = useRouter();
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    router.push('/procurar-produto');
  };

  const returnPage = () => {
    router.back();
  };

  return (
    <div className="container-main-input">
      <div className="container-logo">
        <Image
          height="70"
          width="150"
          src="/images/Delicias_da_cenir.png"
          alt="Logotipo"
        />
      </div>

      <label htmlFor="search">
        <Image
          width="20"
          height="15"
          src="/icons/lupa.svg"
          alt="icon search"
          className="img-lupa"
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
  );
}
