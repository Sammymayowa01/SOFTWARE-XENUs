import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Projects from "@/sections/Projects";
import Pricing from "@/sections/Pricing";
import TestimonialsCarousel from "@/sections/TestimonialsCarousel";
import Contact from "@/sections/Contact";
import Newsletter from "@/sections/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Pricing />
        <TestimonialsCarousel />
        <Contact />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
