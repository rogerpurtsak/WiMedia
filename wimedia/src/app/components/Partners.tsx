'use client';

import { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

type Slide = {
  logos: { src: string; alt: string }[];
  quote: string;
  author: string;
  role: string;
  link?: string;
};

const slides: Slide[] = [
  {
    logos: [
      { src: '/siluett.png', alt: 'Siluett' },
      { src: '/bauhof.png', alt: 'Bauhof' },
      { src: '/douglas.png', alt: 'Douglas' },
    ],
    quote:
      'Soovitan, sest kõik kontaktid on olnud vajadusel väga operatiivsed ja ladusad. Keegi pole kuhugi ära kadunud ega hakanud asjadega venitama. Usaldusväärne.',
    author: 'Roger Purtsak',
    role: 'CEO',
    link: 'https://siluettpood.ee',
  },
];

export default function Partners() {
  const [idx, setIdx] = useState(0);
  const cur = slides[idx];

  const prev = () => setIdx((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <section id="koostööd" className="relative px-6 md:px-12 py-16 md:py-24">
      
      <h2 className="font-poppins text-black text-5xl md:text-7xl font-light tracking-tight mb-10 md:mb-14">
        KOOSTÖÖD
      </h2>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={prev}
          aria-label="Eelmine"
          className="p-2 rounded-full border border-black hover:bg-black hover:text-white transition"
        >
          <HiChevronLeft className="h-6 w-6" />
        </button>

        <div className="flex-1 grid grid-cols-3 items-center justify-items-center gap-6 md:gap-10">
          {cur.logos.map((l) => (
            <img
              key={l.alt}
              src={l.src}
              alt={l.alt}
              className="h-10 md:h-14 object-contain opacity-90 hover:opacity-100 transition"
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Järgmine"
          className="p-2 rounded-full border border-black hover:bg-black hover:text-white transition"
        >
          <HiChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-col items-center text-center justify-center h-64 mt-10 md:mt-12 rounded-[18px] border border-black/70 shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-5 md:p-7">
        <p className="font-poppins text-sm md:text-base text-black/90 leading-relaxed">
          “{cur.quote}”
        </p>

        <div className="mt-5">
          <p className="text-center font-poppins font-semibold">
            {cur.author} <span className=" text-center font-normal text-black/70">/ {cur.role}</span>
          </p>
          {cur.link && (
            <a
              href={cur.link}
              target="_blank"
              rel="noreferrer"
              className="text-black/70 underline-offset-2 hover:underline"
            >
              {new URL(cur.link).hostname}
            </a>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Mine slaidile ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === idx ? 'bg-black' : 'bg-black/30 hover:bg-black/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
