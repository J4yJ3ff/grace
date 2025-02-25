import { ProductCard } from "./ProductCard";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: {
    name: string;
  };
  productImages: {
    image: {
      url: string;
    };
  }[];
};

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  console.log("Productse: ", products);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
