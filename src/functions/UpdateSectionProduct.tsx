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

export function UpdateSectionProducts(data: ProductProps, nameSection: string) {
  sessionStorage.setItem(`${nameSection}`, JSON.stringify(data));
}
