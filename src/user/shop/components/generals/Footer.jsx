import { useState } from "react";

const Footer = () => {
  // State untuk mengatur dropdown
  const [isKategoriOpen, setIsKategoriOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);
  const [isInformasiOpen, setIsInformasiOpen] = useState(false);

  return (
    <footer className="bg-slate-900 font-poppins p-3 space-y-3 text-white">
      {/* Branding & Tagline */}
      <div className="text-center">
        <p className="font-bold text-xl md:text-2xl">
          Benerin <span className="text-orange-500">Motor</span>
        </p>
        <p className="italic text-md">Produk Sparepart Motor Terpecaya!</p>
      </div>
      <hr className="border-2" />

      {/* Dropdown Mobile */}
      <div className="space-y-3 md:hidden">
        {/* Category */}
        <div>
          <button onClick={() => setIsKategoriOpen(!isKategoriOpen)} className="flex items-center justify-between rounded-md text-md text-orange-500 w-full">
            Category
            <span>
              {isKategoriOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768z" />
                </svg>
              )}
            </span>
          </button>
          {isKategoriOpen && (
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  Honda
                </a>
              </li>
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  Yamaha
                </a>
              </li>
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  Kawasaki
                </a>
              </li>
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  Suzuki
                </a>
              </li>
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  Vespa
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* Service */}
        <div>
          <button onClick={() => setIsLayananOpen(!isLayananOpen)} className="flex items-center justify-between rounded-md text-md text-orange-500 w-full">
            Service
            <span>
              {isLayananOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768z" />
                </svg>
              )}
            </span>
          </button>
          {isLayananOpen && (
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  Servis Berkala
                </a>
              </li>
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  Ganti Oli
                </a>
              </li>
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  Sparepart
                </a>
              </li>
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  Tune-Up
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* Information */}
        <div>
          <button onClick={() => setIsInformasiOpen(!isInformasiOpen)} className="flex items-center justify-between rounded-md text-md text-orange-500 w-full">
            Information
            <span>
              {isInformasiOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768z" />
                </svg>
              )}
            </span>
          </button>
          {isInformasiOpen && (
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="block duration-300 hover:text-orange-500">
                  FAQs
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className="gap-3 grid-cols-4 hidden max-w-7xl mx-auto md:grid text-md text-start mb-6">
        {/* Category */}
        <div className="flex flex-col items-center justify-start space-y-3">
          <ul className="space-y-2">
            <p className="font-semibold text-orange-500">Category</p>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Honda
              </a>
            </li>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Yamaha
              </a>
            </li>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Kawasaki
              </a>
            </li>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Suzuki
              </a>
            </li>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Vespa
              </a>
            </li>
          </ul>
        </div>

        {/* Service */}
        <div className="flex flex-col items-center justify-start space-y-3">
          <ul className="space-y-2">
            <p className="font-semibold text-orange-500">Service</p>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Servis Berkala
              </a>
            </li>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Ganti Oli
              </a>
            </li>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Sparepart
              </a>
            </li>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Tune-Up
              </a>
            </li>
          </ul>
        </div>

        {/* Information */}
        <div className="flex flex-col items-center justify-start space-y-3">
          <ul className="space-y-2">
            <p className="font-semibold text-orange-500">Information</p>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center justify-start space-y-3">
          <ul className="space-y-2">
            <p className="font-semibold text-orange-500">Follow Us</p>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="duration-300 hover:text-orange-500">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider and Copywriting */}
      <hr className="border-2" />
      <div className="flex flex-col items-center text-xs text-slate-500 md:flex-row md:justify-between md:space-y-0">
        <p>&copy; 2024 Benerin Motor. All Rights Reserved.</p>
        <p>Made by Benerin Motor Team</p>
      </div>
    </footer>
  );
};

export default Footer;
