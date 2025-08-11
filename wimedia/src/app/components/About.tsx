'use client';

export default function About() {
  return (
    <section id="meist" className="px-6 md:px-12 py-16 md:py-24">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-shadow font-poppins text-6xl md:text-8xl font-light text-black tracking-tight mb-8 md:mb-10">
          MEIST
        </h2>


        <div className="relative">

          <div className="absolute -top-6 left-[8%] right-0 h-[320px] md:h-[450px] bg-[#FAEFEF] -z-10" />


            <h3 className="font-poppins text-2xl md:text-3xl text-black text-right font-normal mb-5 pr-6">
            Kuidas sai meie lugu alguse
            </h3>


            <div className="relative mt-2">

                <div
                    className="
                    pointer-events-none
                    absolute
                    top-0
                    w-[720px] max-w-[92vw]
                    h-[350px] sm:h-[260px] md:h-[500px]
                    border-t border-l border-b border-black/60
                    rounded-none
                    "
                />


                <div className="relative z-10 max-w-xl ml-auto text-right font-poppins text-black/80 leading-8 text-[10px] md:text-base font-light space-y-5 px-10 py-8">
                    <p>
                    Aastal 2013 sündis sõprusest ja unistustest ettevõte, mis muutis meie elud.
                    Meie teekond ettevõtlusmaailmas algas põnevate seiklustega Hong Kongist
                    imporditud toodetega.
                    </p>
                    <p>
                    See teekond pani meid küsima: kuidas neid imelisi tooteid kõigile kättesaadavaks teha?
                    Digiturunduse võlumaailma sukeldudes avastasime, et meie kirg on hoopis mujal.
                    </p>
                    <p>
                    Meie uudishimu digiturunduse vastu kasvas iga päevaga, mis viis meid lõpuks 2016. aastal
                    reklaamiagentuuri WiMeedia asutamiseni.
                    </p>
                </div>
                </div>


        </div>
      </div>
    </section>
  );
}
