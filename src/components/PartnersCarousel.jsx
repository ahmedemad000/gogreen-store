import React from "react";

const partners = [
  {
    id: 1,
    name: "Rustic.Egypt",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRfJKs4lcOFHlo-_hX3txP4FkT4CD7yiQFxg&s",
    testimonial: "Leading supplier of organic produce",
  },
  {
    id: 2,
    name: "Wellworldwithhana",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ2FWwPP7DfbShs4mpgPGVuThe7xAJERTxUQ&s",
    testimonial: "Sustainable packaging solutions",
  },
  {
    id: 3,
    name: "Bee_e_wraps",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0hRmDpoZTw34vhRWCswolgYmyJbClftOy3g&s",
    testimonial: "Ethical clothing manufacturer",
  },
  {
    id: 4,
    name: "Earthlygrp",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGOYhUNsKX_6ciY2UtgJ1qKdVjiQzPYX1tEA&s",
    testimonial: "Renewable energy partners",
  },
  {
    id: 5,
    name: "Nankar_",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS7z6saQzYqJd2qy1R17cDCCGVyW61YVa1Dg&s",
    testimonial: "Eco-friendly water filtration",
  },
  {
    id: 6,
    name: "joury_handmade_soap",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2tCmmHc-dQAVY8IiSBMFdOgqkQkPFdAFHVQ&s",
    testimonial: "Sustainably sourced wood products",
  },
  {
    id: 7,
    name: "Bamboocairo",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdt82hrfDj_cpW_ckWYptH6r8ImBw6_FDOKA&s",
    testimonial: "Sustainably sourced wood products",
  },
];

export default function PartnersCarousel() {
  // Duplicate the partners array to create seamless looping
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="bg-green-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Our Trusted Partners
        </h2>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
          We collaborate with industry leaders who share our commitment to
          sustainability
        </p>
      </div>

      <div className="relative w-full">
        {/* Gradient fade effects */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-green-50 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-green-50 to-transparent z-10" />

        <div className="animate-infinite-scroll flex w-max space-x-8">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 px-4 py-2 flex flex-col items-center transition-transform hover:scale-105"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md w-72 h-56 flex flex-col items-center justify-center border border-gray-100 transition-all">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-14 object-contain mb-4"
                  loading="lazy"
                />
                <p className="text-gray-600 text-center italic">
                  "{partner.testimonial}"
                </p>
                <p className="text-green-600 font-medium mt-4 text-center">
                  {partner.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
