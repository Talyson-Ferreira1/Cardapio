type ProductProps = {
  [product: string]: {
    name: string;
    description: string;
    price: number;
    image: string;
    id: string;
    available: boolean;
    stars: number;
  };
};

export function UpdateAllProducts(data: ProductProps) {
  let allProductsInStorage = localStorage.getItem('All products');
  let newData;

  if (allProductsInStorage != null) {
    newData = { ...JSON.parse(allProductsInStorage) };

    for (let product in data) {
      if (!Object.prototype.hasOwnProperty.call(newData, product)) {
        newData[product] = data[product];
      }
    }
  } else {
    newData = { ...data };
  }

  localStorage.setItem('All products', JSON.stringify(newData));
}
