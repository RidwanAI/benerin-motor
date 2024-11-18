import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", { hour12: false });
  };

  return (
    <div className="flex flex-col font-poppins items-start space-y-0.5 text-xs">
      <p>{formatDate(currentDate)}</p>
      <p>{formatTime(currentDate)} WIB</p>
    </div>
  );
};

export default DateTime;
