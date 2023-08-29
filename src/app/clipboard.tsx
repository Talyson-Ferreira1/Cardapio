/* const Meals = {
  '161141721531273151327618114715': {
    name: 'Panqueca com frango',
    description:
      'Panqueca de frango, file de peito sassame, arroz, feijão, macarrão, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '16114172153127': {
    name: 'Panqueca',
    description:
      'Panqueca de frango, arroz, macarrão, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '6181147152761892015': {
    name: 'Frango frito',
    description:
      'Frango frito, arroz, feijão, macarrão, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '6181147152731513273118145': {
    name: 'Frango com carne',
    description:
      'Frango frito, bife de carne de gado, arroz, feijão, macarrão, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '311814527452771415': {
    name: 'Carne de gado',
    description:
      'Bife de carne de gado, arroz, feijão, macarrão, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '1659245273151327219115': {
    name: 'Peixe com baião',
    description: 'Peixe frito, Baião, batata frita, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '21911527139192015': {
    name: 'Baião misto',
    description:
      'Linguiça frita, ovo frito, baião, batata frita, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '3185135274527618114715': {
    name: 'Creme de frango',
    description:
      'Creme de frango, arroz, macarrão, batata palha, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
  '31851352745276181147152731513276181147152761892015': {
    name: 'Creme de frango com frango frito',
    description:
      'Creme de frango, frango frito, arroz, macarrão, tomate, cebola e alface. ',
    price: 10.0,
    available: false,
    stars: 5,
  },
}; */
/* 

import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';


import { convertStringToNumbers } from '@/Components/utils/CreateIdProduct';


  const db = getFirestore(app);
  const storage = getStorage(app);
  const SendProductCollection = collection(db, 'Produtos');
  const docRef = doc(SendProductCollection, 'AllProducts');

  const SendProductToDB = async (values: any) => {
    let newValues = {
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
      id: convertStringToNumbers(values.name),
      available: true,
      stars: 5,
    };

    let uploadPromises = [];

    try {
      const storageRef = ref(storage, `AllProducts/${newValues.id}`);
      const imageBlob = new Blob([values.image as File], {
        type: values.image.type,
      });

      const imageRef = ref(storageRef, `image_1`);
      uploadPromises.push(uploadBytes(imageRef, imageBlob));

      await Promise.all(uploadPromises);

      // Assuming you have a docRef variable defined
      const docSnapshot = await getDoc(docRef);
      const existingData = docSnapshot.exists() ? docSnapshot.data() : {};

      const newData = {
        ...existingData,
        [newValues.id]: {
          ...newValues,
        },
      };

      await setDoc(docRef, newData);
      toast.success('Produto cadastrado');
    } catch (error) {
      toast.error('Produto não cadastrado');
      console.log('Product was not registered', error);
    }

    console.log(newValues);
  }; */
