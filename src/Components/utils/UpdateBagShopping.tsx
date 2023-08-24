type UpdateBagShoppingProps = {
  name: string;
  description: string;
  price: number;
  image: string;
  id: string;
  available: boolean;
  stars: number;
};

type UdateProductProps = {
  id: string;
  action: string;
};

export function sumPrices() {
  const productsInBagShopping = localStorage.getItem('Shopping cart');
  const allProducts = localStorage.getItem('All products');

  let totalPrices = 0;

  if (allProducts && productsInBagShopping) {
    let ProductsInBagConverted = JSON.parse(productsInBagShopping);
    let allProductsConverted = JSON.parse(allProducts);

    for (const product in ProductsInBagConverted) {
      let currentPrice = allProductsConverted[product].price;

      totalPrices = (totalPrices + (currentPrice * ProductsInBagConverted[product])); // prettier-ignore
    }
  }

  localStorage.setItem('Total prices', JSON.stringify(totalPrices));
}

export function UpdateBagShopping(data: UpdateBagShoppingProps) {
  const productsInBagShopping = localStorage.getItem('Shopping cart');

  const newData = productsInBagShopping
    ? { ...JSON.parse(productsInBagShopping) }
    : {};

  if (newData[data.id] && newData[data.id] >= 5) {
    return false;
  }

  newData[data.id] = (newData[data.id] || 0) + 1;
  localStorage.setItem('Shopping cart', JSON.stringify(newData));
  sumPrices();
  return true;
}

export function UdateProductInBag({ id, action }: UdateProductProps) {
  const productsInBagShopping = localStorage.getItem('Shopping cart');
  const newData = productsInBagShopping
    ? { ...JSON.parse(productsInBagShopping) }
    : {};

  if (newData[id] < 5 && action === 'increase') newData[id] = newData[id] + 1;

  if (!(newData[id] === 1) && action === 'decrease')
    newData[id] = newData[id] - 1;

  localStorage.setItem('Shopping cart', JSON.stringify(newData));
  sumPrices();
}
