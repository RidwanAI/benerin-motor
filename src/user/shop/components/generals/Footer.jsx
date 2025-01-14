// Footer.jsx -> Done

import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 font-poppins p-3 space-y-3 text-white">
      {/* Branding & Tagline */}
      <div className="text-center">
        <p className="font-bold text-xl md:text-2xl">
          Benerin <span className="text-orange-500">Motor</span>
        </p>
        <p className="italic text-md">Produk Sparepart Motor Terpecaya!</p>
      </div>

      {/* Divider & Copywriting */}
      <hr />
      <div className="flex flex-col items-center text-xs text-white md:flex-row md:justify-between md:space-y-0">
        <p>&copy; {currentYear} Benerin Motor. All Rights Reserved.</p>
        <p>Made by Benerin Motor Team</p>
      </div>
    </footer>
  );
};

export default Footer;
