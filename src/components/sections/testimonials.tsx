import { getTestimonials } from "@/lib/api/testimonials";
import { TestimonialsCarousel } from "./testimonials-carousel";

const profiles = [
  ["Amira K", "/assets/testimonial-amira.png", "Absolutely breathtaking! The craftsmanship of my diamond ring."],
  ["Sophia L", "/assets/testimonial-sophia.png", "From the moment I stepped into iDiamond, I felt like royalty."],
  ["Rania M", "/assets/testimonial-rania.png", "Every detail, from the sparkle of the diamonds to the elegant packaging."],
  ["Daniel R Langosh", "/assets/testimonial-daniel.png", "Exceptional quality and outstanding service doesn’t just sell jewelry."],
] as const;

export async function Testimonials() {
  const apiTestimonials = await getTestimonials();
  const items = profiles.map(([name, image, quote], index) => ({
    id: apiTestimonials[index]?.id,
    name,
    image,
    quote,
    role: "Product Quality Engineer",
  }));

  return (
    <section className="testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div className="canvas">
        <h2 id="testimonials-title">Testimonials</h2>
        <TestimonialsCarousel items={items} />
      </div>
    </section>
  );
}
