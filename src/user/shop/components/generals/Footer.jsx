const Footer = () => {
  return (
    <footer className="bg-slate-900 p-3 text-white text-center space-y-3">
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className="font-semibold text-xl md:text-2xl">
          Benerin <span className="text-orange-500">Motor</span>
        </p>
        <p className="text-md">Bengkel Motor Andalan, Solusi Kendaraan Prima!</p>
      </div>
      <hr className="border-2 w-full" />
      <div className="flex gap-2 items-center justify-center text-sm">
        <a href="#" className="duration-300 hover:text-orange-500">
          About Us
        </a>
        <a href="#" className="duration-300 hover:text-orange-500">
          Contact
        </a>
        <a href="#" className="duration-300 hover:text-orange-500">
          Privacy Policy
        </a>
      </div>
      <p className="text-xs text-gray-400 mt-3">&copy; 2024 Benerin Motor. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
