import React, { useEffect, useRef, useState } from "react";

const ConstPortfolio = ({ target, duration }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Intersection Observer untuk memantau elemen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 } // Elemen harus terlihat setidaknya 50% untuk dianggap masuk viewport
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) {
      setCount(0); // Reset count ketika elemen keluar dari viewport
    } else {
      let start = 0;
      const increment = target / (duration / 10);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCount(Math.ceil(start));
      }, 10);

      return () => clearInterval(timer);
    }
  }, [inView, target, duration]);

  return (
    <span className="text-2xl" ref={elementRef}>
      {count}
    </span>
  );
};

export default ConstPortfolio;
