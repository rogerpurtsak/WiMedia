'use client';

import { LuMegaphone, LuTarget, LuClapperboard } from 'react-icons/lu';

const services = [
  {
    icon: <LuMegaphone className="h-7 w-7" />,
    title: 'Sotsiaalmeedia turundus/haldus',
    body:
      'Hoiame aktiivsena, haldame kampaaniaid Instagrami reelistest kuni TikTokideni',
  },
  {
    icon: <LuTarget className="h-7 w-7" />,
    title: 'Strateegia ja konsulteerimine',
    body:
      'Anname nõu, kuidas jõuda rohkemate inimesteni ja efektiivsemalt',
    featured: true,
  },
  {
    icon: <LuClapperboard className="h-7 w-7" />,
    title: 'Produktsioon',
    body:
      'Sina ütled idee ja meie teostame ning tegeleme produktsiooniga filmimisest kuni näitlejateni',
  },
];

export default function Services() {
  return (
    <section id="teenused" className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 bg-amber-50">

      <h2 className="font-poppins text-black text-5xl md:text-8xl font-light tracking-tight mb-10 md:mb-12 text-shadow">
        TEENUSED
      </h2>

      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {services.map((s, i) => (
          <div
            key={i}
            className={[
              'rounded-2xl bg-[#FAEFEF] p-6 md:p-8 text-center font-poppins',
              'shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-black/10',
              s.featured
                ? 'md:translate-y-[-14px] md:shadow-[0_10px_24px_rgba(0,0,0,0.12)] bg-[#FAEFEF]'
                : '',
              'transition-transform duration-300 hover:-translate-y-1',
            ].join(' ')}
          >
            <div className="mx-auto mb-4 md:mb-5 text-black/80">{s.icon}</div>
            <h3 className="text-lg md:text-xl font-semibold text-black mb-3 leading-snug">
              {s.title}
            </h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              {s.body}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10 md:mt-12">
        <a
          href="#kontakt"
          className="inline-block bg-black text-white font-poppins font-semibold
                     px-8 py-3 md:px-10 md:py-4 rounded-full
                     shadow-md hover:shadow-lg hover:scale-[1.03]
                     transition-all duration-300"
        >
          Võta ühendust
        </a>
      </div>
    </section>
  );
}
