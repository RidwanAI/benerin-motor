import React, { useState } from "react";
import { Link } from "react-router-dom";

import Layout from "./Layout";

import AutoScrollComponent from "../components/AutoScrollComponent";
import ConstPortfolioComponent from "../components/ConstPortfolioComponent";
import TestimoniComponent from "../components/TestimoniComponent";
import OpeningApp from "../components/OpeningApp";

import ServiceBesar from "./service/ServiceBesar";
import ServiceGantiOli from "./service/ServiceGantiOli";
import ServiceKecil from "./service/ServiceKecil";
import ServiceSparePart from "./service/ServiceSparePart";
import ServiceTuneUp from "./service/ServiceTuneUp";

const HomePage = () => {
  // Set Active -> Service Benerin Motor
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

  return (
    <Layout>
      <AutoScrollComponent />
      <OpeningApp />
      {/* Section -Home */}
      <section id="home" className="font-poppins text-white tracking-wider">
        <div className="bg-home flex flex-col gap-4 items-start justify-center min-h-screen px-3 w-full md:px-7">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-4xl md:text-6xl">
              Benerin <span className="text-orange-500">Motor</span>
            </p>
            <p className="text-xl md:text-2xl">Bengkel Motor Andalan, Solusi Kendaraan Prima!</p>
          </div>

          {/* Button My Product & Booking List */}
          <div className="flex gap-4">
            <Link to={"/"} className="bg-orange-500 flex items-center gap-2 duration-300 px-3 py-1 rounded-full hover:bg-orange-700 hover:-translate-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              My Product
            </Link>
            <Link to={"/"} className="bg-orange-500 duration-300 px-3 py-1 rounded-full hover:bg-orange-700 hover:translate-x-1">
              Booking List
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-4">
            <p className="text-sm">~ Social Media ~</p>
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
      </section>

      {/* Section - About */}
      <section id="about" className="font-poppins text-white tracking-wider">
        <div className="bg-slate-900 flex flex-col gap-10 items-center justify-center px-3 py-24 w-full lg:px-7">
          {/* About */}
          <div className="border border-orange-500 p-3 rounded-md space-y-1 text-justify">
            <p className="font-bold text-2xl">
              What is Benerin <span className="text-orange-500">Motor</span> ?
            </p>
            <p>
              Benerin Motor menyediakan layanan perbaikan dan pemeliharaan sepeda motor yang profesional, cepat, dan berkualitas tinggi. Dengan dukungan teknisi berpengalaman, kami siap menangani berbagai kebutuhan motor Anda—dari perawatan
              rutin hingga perbaikan mendalam. Selain itu, kami menyediakan beragam pilihan spare part berkualitas, baik baru maupun second, yang dapat diandalkan untuk menjaga performa kendaraan Anda. Fokus utama kami adalah memberikan
              layanan terbaik dengan harga bersahabat, mengutamakan kepuasan pelanggan, dan memastikan motor Anda selalu dalam kondisi optimal. Percayakan perawatan motor Anda kepada Benerin Motor, dan rasakan pengalaman berkendara yang
              aman dan nyaman setiap saat.
            </p>
          </div>

          {/* Dashboard */}
          <div className="bg-orange-500 flex flex-col font-semibold gap-4 items-center justify-between px-3 py-5 rounded-md text-center w-full md:flex-row md:px-7">
            <div className="flex flex-col items-center justify-between w-full">
              <p>Founded On The Date</p>
              <p className="flex items-center gap-2">
                <ConstPortfolioComponent target={10} duration={1500} />
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <p>Founded On The Month</p>
              <p className="flex items-center gap-2">
                <ConstPortfolioComponent target={6} duration={1500} />
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <p>Founded On The Year</p>
              <p className="flex items-center gap-2">
                <ConstPortfolioComponent target={2021} duration={1500} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section - Service */}
      <section id="service" className="font-poppins text-white tracking-wider">
        <div className="bg-slate-900 flex flex-col gap-10 items-start justify-center max-w-7xl px-3 py-24 md:px-7">
          {/* Title */}
          <div className="flex flex-col items-center justify-center md:items-end md:justify-end md:text-end">
            <p className="font-bold text-2xl">
              Our Services, Benerin <span className="text-orange-500">Motor</span>
            </p>
          </div>

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

          {/* Testimoni */}
          <div className="flex gap-4 items-center justify-center w-full">
            <div className="flex flex-col gap-2 items-start justify-center w-full md:w-1/2">
              <p className="font-bold text-2xl">
                Testimoni Benerin <span className="text-orange-500">Motor</span>
              </p>
              <p>Masih ragu pelayanan kami? Jangan khawatir, cepat perbaiki motor kalian di Benerin Motor!</p>
              <hr className="border w-full" />
              <div className="flex gap-2 italic items-center text-sm">
                <p>
                  Layanan Konsultasi?{" "}
                  <a href="/" className="duration-300 hover:text-orange-700">
                    Admin
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full md:w-1/2">
              <TestimoniComponent />
              <Link to={"/"} className="border border-orange-500 bg-orange-500 duration-300 px-4 py-1 hover:bg-orange-700">
                Add Testimoni
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
