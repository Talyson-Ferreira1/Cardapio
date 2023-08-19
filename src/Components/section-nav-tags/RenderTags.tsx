'use client'
import { useEffect, useState } from 'react';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { app } from '@/services/firebase';


type tagsProps = {
  [productName: string]: string;
}

import './tags-style.css'

export default function TagsHeader() {

  const [ tags, setTags] = useState <tagsProps> ()

  const fetchTagsInDB = async () => {
    try {
			const infoDatabase = getFirestore(app);
			const docCollection = collection(infoDatabase, 'Produtos');
			const docReference = doc(docCollection, 'Tags');
			const docSnap = await getDoc(docReference);
			
			if(docSnap.exists()) {
				const data = docSnap.data();
				setTags(data)

			} else {
				console.log('Documento não encontrado!');
			}

		} catch (error) {
			console.error('Erro ao buscar dados:', error);

		}

  };

  const filterProducts = ( productName:string, idProduct:string) => {
    console.log(productName + ":" + idProduct)
  };

  const renderTags = () => {
    const buttons = [];

    for (let product in tags) {
      let idProduct = tags[product];
      let productName = product;

      buttons.push(
        <button key={productName} onClick={() => filterProducts(productName, idProduct)}>
          {productName}
        </button>
        
      );
    }

    return buttons;
  };

  useEffect(()=>{
    fetchTagsInDB()
    
  },[])

  return(
    <nav className='tags-shortcuts'>
        {renderTags()}
    </nav>
  )
}