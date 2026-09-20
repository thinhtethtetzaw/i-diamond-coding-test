import Image from "next/image";

const guides = ["How to Select the Ideal Wedding Band", "How to Choose the Engagement Ring", "Lab Grown Diamond Guide", "Ring Size Guide"];

export function Cta() {
  return (
    <section className="education" id="education" aria-labelledby="education-title">
      <div className="canvas">
      <h2 id="education-title">Explore More</h2>
      <p className="education__intro">Looking for more diamond guides, buying tips or details about the 4Cs? Explore more of our diamond education pages:</p>
      {guides.map((guide, index) => (
        <a className={`guide guide--${index + 1}`} href="#" key={guide}>
          <span>{guide}</span>
          <i><Image src="/assets/guide-arrow.svg" alt="" width={15} height={15} /></i>
        </a>
      ))}
      <div className="education__image">
        <Image src="/assets/education-jewelry.png" alt="Woman wearing a diamond necklace and earrings" width={597} height={597} sizes="597px" />
      </div>
      </div>
    </section>
  );
}
