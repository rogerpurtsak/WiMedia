'use client';

import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setOk(null);

    const form = new FormData(e.currentTarget);
    const first = form.get('first') || '';
    const last = form.get('last') || '';
    const email = form.get('email') || '';
    const message = form.get('message') || '';
    const honey = form.get('company') || '';

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${first} ${last}`.trim(),
        email,
        message,
        honey,
        turnstileToken: token,
      }),
    });

    setPending(false);
    setOk(res.ok);
    if (res.ok) e.currentTarget.reset();
    setToken(null);
  }

  return (
    <section id="kontakt" className="px-6 md:px-12 py-16 md:py-24">

      <div className="text-center mb-10">
        <h2 className="font-poppins font-bold text-3xl md:text-6xl text-black mb-10">
          Kirjuta meile
        </h2>
        <p className="font-poppins text-black/70 max-w-xl mx-auto">
          Ehitame koos midagi meeldejäävat. Võta ühendust ja arutame.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-[#FAEFEF]/50 rounded-2xl p-6 md:p-8 shadow-sm">
        <form className="space-y-5" onSubmit={onSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="first"
              type="text"
              placeholder="Eesnimi"
              className="w-full px-4 py-3 bg-white/50 rounded-xl border border-black/20 outline-none font-poppins text-sm md:text-base"
              required
            />
            <input
              name="last"
              type="text"
              placeholder="Perenimi"
              className="w-full px-4 py-3 bg-white/50 rounded-xl border border-black/20 outline-none font-poppins text-sm md:text-base"
              required
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-white/50 rounded-xl border border-black/20 outline-none font-poppins text-sm md:text-base"
            required
          />

          <textarea
            name="message"
            placeholder="Räägi meile enda projektist"
            rows={5}
            className="w-full px-4 py-3 bg-white/50 rounded-xl border border-black/20 outline-none font-poppins text-sm md:text-base resize-none"
            required
          />

          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={setToken}
          />

          <button
            type="submit"
            disabled={pending || !token}
            className="w-full bg-black text-white py-3 md:py-4 rounded-xl font-poppins font-semibold hover:scale-[1.02] transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            {pending ? 'Saatmine...' : 'Võta ühendust'}
          </button>

          {ok === true && (
            <p className="text-green-600 font-poppins">Aitäh! Võtame teiega peagi ühendust.</p>
          )}
          {ok === false && (
            <p className="text-red-600 font-poppins">Midagi läks valesti. Proovi uuesti.</p>
          )}
        </form>
      </div>

      <div className="flex justify-center gap-6 mt-8 text-black/50">
        <a href="#" aria-label="Instagram" className="hover:text-black">
          <i className="ri-instagram-line text-2xl"></i>
        </a>
        <a href="#" aria-label="Facebook" className="hover:text-black">
          <i className="ri-facebook-circle-line text-2xl"></i>
        </a>
        <a href="#" aria-label="TikTok" className="hover:text-black">
          <i className="ri-tiktok-line text-2xl"></i>
        </a>
      </div>
    </section>
  );
}
