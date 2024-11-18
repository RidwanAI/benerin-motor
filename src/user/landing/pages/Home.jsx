// Library
import React, { useState } from "react";
import { Link } from "react-router-dom";

/* ========== [ Landing ] => Components ========== */
import AutoScroll from "../components/generals/AutoScroll";
import ConstPortfolio from "../components/generals/ConstPortfolio";
import Testimoni from "../components/generals/Testimoni";
import OpeningApp from "../components/generals/OpeningApp";

import ServiceBesar from "../components/services/ServiceBesar";
import ServiceGantiOli from "../components/services/ServiceGantiOli";
import ServiceKecil from "../components/services/ServiceKecil";
import ServiceSparePart from "../components/services/ServiceSparePart";
import ServiceTuneUp from "../components/services/ServiceTuneUp";

/* ========== [ Landing ] => Pages ========== */
import Layout from "./Layout";

const Home = () => {
  // Set Active => Service Benerin Motor
  const [services, setService] = useState("srb");
  const renderService = () => {
    if (services === "srb") {
      return <ServiceBesar />;
    } else if (services === "srb") {
      return <ServiceBesar />;
    } else if (services === "srk") {
      return <ServiceKecil />;
    } else if (services === "tu") {
      return <ServiceTuneUp />;
    } else if (services === "go") {
      return <ServiceGantiOli />;
    } else if (services === "sp") {
      return <ServiceSparePart />;
    }
  };

  // Add => Testimoni
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimoni, setTestimoni] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTestimoni(""); // Reset input saat modal ditutup
  };

  const handleSubmitTestimoni = () => {
    console.log("New Testimoni:", testimoni);
    handleCloseModal();
  };

  return (
    <Layout>
      <AutoScroll />
      <OpeningApp />
      {/* Home */}
      <section id="home" className="font-poppins text-white ">
        <div className="bg-home">
          <div className="flex flex-col gap-4 items-center justify-center max-w-7xl min-h-screen mx-auto px-3 w-full md:px-7">
            {/* Header */}
            <div className="flex flex-col gap-4 items-start justify-center w-full">
              {/* Title */}
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-4xl md:text-6xl">
                  Benerin <span className="text-orange-500">Motor</span>
                </p>
                <p className="text-xl md:text-2xl">Bengkel Motor Andalan, Solusi Kendaraan Prima!</p>
              </div>
              {/* End - Title */}

              {/* Button Get Started */}
              <div className="flex gap-4">
                <Link to={"/login"} className="bg-orange-500 flex items-center gap-2 duration-300 px-3 py-1 rounded-md md:px-7 md:py-2 hover:bg-orange-700 hover:translate-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-right-circle-fill" viewBox="0 0 16 16">
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768z" />
                  </svg>
                  Get Started
                </Link>
              </div>
              {/* End - Button Get Started */}

              {/* Social Media */}
              <div className="flex items-center gap-4">
                <p className="text-sm">~ Social Media ~</p>
                <a href="https://www.instagram.com/benerin.motor/" className="duration-300 hover:bg-orange-700 hover:p-3 hover:rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg>
                </a>
                <a href="/" className="duration-300 hover:bg-orange-700 hover:p-3 hover:rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                  </svg>
                </a>
                <a href="/" className="duration-300 hover:bg-orange-700 hover:p-3 hover:rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                  </svg>
                </a>
              </div>
              {/* End - Social Media */}
            </div>
            {/* End - Header */}

            <hr className="border-2 w-full" />

            {/* Links Menu */}
            <div className="flex flex-wrap gap-2 items-center justify-center w-full">
              <Link to={"/shop"} className="border border-orange-500 flex items-center gap-2 duration-300 px-3 py-1 rounded-md text-sm md:px-5 md:py-1.5 hover:bg-orange-700 hover:translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                Shop
              </Link>
              <Link to={"/"} className="border border-orange-500 flex items-center gap-2 duration-300 px-3 py-1 rounded-md text-sm md:px-5 md:py-1.5 hover:bg-orange-700 hover:translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                </svg>
                Booking List
              </Link>
              <Link to={"/"} className="border border-orange-500 flex items-center gap-2 duration-300 px-3 py-1 rounded-md text-sm md:px-5 md:py-1.5 hover:bg-orange-700 hover:translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
                FAQ
              </Link>
              <Link to={"/"} className="border border-orange-500 flex items-center gap-2 duration-300 px-3 py-1 rounded-md text-sm md:px-5 md:py-1.5 hover:bg-orange-700 hover:translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                  <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                </svg>
                Testimonial
              </Link>
            </div>
            {/* End - Links Menu */}
          </div>
        </div>
      </section>
      {/* End - Home */}

      {/* About */}
      <section id="about" className="font-poppins text-white ">
        <div className="bg-slate-900">
          <div className="flex flex-col gap-10 items-center justify-center max-w-7xl mx-auto px-3 py-20 w-full md:px-7">
            {/* About */}
            <div className="border border-orange-500 p-3 rounded-md space-y-1 text-justify">
              <p className="font-bold text-2xl">
                What is Benerin <span className="text-orange-500">Motor</span> ?
              </p>
              <p>
                Benerin Motor menyediakan layanan perbaikan dan pemeliharaan sepeda motor yang profesional, cepat, dan berkualitas tinggi. Dengan dukungan teknisi berpengalaman, kami siap menangani berbagai kebutuhan motor Anda—dari
                perawatan rutin hingga perbaikan mendalam. Selain itu, kami menyediakan beragam pilihan spare part berkualitas, baik baru maupun second, yang dapat diandalkan untuk menjaga performa kendaraan Anda. Fokus utama kami adalah
                memberikan layanan terbaik dengan harga bersahabat, mengutamakan kepuasan pelanggan, dan memastikan motor Anda selalu dalam kondisi optimal. Percayakan perawatan motor Anda kepada Benerin Motor, dan rasakan pengalaman
                berkendara yang aman dan nyaman setiap saat.
              </p>
            </div>

            {/* Dashboard */}
            <div className="flex flex-col font-semibold gap-4 items-center justify-between rounded-md text-center w-full md:flex-row">
              <div className="bg-orange-500 flex items-center justify-between py-2 px-4 rounded-md w-full md:flex-col">
                <p>Founded On The Date</p>
                <p className="flex items-center gap-2">
                  <ConstPortfolio target={10} duration={1500} />
                </p>
              </div>
              <div className="bg-orange-500 flex items-center justify-between py-2 px-4 rounded-md w-full md:flex-col">
                <p>Founded On The Month</p>
                <p className="flex items-center gap-2">
                  <ConstPortfolio target={6} duration={1500} />
                </p>
              </div>
              <div className="bg-orange-500 flex items-center justify-between py-2 px-4 rounded-md w-full md:flex-col">
                <p>Founded On The Year</p>
                <p className="flex items-center gap-2">
                  <ConstPortfolio target={2021} duration={1500} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End - About */}

      {/* Service */}
      <section id="service" className="font-poppins text-white  w-full">
        <div className="bg-slate-900">
          <div className="flex flex-col gap-10 items-center justify-center max-w-7xl mx-auto px-3 py-20 w-full md:px-7">
            {/* Title */}
            <div className="flex flex-col items-center justify-center md:items-end md:justify-end md:text-end">
              <p className="font-semibold text-xl md:text-2xl">
                Our Services, Benerin <span className="text-orange-500">Motor</span>
              </p>
            </div>
            {/* End - Title */}

            {/* Services Item */}
            <div className="flex flex-col items-start justify-center gap-10 rounded-md shadow-lg w-full md:gap-4 md:flex-row">
              <div className="border border-orange-500 flex flex-col items-center justify-center rounded-md w-full md:w-72">
                <Link
                  to={"#!"}
                  onClick={() => setService("srb")}
                  className={`${
                    services === "srb" ? "active bg-orange-500 flex italic items-center justify-center text-center text-white" : "duration-300 flex items-center justify-center text-center hover:text-white hover:bg-orange-700"
                  } px-2 py-2 w-full `}
                >
                  Service Rutin ~ Besar
                </Link>
                <Link
                  to={"#!"}
                  onClick={() => setService("srk")}
                  className={`${
                    services === "srk" ? "active bg-orange-500 flex italic items-center justify-center text-center text-white" : "duration-300 flex items-center justify-center text-center hover:text-white hover:bg-orange-700"
                  } px-2 py-2 w-full`}
                >
                  Service Rutin ~ Kecil
                </Link>
                <Link
                  to={"#!"}
                  onClick={() => setService("tu")}
                  className={`${
                    services === "tu" ? "active bg-orange-500 flex italic items-center justify-center text-center text-white" : "duration-300 flex items-center justify-center text-center hover:text-white hover:bg-orange-700"
                  } px-2 py-2 w-full`}
                >
                  Tune Up
                </Link>
                <Link
                  to={"#!"}
                  onClick={() => setService("go")}
                  className={`${
                    services === "go" ? "active bg-orange-500 flex italic items-center justify-center text-center text-white" : "duration-300 flex items-center justify-center text-center hover:text-white hover:bg-orange-700"
                  } px-2 py-2 w-full`}
                >
                  Ganti Oli
                </Link>
                <Link
                  to={"#!"}
                  onClick={() => setService("sp")}
                  className={`${
                    services === "sp" ? "active bg-orange-500 flex italic items-center justify-center text-center text-white" : "duration-300 flex items-center justify-center text-center hover:text-white hover:bg-orange-700"
                  } px-2 py-2 w-full`}
                >
                  Spare Part
                </Link>
              </div>

              {/* Description Service */}
              <div className="bg-orange-500 flex items-center justify-start p-5 rounded-md w-full md:w-3/4">
                <main>{renderService()}</main>
              </div>
            </div>
            {/* End - Service Item */}

            {/* Review */}
            <div className="flex gap-4 items-start justify-center w-full">
              {/* Title */}
              <div className="flex flex-col gap-2 items-start justify-center w-full md:w-1/2">
                <p className="font-semibold text-xl md:text-2xl">
                  Testimoni Benerin <span className="text-orange-500">Motor</span>
                </p>
                <p>Masih ragu pelayanan kami? Jangan khawatir, cepat perbaiki motor kalian di Benerin Motor!</p>
                <hr className="border border-orange-500 w-full" />
                <div className="flex gap-2 text-sm">
                  <a href="https://wa.me/6289515996476?text=Halo%2C+saya+ingin+berkonsultasi.+Terimakasih" className="duration-300 hover:text-orange-700">
                    <div className="flex gap-2 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                      </svg>
                      Hubungi Kami!
                    </div>
                  </a>
                </div>
              </div>
              {/* End - Title */}

              {/* Testimonial */}
              <div className="flex flex-col gap-4 items-center justify-center w-full md:w-1/2">
                <Testimoni />
                <div className="">
                  {/* Button to Open Modal */}
                  <Link onClick={handleOpenModal} className="border border-orange-500 bg-orange-500 duration-300 flex items-center gap-2 px-3 py-1 rounded-md md:px-5 md:py-1.5 hover:bg-orange-700 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    Add Testimoni
                  </Link>

                  {/* Modal Dialog */}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center px-3 z-50 md:px-7">
                      <div className="bg-slate-800 rounded-lg p-5 w-full md:w-1/2">
                        <h3 className="text-xl font-semibold mb-3">Add Testimoni</h3>
                        <textarea
                          value={testimoni}
                          onChange={(e) => setTestimoni(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg p-2 mb-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                          rows="4"
                          placeholder="Write your testimoni here..."
                        ></textarea>
                        <div className="flex justify-end space-x-3">
                          <button onClick={handleCloseModal} className="bg-white duration-300 px-3 py-1 rounded-md text-black md:px-5 md:py-1.5 hover:bg-gray-200">
                            Cancel
                          </button>
                          <button onClick={handleSubmitTestimoni} className="bg-orange-500 duration-300 px-3 py-1 rounded-md text-white md:px-5 md:py-1.5 hover:bg-orange-700">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* End - Review */}
          </div>
        </div>
      </section>
      {/* End - Service */}
    </Layout>
  );
};

export default Home;
