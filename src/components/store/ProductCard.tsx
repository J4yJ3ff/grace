"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

type ProductImage = {
  image: {
    url: string;
  };
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: {
    name: string;
  };
  productImages: ProductImage[];
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  console.log("Productwen: ", product);
  const images = product.productImages.map((image) => image.image.url);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  };

  return (
    <div className=" overflow-hidden shadow-sm">
      <Image
        src={images[0] || "/placeholder.svg"}
        alt={product.name}
        width={600}
        height={400}
        className=" aspect-video object-cover mb-4"
      />
      <div className="flex-grow">
        <span className="text-sm text-[#FF6250] font-semibold mb-2 block">
          {product.category.name || "Uncategorized"}
        </span>
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">
          {product.description || "Description not available"}
        </p>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span className="text-lg font-semibold">
            {formatCurrency(product.price)}
          </span>
        </div>
        <Button
          variant="default"
          className="bg-blue-500 w-full rounded-none text-white py-6 hover:bg-blue-600 transition-colors"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
