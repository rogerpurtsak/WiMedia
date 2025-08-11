'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Image from "next/image";

type Company = {
  logo: { src: string; alt: string };
  quote: string;
  author: string;
  role: string;
  link?: string;
};

const companies: Company[] = [
  {
    logo: { src: '/siluett.png', alt: 'Siluett' },
    quote:
      'Soovitan, sest kõik kontaktid on olnud vajadusel väga operatiivsed ja ladusad. Keegi pole kuhugi ära kadunud ega hakanud asjadega venitama. Usaldusväärne.',
    author: 'Roger Purtsak',
    role: 'CEO',
    link: 'https://siluettpood.ee',
  },
  {
    logo: { src: '/bauhof.png', alt: 'Bauhof' },
    quote:
      'Koostöö oli kiire ja professionaalne. Sisu tõi tulemusi ning tiim oli alati olemas.',
    author: 'Maris T.',
    role: 'Marketing Manager',
    link: 'https://www.bauhof.ee',
  },
  {
    logo: { src: '/douglas.png', alt: 'Douglas' },
    quote:
      'Väga kvaliteetne teostus ja paindlik lähenemine. Soovitame!',
    author: 'K. Laan',
    role: 'Brand Lead',
    link: 'https://www.douglas.ee',
  },
];

export default function Partners() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i === 0 ? companies.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === companies.length - 1 ? 0 : i + 1));

  const cur = companies[idx];

  return (
    <section id="koostood" className="relative px-6 md:px-12 py-16 md:py-24">
      <h2 className="font-poppins text-black text-5xl md:text-8xl font-light tracking-tight mb-10 md:mb-20 text-shadow">
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
          {companies.map((c, i) => (
            <button
              key={c.logo.alt}
              onClick={() => setIdx(i)}
              className={`group rounded-lg transition focus:outline-none focus:ring-2 focus:ring-black/40 ${
                i === idx ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`Vali ${c.logo.alt}`}
            >
              <Image
                src={c.logo.src}
                alt={c.logo.alt}
                width={56}
                height={56}
                className={`h-10 md:h-14 object-contain transition ${
                  i === idx ? 'scale-105 drop-shadow' : 'scale-100'
                }`}
              />
            </button>
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

      <div className="flex flex-col items-center text-center justify-center min-h-[14rem] mt-10 md:mt-12 rounded-[18px] border border-black/70 shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-5 md:p-7">
        <p className="font-poppins text-sm md:text-base text-black/90 leading-relaxed max-w-3xl">
          “{cur.quote}”
        </p>

        <div className="mt-5">
          <p className="font-poppins font-semibold">
            {cur.author}{' '}
            <span className="font-normal text-black/70">/ {cur.role}</span>
          </p>
          {cur.link && (
            <Link
              href={cur.link}
              target="_blank"
              rel="noreferrer"
              className="text-black/70 underline-offset-2 hover:underline"
            >
              {new URL(cur.link).hostname}
            </Link>
          )}
        </div>
      </div>


      <div className="mt-6 flex justify-center gap-2">
        {companies.map((_, i) => (
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
