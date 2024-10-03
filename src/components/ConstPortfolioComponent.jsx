import React, { useEffect, useState } from "react";

const ConstPortfolioComponent = ({ target, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
  }, [target, duration]);

  return <span className="text-1xl">{count}</span>;
};

export default ConstPortfolioComponent;
