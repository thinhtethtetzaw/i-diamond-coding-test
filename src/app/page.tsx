import { Cta } from "@/components/sections/cta";
import { Feature } from "@/components/sections/feature";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <Services />
        <Feature />
        <Cta />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
