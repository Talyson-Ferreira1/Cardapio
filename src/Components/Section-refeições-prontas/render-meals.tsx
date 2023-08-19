import { SearchProduct } from "../utils/searchProduct";
import { FormatCoin } from '../utils/formatCoin'


type SearchProps = {
    Info_Collection: string,
    Info_DocCollection: string,
    folderNameImg: string
}


import './meals-styles.css'
export default async function Meals() {
    
    const searchProps: SearchProps = {
        Info_Collection: 'Produtos',
        Info_DocCollection: 'Refeicoes prontas',
        folderNameImg: 'Meals'
    };

    const Meals = await SearchProduct(searchProps);

    const Format = (num:number) => {
        return FormatCoin(num)

    }

    const renderedProducts = Object.keys(Meals).map((productId) => {
        const currentProduct = Meals[productId];

        return (
            <div className="product-card-container" key={productId}>
                <div className="product-image-container">
                    <img src={currentProduct.image} alt="" />
                </div>
                
                <h3>{currentProduct.name}</h3>
                <p>{currentProduct.description}</p>
                <h4>{Format(currentProduct.price)}</h4>
               
            </div>
        );
    });


    return (
        <>
            {renderedProducts}
        </>
    )
}   