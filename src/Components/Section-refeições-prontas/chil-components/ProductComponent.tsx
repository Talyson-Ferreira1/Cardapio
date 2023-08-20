interface ProductProps {
  productImage: string;
  productName: string;
  productDescription: string;
  productPrice: string;
}

import '../meals-styles.css';
export default function ProductsMeal({
  productImage,
  productName,
  productDescription,
  productPrice,
}: ProductProps) {
  return (
    <>
      <div className="product-image-container">
        <img className="img" src={productImage} alt="Product image" />
      </div>

      <h3 className="title">{productName}</h3>
      <p className="description">{productDescription}</p>
      <h4 className="price">{productPrice}</h4>
    </>
  );
}
/*     <div className="product-card-container" key={productId}>
        <div className="product-image-container">
          <img src={currentProduct.image} alt="" />
        </div>

        <h3>{currentProduct.name}</h3>
        <p>{currentProduct.description}</p>
        <h4>{Format(currentProduct.price)}</h4>
      </div>
    ); */
