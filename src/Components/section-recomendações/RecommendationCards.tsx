import { SearchProduct } from '@/Components/utils/searchProduct';
import { FormatCoin } from '../utils/formatCoin';

type SearchProps = {
    Info_Collection: string,
    Info_DocCollection: string,
    folderNameImg: string
}

import './recommendation-style.css'

export default async function RecommendationCards() {
  
  let searchProps: SearchProps = {
    Info_Collection: 'Produtos',
    Info_DocCollection: 'Recomendacoes',
    folderNameImg: 'Recommendations'
  };

  const allProducts = await SearchProduct(searchProps);
    
  const Format = (num:number) => {
      return FormatCoin(num)

  }

  const renderedProducts = Object.keys(allProducts).map((productId) => {
    const currentProduct = allProducts[productId];

    return (
      <div className="container-product-card" key={productId}>
        <div className="container-product-img">
          <img src={currentProduct.image} alt="" />
        </div>

        <div className="container-product-info">
          <h3>{currentProduct.name}</h3>
          <p>{currentProduct.description}</p>
          <h4>{Format(currentProduct.price)}</h4>
        </div>
      </div>
    );
  });

  return (
    <div className='container-all-produts'>
      {renderedProducts}
    </div>
  );
}