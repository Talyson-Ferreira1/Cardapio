interface ProductProps {
  productImage: string;
  productName: string;
  productDescription: string;
  productPrice: string;
}

import '../recommendation-style.css';

export default function ProductsRecommended({
  productImage,
  productName,
  productDescription,
  productPrice,
}: ProductProps) {
  return (
    <>
      <div className="container-product-img">
        <img src={productImage} alt="" />
      </div>

      <div className="container-product-info">
        <h3>{productName}</h3>
        <p>{productDescription}</p>
        <h4>{productPrice}</h4>
      </div>
    </>
  );
}
