'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import ButtonTag from './child-componentes/buttonTag';

import './tags-style.css';
interface tagProps {
  [tag: string]: {
    ilustration: string;
    name: string;
    pathName: string;
  };
}

export default function TagsHeader() {
  const [showButton, setShowButton] = useState(true);

  const tags: tagProps = {
    dessertsProps: {
      ilustration: '/ilustracoes/sobremesa.png',
      name: 'Sobremesas',
      pathName: '/sobremesas',
    },

    mealsProps: {
      ilustration: '/ilustracoes/refeicoes.png',
      name: 'Refeições',
      pathName: '/refeicoes',
    },

    drinksProps: {
      ilustration: '/ilustracoes/bebidas.png',
      name: 'Bebidas',
      pathName: '/bebidas',
    },

    portionProps: {
      ilustration: '/ilustracoes/porcoes.png',
      name: 'Porções',
      pathName: '/porcoes',
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };

    // Inicialize o estado com base na largura da tela atual
    handleResize();

    window.addEventListener('resize', handleResize);

    // Limpe o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className="tags-shortcuts">
        <>
          {Object.keys(tags).map((tag, index) => {
            let currentTag = tags[tag];

            return (
              <ButtonTag
                key={index}
                ilustration={currentTag.ilustration}
                name={currentTag.name}
                pathName={currentTag.pathName}
              />
            );
          })}
        </>
      </nav>
      {showButton && (
        <span className="button-to-finish">
          <Image
            src="/icons/angles.svg"
            alt="to last"
            layout="intrinsic"
            width="15"
            height="15"
          />
        </span>
      )}
    </>
  );
}
