import Image from "next/image";

export function ServicesSection() {
  const services = [
    {
      title: "Product Design",
      description:
        "Designing user-centered products that are both functional and visually engaging",
      color: "bg-[#FFE4E0]",
      imgSrc: "/assets/Skills_Card_Icon__LpNTqv86nnJshCYxjKmf.svg",
      imgAlt: "Product Design service icon",
    },
    {
      title: "Visual Design",
      description:
        "Crafting stunning visuals that communicate your brand's story and message",
      color: "bg-[#FF6B6B]",
      imgSrc: "/assets/Skills_Card_Icon_(1)_8z5GOmSorb9N6n0nMbiFm.svg",
      imgAlt: "Visual Design service icon",
    },
    {
      title: "Art Direction",
      description:
        "Guiding the creative vision to ensure consistency and impact across all your visuals",
      color: "bg-[#2DD4BF]",
      imgSrc: "/assets/Skills_Card_Icon_(2)_pN5QqxCAL_eVcsO64hLEq.svg",
      imgAlt: "Art Direction service icon",
    },
  ];

  return (
    <section
      id="services"
      className="container mx-auto px-4 py-28"
      aria-labelledby="services-heading"
    >
      <h2
        id="services-heading"
        className="text-5xl font-bold text-center mb-16"
      >
        Services
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 list-none p-0">
        {services.map((service) => (
          <li key={service.title} className="text-center">
            <article className="h-full flex flex-col items-center">
              <div
                className={`w-48 h-48  mx-auto mb-6 flex items-center justify-center`}
              >
                <Image
                  src={service.imgSrc}
                  alt={service.imgAlt}
                  width={150}
                  height={150}
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="font-bold text-xl mb-2">{service.title}</h3>
              <p className="text-gray-600 text-lg">{service.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
