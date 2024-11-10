import React, { useState } from "react";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <footer id="contact">
      <div className="bg-slate-900 flex flex-col gap-10 font-poppins items-center justify-center px-3 py-24 text-white tracking-wider w-auto md:flex-row md:gap-0 lg:px-7">
        {/* Part Kiri */}
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="flex flex-col gap-4 items-start justify-start text-start w-full">
            {/* Title */}
            <p className="font-semibold text-2xl">
              Benerin <span className="text-orange-500">Motor</span>
            </p>

            {/* Alamat */}
            <div className="flex flex-col gap-2">
              <p className="text-sm">~ Alamat ~</p>
              <p>Pondok Ungu Permai Sektor V M6 No. 10, Kel. Bahagia, Kec. Babelan, Kab. Bekasi Utara, Jawa Barat.</p>
              <iframe
                className="rounded-md w-auto"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.91632929492297!2d107.01812375819513!3d-6.176080969305151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1731248935646!5m2!1sid!2sid"
                width="300"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Item Link */}
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Media Sosial */}
              <div className="flex flex-col gap-2 rounded-md w-auto">
                <p className="text-sm">~ Media Sosial ~</p>
                <div className="flex gap-4 items-center">
                  <a href="https://www.instagram.com/benerin.motor/" className="duration-300 hover:bg-orange-700 hover:p-3 hover:rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                  </a>
                  <Link to={"/"} className="duration-300 hover:bg-orange-700 hover:p-3 hover:rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                    </svg>
                  </Link>
                  <Link to={"/"} className="duration-300 hover:bg-orange-700 hover:p-3 hover:rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part Kanan */}
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <img src="../general/cartoonmontir.png" alt="cartoonmontir.png" width={250} />
        </div>
      </div>
      <div className="bg-slate-950 flex font-raleway items-center justify-center py-5 text-white tracking-wider">Copyright@Benerin Motor - 2024</div>
    </footer>
  );
};

export default FooterComponent;
