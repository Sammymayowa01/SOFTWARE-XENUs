import Navbar from '../src/components/common/Navbar';
import Footer from '../src/components/common/Footer';
import Hero from '../src/sections/Hero';
import About from '../src/sections/About';
import Services from '../src/sections/Services';
import Projects from '../src/sections/Projects';
import Pricing from '../src/sections/Pricing';
import TestimonialsCarousel from '../src/sections/TestimonialsCarousel';
import Contact from '../src/sections/Contact';
import Newsletter from '../src/sections/Newsletter';

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