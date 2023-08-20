'use client';
import { useEffect, useState } from 'react';
import { FetchInfoProducts } from '../utils/FetchInfoProducts';

import LoadinTagComponent from './child-componentes/LoadingComponent';

import './tags-style.css';
type formatTags = {
  [productName: string]: string;
};
interface propsFormat {
  DocCollection: string;
  DocReference: string;
}

export default function TagsHeader() {
  const [tags, setTags] = useState<formatTags>();

  const fetchProduct = async () => {
    const tagsPropsValues: propsFormat = {
      DocCollection: 'Produtos',
      DocReference: 'Tags',
    };

    let Fetch = await FetchInfoProducts(tagsPropsValues);

    setTags(Fetch);
  };

  const filterProducts = (productName: string, idProduct: string) => {
    console.log(productName + ':' + idProduct);
  };

  useEffect(() => {
    let alreadyExistData = sessionStorage.getItem('Tags');

    if (alreadyExistData) {
      setTags(JSON.parse(alreadyExistData));
    } else {
      fetchProduct();
    }
  }, []);

  useEffect(() => {
    if (tags != undefined) {
      let cacheDataInSessionStorage = sessionStorage.setItem(
        'Tags',
        JSON.stringify(tags),
      );
      cacheDataInSessionStorage;
    }
  }, [tags]);

  const renderTags = () => {
    if (tags) {
      return Object.keys(tags).map((productName) => {
        const idProduct = tags[productName];

        return (
          <button
            className="tagButton"
            key={productName}
            onClick={() => filterProducts(productName, idProduct)}
          >
            {productName}
          </button>
        );
      });
    } else {
      return <LoadinTagComponent />;
    }
  };

  return <nav className="tags-shortcuts">{renderTags()}</nav>;
}
