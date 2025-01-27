import Image from "next/image";

export function WorkSection() {
  const projects = [
    {
      id: 1,
      title: "Product Design",
      categories: "UI, Art direction",
      imagePath: "/assets/Image_(3)_8iS0qHBvoCFhSMyB3Ycct.png",
      altText: "Product design project preview",
    },
    {
      id: 2,
      title: "Product Design",
      categories: "UI, Art direction",
      imagePath: "/assets/Image_(4)_9jKr66lkrmPoSE0PNTG99.png",
      altText: "Product design project preview",
    },
    {
      id: 3,
      title: "Product Design",
      categories: "UI, Art direction",
      imagePath: "/assets/Image_(5)_0qF0G45fgX-EVyOCWyHUU.png",
      altText: "Product design project preview",
    },
    {
      id: 4,
      title: "Product Design",
      categories: "UI, Art direction",
      imagePath: "/assets/Image_(6)_egwwOX6dRFKKJbrT0lOAO.png",
      altText: "Product design project preview",
    },
    {
      id: 5,
      title: "Product Design",
      categories: "UI, Art direction",
      imagePath: "/assets/Image_(7)_7LuhvcD1uKhhxKFIMTYqz.png",
      altText: "Product design project preview",
    },
    {
      id: 6,
      title: "Product Design",
      categories: "UI, Art direction",
      imagePath: "/assets/Image_(8)_39TSj3bE4y214oDDnDB1r.png",
      altText: "Product design project preview",
    },
  ];

  return (
    <section
      id="work"
      className="container mx-auto px-4 py-20"
      aria-labelledby="work-heading"
    >
      <h2 id="work-heading" className="text-5xl font-bold text-center mb-16">
        Portfolio
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-8 list-none p-0">
        {projects.map((project) => (
          <li key={project.id} className="space-y-2">
            <article>
              <Image
                src={project.imagePath}
                alt={project.altText}
                width={400}
                height={400}
                className="aspect-square object-cover bg-gray-100"
              />
              <h3 className="font-bold mt-2">{project.title}</h3>
              <p className="text-gray-600">{project.categories}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
