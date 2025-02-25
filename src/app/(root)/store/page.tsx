import { ProductList } from "@/components/store/ProductList";
import { getProducts } from "@/lib/actions/Products.actions";

export default async function StorePage() {
  const result = await getProducts();
  const products = result?.docs || [];

  console.log("Products: ", products);

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-14">
      <section className="mb-20">
        <h1 className="text-6xl md:text-6xl text-[8vw] font-bold mb-4 text-center">
          Store
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
          Shop our latest products and designs.
        </p>
      </section>

      <ProductList products={products} />
    </div>
  );
}
