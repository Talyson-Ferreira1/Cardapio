import Image from 'next/image';

interface ProductProps {
  productImage: string;
  productName: string;
  productDescription: string;
  productPrice: string;
}

import '../renderSection.css';

export default function Product({
  productImage,
  productName,
  productDescription,
  productPrice,
}: ProductProps) {
  return (
    <>
      <div className="image-container-meal-products">
        <Image
          src={productImage}
          alt="Product image"
          layout="responsive"
          width="300"
          height="300"
        />
      </div>

      <h3 className="title">{productName}</h3>
      <p className="description">{productDescription}</p>
      <h4 className="price">{productPrice}</h4>
    </>
  );
}
