import React, { useState } from "react";

const Footer = () => {
  // Dropdown Links
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const [isFollowUsOpen, setIsFollowUsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="font-poppins text-white w-full">
      <div className="bg-slate-950">
        {/* Row - 1 */}
        <div className="bg-slate-800 flex items-center justify-around py-5 text-white tracking-wider w-full">
          <p className="flex font-bold italic items-center text-md md:text-2xl">Terpecaya</p>
          <p className="flex font-bold italic items-center text-md md:text-2xl">Murah</p>
          <p className="flex font-bold italic items-center text-md md:text-2xl">Bersahabat</p>
        </div>

        {/* Row - 2 */}
        <div className="flex flex-col gap-10 items-center justify-center max-w-7xl mx-auto px-3 py-10 w-full md:flex-row md:px-7">
          {/* Part Kiri */}
          <div className="flex flex-col gap-4 items-start justify-center w-full lg:w-1/2">
            {/* Title */}
            <div className="flex flex-col gap-2 w-full">
              <p className="font-semibold text-xl md:text-2xl">
                Benerin <span className="text-orange-500">Motor</span>
              </p>
              <p className="font-bold italic text-justify text-md">Bengkel Motor Andalan, Solusi Kendaraan Prima!</p>
            </div>

            <hr className="border-2 w-full" />

            {/* Address */}
            <div className="flex flex-col space-y-2 text-sm">
              <p className="text-justify">Pondok Ungu Permai Sektor V M6 No. 10, Kel. Bahagia, Kec. Babelan, Kab. Bekasi Utara, Jawa Barat.</p>
              <iframe
                className="rounded-md"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.91632929492297!2d107.01812375819513!3d-6.176080969305151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1731248935646!5m2!1sid!2sid"
                width="auto"
                height="auto"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Links */}
            <div className="flex flex-col space-y-2 text-sm w-full">
              {/* Informasi Dropdown */}
              <div className="w-full">
                <p className="border border-orange-500 cursor-pointer flex font-semibold justify-between items-center p-3 rounded-md text-md" onClick={() => setIsInfoOpen(!isInfoOpen)}>
                  Informasi
                  <span>
                    {isInfoOpen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                        <path
                          fill-rule="evenodd"
                          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
                        />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768z" />
                      </svg>
                    )}
                  </span>
                </p>
                {isInfoOpen && (
                  <div className="flex flex-col text-sm space-y-2 py-5">
                    <a href="" className="duration-300 hover:px-4 hover:text-orange-500">
                      Tentang Kami
                    </a>
                    <a href="" className="duration-300 hover:px-4 hover:text-orange-500">
                      Kebijakan Privasi
                    </a>
                    <a href="" className="duration-300 hover:px-4 hover:text-orange-500">
                      Kebijakan Hak Cipta
                    </a>
                    <a href="" className="duration-300 hover:px-4 hover:text-orange-500">
                      FAQ
                    </a>
                    <a href="" className="duration-300 hover:px-4 hover:text-orange-500">
                      Syarat & Ketentuan
                    </a>
                  </div>
                )}
              </div>

              {/* Link Cepat Dropdown */}
              <div className="w-full">
                <p className="border border-orange-500 cursor-pointer flex font-semibold justify-between items-center p-3 rounded-md text-md" onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}>
                  Link Cepat
                  <span>
                    {isQuickLinksOpen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                        <path
                          fill-rule="evenodd"
                          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
                        />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768z" />
                      </svg>
                    )}
                  </span>
                </p>
                {isQuickLinksOpen && (
                  <div className="flex flex-col py-5 space-y-2 text-sm">
                    <a href="" className="duration-300 hover:px-4 hover:text-orange-500">
                      Home
                    </a>
                    <a href="" className="duration-300 hover:px-4 hover:text-orange-500">
                      Product
                    </a>
                    <a href="" className="duration-300 hover:px-4 hover:text-orange-500">
                      Booking List
                    </a>
                    <a href="" className="duration-300 hover:px-4 hover:text-orange-500">
                      Contact
                    </a>
                  </div>
                )}
              </div>

              {/* Follow Us Dropdown */}
              <div className="w-full">
                <p className="border border-orange-500 cursor-pointer flex font-semibold justify-between items-center p-3 rounded-md text-md" onClick={() => setIsFollowUsOpen(!isFollowUsOpen)}>
                  Follow Us
                  <span>
                    {isFollowUsOpen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                        <path
                          fill-rule="evenodd"
                          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
                        />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768z" />
                      </svg>
                    )}
                  </span>
                </p>
                {isFollowUsOpen && (
                  <div className="flex items-center py-5 space-x-3 text-sm">
                    <a href="https://www.instagram.com/benerin.motor/" className="duration-300 hover:bg-orange-700 hover:p-3 hover:rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                      </svg>
                    </a>
                    <a href="/" className="duration-300 hover:bg-orange-700 hover:p-3 hover:rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                      </svg>
                    </a>
                    <a href="/" className="duration-300 hover:bg-orange-700 hover:p-3 hover:rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Part Kanan */}
          <div className="flex items-center justify-center w-full lg:w-1/2">
            <img src="../general/cartoonmontir.png" alt="cartoonmontir.png" width={250} />
          </div>
        </div>

        {/* Row - 3 */}
        <div className="bg-slate-800 flex font-raleway items-center justify-center py-5 text-white tracking-wider w-full">
          <p>&copy;{currentYear} Benerin Motor. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
