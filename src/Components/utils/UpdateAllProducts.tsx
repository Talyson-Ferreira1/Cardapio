export function UpdateAllProducts({ data }: any) {
  console.log(data);
  let allProductsInStorage = sessionStorage.getItem('All products');
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

  sessionStorage.setItem('All products', JSON.stringify(newData));
  return true;
}

/* Fazer essa merda funcionar */
