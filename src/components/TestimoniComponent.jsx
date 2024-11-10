import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    text: "Servis cepat dan profesional! Motor saya jadi lebih enteng setelah service rutin besar. Terpercaya!",
    author: "~ Thom Haye",
  },
  {
    id: 2,
    text: "Harga terjangkau, spare part berkualitas, dan teknisi yang handal. Sangat puas!",
    author: "~ Ragnar Oratmangoen",
  },
  {
    id: 3,
    text: "Ganti oli dan tune-up di Benerin Motor, motor jadi lebih nyaman dipakai. Layanan terbaik!",
    author: "~ Ivan Jenner",
  },
];

const TestimoniComponent = () => {
  const [currentTestimoniComponent, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // ganti setiap 5 detik

    return () => clearInterval(interval); // bersihkan interval saat komponen unmount
  }, []);

  return (
    <div className="border border-orange-500 flex flex-col items-start justify-center max-w-7xl mx-auto p-5 space-y-2 text-white tracking-wider">
      <p>"{testimonials[currentTestimoniComponent].text}"</p>
      <p className="font-bold">{testimonials[currentTestimoniComponent].author}</p>
    </div>
  );
};

export default TestimoniComponent;
