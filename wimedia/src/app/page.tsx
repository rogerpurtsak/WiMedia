export const revalidate = 0;

import Navbar from "./components/Navbar";          // can be client
import Partners from "./components/Partners";      // can be client
import About from "./components/About";            // SERVER (uses getContent)
import Works from "./components/Works";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import HeroParallax from "./components/HeroParallax"; // CLIENT

export default function Page() {
  return (
    <>
      <HeroParallax />
      <main>
        <section className="relative z-20 w-full bg-white py-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <Partners />
          </div>
        </section>

        <About />
        <Works />
        <Services />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}
