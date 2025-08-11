'use client';

import Link from 'next/link';
import {
  RiInstagramLine,
  RiFacebookCircleLine,
  RiTiktokLine,
  RiLinkedinLine,
} from 'react-icons/ri';

export default function Footer() {
  return (
    <footer
        role="contentinfo"
        className="flex flex-col items-center justify-between border-t border-black/10 bg-[#FAEFEF]/30 py-12 h-[350px]"
        >

        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-6 gap-6">

            <div className="flex items-center gap-3">
            <img src="/wimedia.png" alt="WiMeedia" className="h-8 w-auto" />
            <span className="font-semibold">WiMeedia</span>
            </div>

            <nav className="flex gap-6 text-sm">
            <a href="#">Kodu</a>
            <a href="#meist">Meist</a>
            <a href="#koostood">Koostööd</a>
            <a href="#tood">Tehtud tööd</a>
            <a href="#teenused">Teenused</a>
            <a href="#kontakt">Kontaktid</a>
            </nav>

            <div className="flex gap-5 text-xl text-black/60">
            <i className="ri-instagram-line hover:text-black cursor-pointer"></i>
            <i className="ri-facebook-circle-line hover:text-black cursor-pointer"></i>
            <i className="ri-tiktok-line hover:text-black cursor-pointer"></i>
            <i className="ri-linkedin-line hover:text-black cursor-pointer"></i>
            </div>
        </div>

        <hr className="w-full max-w-6xl border-black/10 my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-6 text-xs text-black/50 gap-3">
            <p>© 2025 WiMeedia. Built with intention.</p>
            <div className="flex gap-5">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
            </div>
        </div>
        </footer>

  );
}
