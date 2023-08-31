'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';

import { app } from '@/services/firebase';
import { ToastContainer } from 'react-toastify';

import { convertStringToNumbers } from '@/functions/CreateIdProduct';

import './style-page-cadastro.css';

interface DataImage {
  image: string;
  type: string;
}

export default function CadastrarProduto() {
  const [imagePreview, setImagePreview] = useState<DataImage>();
  const [image, setImage] = useState<any>({});

  const SendProductToDB = async (values: any) => {
    const db = getFirestore(app);
    const storage = getStorage(app);
    const SendProductCollection = collection(db, 'Produtos');
    const docRef = doc(SendProductCollection, 'AllProducts');

    try {
      const newValues = {
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        id: convertStringToNumbers(values.name),
        available: true,
        stars: 5,
      };

      const storageRef = ref(storage, `AllProducts/${newValues.id}`);
      const imageBlob = new Blob([image.target.files[0] as File], {
        type: image.target.files[0].type,
      });

      const imageRef = ref(storageRef, `imagem.jpg`);
      await uploadBytes(imageRef, imageBlob);

      const docSnapshot = await getDoc(docRef);
      const existingData = docSnapshot.exists() ? docSnapshot.data() : {};

      const newData = {
        ...existingData,
        [newValues.id]: {
          ...newValues,
        },
      };

      await setDoc(docRef, newData);
      console.log('Cadastrado');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(e);

      setImagePreview({
        image: URL.createObjectURL(file),
        type: file.type,
      });
    }
  };

  const validationSchema = Yup.object({
    image: Yup.mixed().required('Adicione uma imagem'),
    name: Yup.string()
      .required('O nome é obrigatório')
      .max(50, 'Deve ter máximo 50 caracteres'),
    description: Yup.string()
      .required('A descrição é obrigatório')
      .max(100, 'Deve ter máximo 100 caracteres'),
    price: Yup.number().required('O valor é obrigatório'),
    category: Yup.string().required('Selecione uma categoria'),
  });

  return (
    <main className="container-register-product">
      <Formik
        onSubmit={SendProductToDB}
        validationSchema={validationSchema}
        initialValues={{
          image: '',
          name: '',
          description: '',
          category: '',
          price: '',
        }}
      >
        <Form>
          <div className="container-toast">
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
          <label
            htmlFor="image"
            className="image-product-cadastro"
            title="Insira uma imagem para o produto"
          >
            <Field
              className="input-image"
              tabIndex={1}
              type="file"
              name="image"
              accept=".jpg, .jpeg, .png, .webp"
              onBlur={handleImageChange}
            />
            {imagePreview ? (
              <div>
                <img
                  src={imagePreview.image}
                  alt="Uploaded product"
                  className="uploaded-image"
                />
                <h3>Imagem carregada</h3>
              </div>
            ) : (
              <div>
                <Image
                  src="/icons/upload.svg"
                  alt="Upload image"
                  layout="intrinsic"
                  width="30"
                  height="30"
                />
                <h3>Carregue uma imagem</h3>
              </div>
            )}
          </label>
          <ErrorMessage className="error" name="image" component="div" />

          <label
            htmlFor="name"
            className="name-product-cadastro"
            title="Insira um nome para o produto"
          >
            <Field
              className="input"
              tabIndex={2}
              type="text"
              name="name"
              required
            />
            <span>Nome do produto</span>
          </label>
          <ErrorMessage className="error" name="name" component="div" />

          <label
            htmlFor="description"
            className="description-product-cadastro"
            title="Insira uma descrição para o produto"
          >
            <Field
              className="input"
              type="textArea"
              name="description"
              tabIndex={3}
              required
            />
            <span>Descrição do produto</span>
          </label>
          <ErrorMessage className="error" name="description" component="div" />

          <Field
            as="select"
            tabIndex={4}
            name="category"
            className="category-product-cadastro"
          >
            <option value="" disabled>
              Selecione a categoria
            </option>
            <option value="portions">Porções</option>
            <option value="recommendation">Recomendações</option>
            <option value="meals">Refeições Prontas</option>
            <option value="drinks">Bebidas</option>
            <option value="desserts">Sobremesas</option>
          </Field>
          <ErrorMessage className="error" name="category" component="div" />

          <label
            htmlFor="price"
            tabIndex={5}
            className="price-product-cadastro"
            title="Insira um preço para o produto"
          >
            <Field
              className="input"
              min="0"
              step="0.01"
              tabIndex={4}
              type="number"
              pattern="[0-9]*"
              name="price"
              required
            />
            <span>Preço do produto</span>
          </label>
          <ErrorMessage className="error" name="price" component="div" />

          <input
            tabIndex={6}
            className="submit"
            type="submit"
            value="Cadastrar produto"
          />
        </Form>
      </Formik>
    </main>
  );
}
