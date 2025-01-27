import Image from "next/image";

export function TestimonialsSection() {
  const testimonials = Array.from({ length: 6 }).map((_, index) => ({
    id: `testimonial-${index + 1}`,
    text: "The design transformed our brand identity, stunning and exactly what we needed to stand out.",
    author: "Gemma Nolen",
    company: "Google",
    imgSrc: "/assets/Client_Image_FgVaDM64dhiFsoXAfE40R.png",
  }));

  return (
    <section
      className="container mx-auto px-4 py-20"
      aria-labelledby="testimonials-heading"
    >
      <h2
        id="testimonials-heading"
        className="text-5xl font-bold text-center mb-16"
      >
        Testimonials
      </h2>
      <ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0"
        aria-label="Customer testimonials"
      >
        {testimonials.map((testimonial) => (
          <li key={testimonial.id}>
            <article className="bg-[#E5E5E5] p-8  h-full">
              <figure>
                <blockquote>
                  <p className="mb-4">&quot;{testimonial.text}&quot;</p>
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <Image
                    src={testimonial.imgSrc}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full bg-gray-200"
                    aria-hidden="true"
                  />
                  <div>
                    <cite className="font-bold not-italic">
                      {testimonial.author}
                    </cite>
                    <div className="text-gray-600">{testimonial.company}</div>
                  </div>
                </figcaption>
              </figure>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
