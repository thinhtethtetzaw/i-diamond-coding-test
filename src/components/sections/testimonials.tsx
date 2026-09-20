import Image from "next/image";
import { getTestimonials } from "@/lib/api/testimonials";

const profiles = [
  ["Amira K", "/assets/testimonial-amira.png", "Absolutely breathtaking! The craftsmanship of my diamond ring."],
  ["Sophia L", "/assets/testimonial-sophia.png", "From the moment I stepped into iDiamond, I felt like royalty."],
  ["Rania M", "/assets/testimonial-rania.png", "Every detail, from the sparkle of the diamonds to the elegant packaging."],
  ["Daniel R Langosh", "/assets/testimonial-daniel.png", "Exceptional quality and outstanding service doesn’t just sell jewelry."],
] as const;

export async function Testimonials() {
  const apiTestimonials = await getTestimonials();
  return (
    <section className="testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <h2 id="testimonials-title">Testimonials</h2>
      <div className="testimonials__track">
        {profiles.map(([name, image, quote], index) => (
          <article key={name}>
            <Image src={image} alt={name} width={120} height={120} />
            <h3>{name}</h3>
            <small>Product Quality Engineer</small>
            <p data-source-id={apiTestimonials[index]?.id}>{quote}</p>
          </article>
        ))}
      </div>
      <button className="testimonials__arrow testimonials__arrow--prev" aria-label="Previous testimonials"><Image src="/assets/testimonial-prev.svg" alt="" width={20} height={20} /></button>
      <button className="testimonials__arrow testimonials__arrow--next" aria-label="Next testimonials"><Image src="/assets/testimonial-next.svg" alt="" width={20} height={20} /></button>
      <div className="testimonials__dots" aria-hidden="true"><i /><i className="is-active" /><i /></div>
    </section>
  );
}
