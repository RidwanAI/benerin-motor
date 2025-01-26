import { useState } from "react";

const ServiceTuneUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col gap-5 items-start justify-center w-full md:flex-row">
      <div className="w-full md:w-1/2">
        <img src="../services/tu.png" alt="tu" className="rounded-md" />
      </div>
      <div className="flex flex-col gap-5 w-full md:w-1/2">
        {/* Description Tune Up */}
        <div className="flex flex-col gap-2">
          <p className="font-bold text-2xl md:text-3xl">Tune Up</p>
          <p className="text-justify md:text-left">
            Layanan penyetelan ulang untuk meningkatkan performa mesin. Meliputi
            pembersihan karburator, filter udara, penyetelan klep, dan
            penggantian busi.
          </p>
        </div>
        <hr className="border-2" />

        {/* Informasi */}
        <div className="flex flex-col gap-2 rounded-md w-auto">
          <div className="flex flex-col">
            {/* Button Dropdown */}
            <button
              onClick={toggleDropdown}
              className="duration-300 flex gap-2 items-center justify-between text-white text-md hover:text-orange-700"
            >
              <p>Detail Information</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-repeat"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                <path
                  fill-rule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="flex flex-col gap-1 mt-2">
                <ul className="text-sm">
                  <li className="flex items-center gap-2">
                    <p>Harga?</p>
                    <p>Rp.150.000,00 - Rp.200.000,00</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <p>Layanan Konsultasi?</p>
                    <a href="/" className="duration-300 hover:text-orange-700">
                      Admin
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTuneUp;
