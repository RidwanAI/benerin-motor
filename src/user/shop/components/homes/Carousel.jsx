/* Carousel => Done */

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

  const listCarousel = [
    {
      image: "./shop/homes/carousel/carousel-1.png",
    },
    {
      image: "./shop/homes/carousel/carousel-2.png",
    },
    {
      image: "./shop/homes/carousel/carousel-3.png",
    },
  ];

  return (
    <section>
      <div
        ref={carouselRef}
        className="carousel flex gap-2 overflow-x-hidden snap-x scrollbar-hide"
      >
        {listCarousel.map((promo, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${promo.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex flex-shrink-0 h-48 items-center justify-center p-4 shadow-sm snap-center text-center w-full md:h-96"
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
