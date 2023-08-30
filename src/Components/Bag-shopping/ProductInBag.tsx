import Image from 'next/image';
import { FormatCoin } from '../utils/formatCoin';

type Product = {
  name: string;
  description: string;
  price: number;
  image: string;
  id: string;
  category: string;
  available: boolean;
  stars: number;
  quantity: number;
};

export default function ProductInBag({
  product,
  deleteProduct,
  quantityProduct,
}: {
  product: Product;
  deleteProduct: (_a: string) => void;
  quantityProduct: (_a: string, _b: string) => void;
}) {
  return (
    <div className="container-product-bag">
      <button
        className="delete-product-bag"
        onClick={() => deleteProduct(product.id)}
      >
        <Image
          src="/icons/delete.svg"
          alt="Product image"
          width={10}
          height={10}
          layout="intrinsic"
        />
      </button>

      <div className="image-product-bag">
        <Image
          src={product.image}
          alt="Product image"
          width={260}
          height={260}
          layout="responsive"
        />
      </div>
      <h2 className="name-product-bag">{product.name}</h2>
      <p className="description-product-bag">{product.description}</p>
      <h2 className="price-product-bag">{FormatCoin(product.price)}</h2>
      <div className="quantity-product-bag">
        <button
          onClick={() => quantityProduct('increase', product.id)}
          title="Aumentar quantidade"
        >
          +
        </button>
        <span>{product.quantity}</span>
        <button
          onClick={() => quantityProduct('decrease', product.id)}
          title="Diminuir quantidade"
        >
          -
        </button>
      </div>
    </div>
  );
}
