'use client';

import Image from "next/image";
import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";

export default function HeroParallax() {
  const [current, setCurrent] = useState(0);
  const target = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => { target.current = window.scrollY || 0; };
    const tick = () => {
      const ease = 0.12;
      setCurrent((prev) => prev + (target.current - prev) * ease);
      rafId.current = requestAnimationFrame(tick);
    };

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!media.matches) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      rafId.current = requestAnimationFrame(tick);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const parallax = current * 0.60;

  return (
    <header className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0 will-change-transform pointer-events-none"
        style={{ transform: `translate3d(0, ${parallax}px, 0)` }}
      >
        <div className="absolute inset-0 scale-110">
          <Image
            src="/poiss.jpg"
            alt="Background"
            fill
            className="hidden md:block object-cover object-left translate-x-20"
            priority
          />
          <Image
            src="/yungman.png"
            alt="Background"
            fill
            className="block md:hidden object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* upper color block */}
      <div className="absolute z-10 bg-[#FAEFEF] top-0 left-0 w-full h-[50vh] md:h-full md:w-1/2 md:inset-y-0 pointer-events-none" />

      {/* desktop */}
      <div className="relative z-50 pt-8">
        <Navbar />
        <section className="hidden md:flex flex-col space-y-8 font-poppins text-black max-w-4xl px-6 md:px-12 pt-20 pb-16">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold leading-tight">
            Muudame sinu<br />
            brändi <span className="text-[#FF8282]">unustamatuks.</span>
          </h1>
          <p className="text-md sm:text-lg text-black/80 font-normal">
            Autentiline ja rabaaav sisu, brändidele, kes hoolivad.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#kontakt" className="inline-block bg-black text-white font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
              Võta Ühendust
            </a>
            <a href="#video" className="group relative inline-flex items-center gap-2 border border-black text-black font-semibold px-6 py-3 rounded-full shadow-md hover:bg-black hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden">
              Vaata Videot
              <img src="/videoicon.png" alt="Video" className="h-4 w-4 object-contain relative top-[1px]" />
              <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white animate-spin-slow"></span>
            </a>
          </div>
        </section>
      </div>

      {/* mobile hero content */}
      <div className="absolute left-0 z-20 h-[50vh] w-full md:hidden px-6 pb-6 flex items-end top-[1px]">
        <section className="w-full max-w-4xl font-poppins text-black flex flex-col items-center space-y-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Muudame sinu<br />
            brändi <span className="text-[#FF8282]">unustamatuks.</span>
          </h1>
          <p className="text-md sm:text-lg text-black/80 font-normal">
            Autentiline ja rabav sisu, brändidele, kes hoolivad.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="#kontakt" className="inline-block bg-black text-white font-semibold px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
              Võta Ühendust
            </a>
            <a href="#video" className="group relative inline-flex items-center gap-2 border border-black text-black font-semibold px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-full shadow-md hover:bg-black hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden">
              Vaata Videot
              <img src="/videoicon.png" alt="Video" className="h-3 w-3 sm:h-4 sm:w-4 object-contain relative top-[1px]" />
              <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white animate-spin-slow"></span>
            </a>
          </div>
        </section>
      </div>

      {/* bottom mobile block */}
      <div className="absolute z-10 bottom-0 left-0 w-full h-[25vh] md:hidden bg-[#FAEFEF] flex items-start px-6 pb-10 pt-6">
        <div className="w-full max-w-4xl">
          <section className="font-poppins text-black flex flex-col items-center text-center space-y-6">
            <div className="inline-block text-center">
              <h2 className="text-5xl sm:text-3xl font-extrabold leading-tight bg-gradient-to-r from-[#FF8282] to-black bg-clip-text text-transparent">
                WIMEDIA
              </h2>
              <div className="mt-1 h-[3px] w-12 mx-auto bg-gradient-to-r from-[#FF8282] to-black rounded-full" />
            </div>
            <p className="text-base sm:text-lg text-black/80">Sisuloome, foto ja video, mis kõnetavad päriselt.</p>
          </section>
        </div>
      </div>
    </header>
  );
}
