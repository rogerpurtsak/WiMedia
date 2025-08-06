'use client'; // only for Next.js app router, remove this line if using CRA or pages/

import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-[#FFEFEF] rounded-b-[24px]">
      
      <div className="text-xl font-bold">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="WIMEMEDIA" className="w-10 h-10 object-contain" />
          <span className="hidden sm:inline text-black font-medium">WIMEMEDIA</span>
        </a>
      </div>

      
      <ul className="hidden md:flex gap-8 text-black font-medium">
        <li><a href="#meist" className="hover:underline">Meist</a></li>
        <li><a href="#koostoöd" className="hover:underline">Koostööd</a></li>
        <li><a href="#kontaktid" className="hover:underline">Kontaktid</a></li>
      </ul>

      
      <div>
        <a
          href="#tehtud-tööd"
          className="bg-white text-black border border-black rounded-full px-6 py-2 font-medium hover:bg-black hover:text-white transition"
        >
          Tehtud tööd
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
