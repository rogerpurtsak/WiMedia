'use client';

import { useState } from 'react';

const filters = ['Kõik', 'Videod', 'Pildid', 'Reelid'];

const images = [
  { src: '/pilt1.png', alt: 'Restaurant', size: 'small' },
  { src: '/pilt2.png', alt: 'Makeup Close-up', size: 'large' },
  { src: '/pilt3.png', alt: 'Cosmetic Tube', size: 'small' },
  { src: '/pilt4.png', alt: 'Model with Mascara', size: 'small' },
  { src: '/pilt5.png', alt: 'Nail Polish', size: 'small' },
];

export default function Works() {
  const [active, setActive] = useState('Kõik');

  return (
    <section id="tood" className=" max-w-6xl mx-auto py-16 md:py-56">

      <h2 className="font-poppins text-black text-5xl md:text-8xl font-light tracking-tight mb-10 text-shadow">
        TEHTUD TÖÖD
      </h2>

      <div className="flex flex-wrap gap-3 mb-12">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`px-6 py-2 rounded-full border border-black text-sm font-poppins transition
              ${
                active === filter
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-black hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-[16px] ${
              img.size === 'large'
                ? 'col-span-2 row-span-2'
                : 'col-span-1 row-span-1'
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
