import Image from 'next/image';

interface ProductProps {
  productImage: string;
  productName: string;
  productDescription: string;
  productPrice: string;
}

import '../recommendation-style.css';

export default function ProductRecommended({
  productImage,
  productName,
  productDescription,
  productPrice,
}: ProductProps) {
  return (
    <div className="container-recommendation-product">
      <div className="image-recommendation-product">
        <Image
          src={productImage}
          alt="Product image"
          layout="intrinsic"
          width="250"
          height="250"
        />
      </div>
      <h2 className="name-recommendation-product">{productName}</h2>
      <p className="description-recommendation-product">{productDescription}</p>
      <h2 className="price-recommendation-product">{productPrice}</h2>
    </div>
  );
}
