import Image from "next/image";

const steps = [
  ["Consultation", "We discuss your vision and preferences to craft a unique design."],
  ["Selecting Materials", "Choose from exquisite diamonds, precious metals, and gemstones."],
  ["Creating a 3D Model", "Visualize your design with a precise 3D model before production."],
  ["Manufacturing", "Expert artisans bring your piece to life with precision and care."],
  ["Quality Assurance", "Every detail is inspected to ensure flawless craftsmanship."],
  ["Delivery", "Your custom jewelry is elegantly packaged and delivered to you."],
];

export function Services() {
  return (
    <section className="process" id="custom-jewelry">
      <nav className="breadcrumb" aria-label="Breadcrumb">Home / <span>Custom Jewelry</span></nav>
      <div className="container">
        <div className="process__intro">
          <h2>Custom Jewelry</h2>
          <p>Create Your Masterpiece: Bespoke Jewelry Crafted for You</p>
        </div>
        <div className="process__gallery" aria-label="Examples of custom jewelry">
          <div className="process__main"><Image src="/assets/process-ring.png" alt="A custom diamond ring" width={373} height={476} sizes="373px" /></div>
          <div className="process__small"><Image src="/assets/process-bracelet.png" alt="A custom diamond bracelet" width={239} height={317} sizes="239px" /></div>
        </div>
        <div className="process__content">
          <p className="process__lead">Exquisite design, flawless craftsmanship, and timeless elegance—your vision, perfectly crafted.</p>
          <ol className="process__steps">
            {steps.map(([title, description], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
