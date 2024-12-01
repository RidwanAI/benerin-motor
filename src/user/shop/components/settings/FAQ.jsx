import React, { useState } from "react";

const FAQ = () => {
  // List => FAQS
  const faqs = [
    { id: 1, question: "Bengkel Benerin Motor menyediakan layanana apa saja?", answer: "Bengkel Benerin Motor menyediakan layanan perbaikan motor / service motor dan juga menjual berbagai sparepart motor." },
    { id: 2, question: "Dimana lokasi Bengkel Benerin Motor dalam pengerjaan service / pelayanan perbaikan motor?", answer: "Untuk saat ini, perbaikan dilakukan dilokasi perumahan." },
    {
      id: 3,
      question: "Jenis motor apa saja yang dapat dilayani oleh Bengkel Benerin Motor?",
      answer: "Berdasarkan kemampuan dan keahlian mekanik pada Bengkel Benerin Motor, jenis motor yang dapat dilakukan pengerjaan yaitu Yamaha, Honda, Suzuki, Vespa, dan lainnya.",
    },
    {
      id: 4,
      question: "Pelayanan Bengkel Benerin Motor, apakah bisa memberikan pelayanan panggilan?",
      answer: "Bisa, customer harus melakukan pembookingan atau memesan antrian terlebih dahulu untuk dapat mendapatkan pelayanan panggilan ke rumah customer.",
    },
    {
      id: 5,
      question: "Bagaimana cara untuk mendapatkan pelayanan dari Bengkel Benerin Motor?",
      answer: "Semua customer, wajib melakukan pembookingan atau pemesanan antrian yang dapat dilakukan melalui whatsaap yang tertera di sosial media (instagram : @benerin.motor) atau website kami (website : benerinmotor.vercel.app).",
    },
    { id: 6, question: "Berapa lama pengerjaan pada kendaraan customer?", answer: "Sesuai dengan keadaan kerusakan yang terjadi pada motor customer." },
  ];

  // Function => Searching
  const [searchTerm, setSearchTerm] = useState("");
  const filteredFAQs = faqs.filter((faq) => faq.question.toLowerCase().includes(searchTerm.toLowerCase()));

  // Function => Dropdown
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // Function => Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredFAQs.length / itemsPerPage);
  const paginatedFAQs = filteredFAQs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="bg-white font-poppins p-3 rounded-sm shadow-sm space-y-3">
      {/* Part => Header */}
      <div className="flex flex-col items-start space-y-1">
        <p className="font-semibold text-xl">FAQ</p>
        <p className="text-slate-500 text-sm">Find answers to common questions or contact support for further assistance.</p>
      </div>

      {/* Part => Searching */}
      <input
        type="text"
        placeholder="Search FAQs..."
        className="p-2 border rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* Part => FAQS */}
      <div className="space-y-3">
        {paginatedFAQs.map((faq) => (
          <div key={faq.id} className="border p-2 rounded-sm space-y-2">
            <button onClick={() => toggleFAQ(faq.id)} className="flex text-md text-start w-full">
              <span>{faq.question}</span>
            </button>
            {openFAQ === faq.id && <p className="text-slate-500 text-sm">{faq.answer}</p>}
          </div>
        ))}

        {/* Part => Pagination */}
        <div className="flex items-center justify-between">
          <button
            className={`px-3 py-1.5 rounded-md md:px-5 md:py-1.5 ${currentPage === 1 ? "bg-slate-300 cursor-not-allowed " : "bg-orange-500 duration-300 text-white hover:bg-orange-700"}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button
            className={`px-3 py-1.5 rounded-md md:px-5 md:py-1.5 ${currentPage === totalPages ? "bg-slate-300 cursor-not-allowed" : "bg-orange-500 duration-300 text-white hover:bg-orange-700"}`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
