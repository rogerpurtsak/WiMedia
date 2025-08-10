'use client'

import React, { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-[#FAEFEF] rounded-[24px] shadow-md font-poppins relative z-50">
      
      <div className="text-xl font-bold">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/wimedia.png"
            alt="WIMEMEDIA"
            className="w-10 h-10 object-contain rounded-full shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-110"
          />
        </a>
      </div>

      
      <ul className="hidden md:flex gap-8 text-black font-medium items-center">
        {['Meist', 'Koostööd', 'Kontaktid'].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="inline-block transform transition-all duration-300 hover:scale-105 bg-white text-black rounded-full px-6 py-2 hover:bg-black hover:text-white shadow-md hover:shadow-xl"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      
      <div className="md:hidden z-50">
        <button onClick={toggleMenu}>
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      
      <div className="hidden md:block">
        <a
          href="#tehtud-tööd"
          className="inline-block transform transition-all duration-300 hover:scale-105 bg-white text-black rounded-full px-6 py-2 hover:bg-black hover:text-white shadow-md hover:shadow-xl font-medium"
        >
          Tehtud tööd
        </a>
      </div>

      
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FAEFEF] shadow-md rounded-b-[24px] flex flex-col items-center gap-4 py-6 md:hidden animate-fade-in-down">
          {['Meist', 'Koostööd', 'Kontaktid', 'Tehtud tööd'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-black font-medium text-lg hover:text-white hover:bg-black px-6 py-2 rounded-full transition-all"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
