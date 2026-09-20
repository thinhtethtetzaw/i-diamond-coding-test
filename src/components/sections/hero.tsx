import Image from "next/image";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="canvas">
      <div className="hero__side hero__side--left"><Image src="/assets/hero-background.png" alt="" width={1440} height={420} priority /></div>
      <div className="hero__side hero__side--right"><Image src="/assets/hero-background.png" alt="" width={1440} height={420} priority /></div>
      <Image className="hero__bg-mobile" src="/assets/hero-background-mobile.png" alt="" width={375} height={300} priority />
      <div className="hero__copy">
        <h1 id="hero-title">Custom Jewelry</h1>
        <p>Create Your Masterpiece: Bespoke Jewelry Crafted for You</p>
      </div>
      <div className="hero__tweezers" aria-hidden="true"><Image src="/assets/hero-tweezers.png" alt="" width={363} height={336} priority /></div>
      <Image className="hero__ring" src="/assets/hero-ring.png" alt="Diamond engagement ring" width={565} height={565} priority />
      <Image className="hero__diamonds" src="/assets/hero-diamonds.png" alt="Loose diamonds" width={533} height={381} priority />
      </div>
    </section>
  );
}
