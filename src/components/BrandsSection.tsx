import Image from "next/image";

export function BrandsSection() {
  const brands = [
    {
      name: "Google",
      logoPath: "/assets/Group_5334_wdXH8uKFtZlb_tWnT7OV6.svg",
      width: 100,
      height: 32,
    },
    {
      name: "Nike",
      logoPath: "/assets/image_1_(Traced)_fJv7LFlp79qCdK-P9dcO3.svg",
      width: 100,
      height: 32,
    },
    {
      name: "Samsung",
      logoPath: "/assets/image_5_(Traced)_4_9XR2jWwpowgau4PiUHk.svg",
      width: 100,
      height: 32,
    },
    {
      name: "Apple",
      logoPath: "/assets/image_2_(Traced)_un-DIPh251K9AY6xPqHC_.svg",
      width: 100,
      height: 32,
    },
    {
      name: "Adidas",
      logoPath: "/assets/image_7_(Traced)_N5vm6TNE0kU-zu0t0CING.svg",
      width: 100,
      height: 32,
    },
  ];

  return (
    <section
      id="brands"
      className="container mx-auto px-4 py-20"
      aria-labelledby="brands-heading"
    >
      <h2 id="brands-heading" className="text-3xl font-bold text-center mb-16">
        Brands
      </h2>
      <ul className="flex flex-wrap sm:justify-between justify-center items-center gap-8 opacity-50 list-none p-0">
        {brands.map((brand) => (
          <li key={brand.name} className="flex items-center">
            <Image
              src={brand.logoPath || "/placeholder.svg"}
              alt={`${brand.name} logo`}
              width={brand.width}
              height={brand.height}
              className="w-[80px] md:w-[100px] h-[32px] object-contain"
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
