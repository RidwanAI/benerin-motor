import React, { useState } from "react";

const FAQ = () => {
  // Searching
  const [searchTerm, setSearchTerm] = useState("");

  // Paggination
  const [currentPage, setCurrentPage] = useState(1);

  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    { id: 1, question: "Bengkel Benerin Motor menyediakan layanan apa saja?", answer: "Bengkel Benerin Motor tersedia layanan service perbaikan motor dan jual beli sparepart motor." },
    {
      id: 2,
      question: "Apakah Bengkel Benerin Motor menyediakan layanan panggilan untuk perbaikan motor?",
      answer: "Bengkel Benerin Motor tersedia layanan panggilan service perbaikan motor ke rumah atau di tempat manapun asalkan sudah ada perjanjian.",
    },
    {
      id: 3,
      question: "Berapa lama untuk waktu pengerjaan dalam satu motor?",
      answer: "Bengkel Benerin Motor mengerjakan kendaraan customer menyesuaikan kerusakan yang terdapat di kendaraan customer, jadi kemungkinan tidak bisa diberi waktu tenggat.",
    },
    { id: 4, question: "Jenis motor apa saja yang dikerjakan?", answer: "Bengkel Benerin Motor mengerjakan semua jenis motor." },
    { id: 5, question: "Dimana lokasi pengerjaan Bengkel Benerin Motor?", answer: "Untuk saat ini, Bengkel Benerin Motor berlokasi di perumahan." },
    { id: 6, question: "Bagaimana cara untuk mendapatkan service perbaikan motor di Bengkel Benerin Motor?", answer: "Customer wajib booking terlebih dahulu, bisa melalui website atau media sosial." },
  ];

  const itemsPerPage = 5;
  // Filter FAQ
  const filteredFAQs = faqs.filter((faq) => faq.question.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredFAQs.length / itemsPerPage);
  const paginatedFAQs = filteredFAQs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="bg-white p-4 rounded-sm shadow-md space-y-3">
      {/* Header */}
      <p className="font-semibold text-xl md:text-2xl">FAQ</p>
      <p className="text-slate-700">Find answers to common questions or contact support for further assistance.</p>

      {/* Search */}
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

      {/* FAQ*/}
      <div className="space-y-3">
        {paginatedFAQs.map((faq) => (
          <div key={faq.id} className="border border-orange-500 p-4 rounded-sm shadow-sm space-y-2">
            <button onClick={() => toggleFAQ(faq.id)} className="flex font-semibold justify-between items-center text-start w-full">
              <span>{faq.question}</span>
            </button>
            {openFAQ === faq.id && <p className="text-slate-700">{faq.answer}</p>}
          </div>
        ))}

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <button
            className={`px-3 py-1.5 rounded-md text-white md:px-5 md:py-1.5 ${currentPage === 1 ? "bg-slate-500 cursor-not-allowed " : "bg-blue-500 duration-300 hover:bg-blue-700"}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-3 py-1.5 rounded-md text-white md:px-5 md:py-1.5 ${currentPage === totalPages ? "bg-slate-500 cursor-not-allowed" : "bg-blue-500 duration-300 hover:bg-blue-700"}`}
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
