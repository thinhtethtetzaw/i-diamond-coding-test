import Image from "next/image";

const benefits = [
  ["/assets/icon-consultation.svg", "Personal Design Consultation", "Work with our designers to create your perfect piece."],
  ["/assets/icon-diamond.svg", "Crafted with Luxury Materials", "Only the finest diamonds, gemstones, and precious metals used."],
  ["/assets/icon-warranty.svg", "Lifetime Warranty", "Lifetime warranty on every piece, ensuring quality and lasting beauty."],
];

export function Feature() {
  return (
    <section className="benefits" aria-labelledby="benefits-title">
      <div className="canvas">
      <Image className="benefits__circles" src="/assets/benefits-circles.svg" alt="" width={742} height={585} />
      <h2 id="benefits-title">Why Choose MyJewel?</h2>
      {benefits.map(([icon, title, description]) => (
        <article key={title}>
          <Image src={icon} alt="" width={45} height={45} />
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
      </div>
    </section>
  );
}
