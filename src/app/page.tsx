import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Nav } from "@/components/Nav";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Works } from "@/components/Works";

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Langsung ke isi</a>
      <div id="top-sentinel" style={{ position: "absolute", top: 0, height: 40, width: 1 }} aria-hidden="true" />
      <SmoothScroll />
      <Nav />
      <main id="main">
        <Hero />
        <Manifesto />
        <Services />
        <Works />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
