'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const NAV = [
  { label: 'Meist',      href: '#meist' },
  { label: 'Koostööd',   href: '#koostood' },
  { label: 'Kontakt',    href: '#kontakt' },
  { label: 'Teenused',    href: '#teenused' },
  { label: 'Tehtud tööd', href: '#tood' },
  ];


  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-[#FAEFEF] rounded-[24px] shadow-md font-poppins relative z-50">
      
      <div className="text-xl font-bold">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/wimedia.png"
            alt="WIMEMEDIA"
            width={40}
            height={40}
            className="object-contain rounded-full shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-110"
          />
        </Link>
      </div>

      
    <ul className="hidden md:flex gap-8 text-black font-medium items-center">
      {NAV.slice(0,4).map(({label, href}) => (
        <li key={label}>
            <Link
              href={href}
              className="inline-block transform transition-all duration-300 hover:scale-105 bg-white text-black rounded-full px-6 py-2 hover:bg-black hover:text-white shadow-md hover:shadow-xl"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      
      <div className="md:hidden z-50">
        <button onClick={toggleMenu}>
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      
      <div className="hidden md:block">
        <Link href="#tood"
          className="inline-block transform transition-all duration-300 hover:scale-105 bg-white text-black rounded-full px-6 py-2 hover:bg-black hover:text-white shadow-md hover:shadow-xl font-medium"
        >
          Tehtud tööd
        </Link>
      </div>

      
      {menuOpen && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <button className="absolute inset-0 bg-black/30" onClick={()=>setMenuOpen(false)} />
          <div className="absolute left-4 right-4 top-20 bg-[#FAEFEF] rounded-2xl shadow-xl p-6 flex flex-col items-center gap-4">
            {NAV.map(({label, href}) => (
              <Link
                key={label}
                href={href}
                onClick={()=>setMenuOpen(false)}
                className="w-full text-center text-black font-medium text-lg hover:text-white hover:bg-black px-6 py-2 rounded-full transition-all"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
