import React, { useEffect, useRef } from "react";

const Carousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;

    const scrollNext = () => {
      if (!carousel) return;

      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      const maxScrollLeft = scrollWidth - clientWidth;

      const nextScroll = scrollLeft + clientWidth;

      if (nextScroll > maxScrollLeft) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carousel.scrollTo({ left: nextScroll, behavior: "smooth" });
      }
    };

    const interval = setInterval(scrollNext, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="p-3">
      <div ref={carouselRef} className="carousel flex gap-2 overflow-x-hidden snap-x scrollbar-hide">
        {[
          {
            title: "Diskon 50%",
            desc: "Diskon untuk produk oli terbaik!",
            bg: "bg-gradient-to-b from-orange-500 to-orange-700",
          },
          {
            title: "Promo Bulan Ini",
            desc: "Gratis jasa perbaikan hingga 10%",
            bg: "bg-gradient-to-b from-orange-500 to-orange-700",
          },
          {
            title: "New Arrivals",
            desc: "Produk spare part terbaru!",
            bg: "bg-gradient-to-b from-orange-500 to-orange-700",
          },
        ].map((promo, index) => (
          <div key={index} className={`h-60 flex flex-shrink-0 items-center justify-center p-4 rounded-sm shadow-sm snap-center  text-center w-full ${promo.bg}`}>
            <div className="font-bold space-y-3 text-white">
              <p className="text-2xl">{promo.title}</p>
              <p className="text-xl">{promo.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
