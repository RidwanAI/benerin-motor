import React, { useState } from "react";
import { MdApps } from "react-icons/md";

const NavbarComponent = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="bg-slate-50 flex flex-wrap fixed items-center justify-center mx-auto py-2 shadow-sm w-full z-50">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        {/* Logo - Benerin Motor */}
        <div className="flex items-center justify-between relative mx-3 w-full lg:block lg:justify-start lg:mx-0 lg:static lg:w-auto">
          <div className="flex font-semibold gap-2 leading-relaxed text-2xl whitespace-nowrap md:text-3xl">
            <img src="/public/logo-benerinmotor.png" alt="logo-benerinmotor" width={50} />
            <span className="my-auto text-xl">
              BENERIN <span className="text-green-600 text-2xl">MOTOR</span>
            </span>
          </div>
          <button className="my-auto rounded-lg hover:bg-slate-200 lg:hidden" type="button" onClick={() => setNavbarOpen(!navbarOpen)}>
            <MdApps />
          </button>
        </div>

        {/* SubLink */}
        <div className={"flex flex-col gap-3 items-center justify-center mx-auto lg:flex lg:flex-row lg:flex-grow lg:gap-0 lg:justify-between" + (navbarOpen ? " flex" : " hidden")} id="example-navbar-danger">
          <div className="flex items-center justify-center lg:mx-auto">
            <ul className="flex flex-col gap-2 font-semibold items-center justify-center list-none text-md lg:flex-row lg:gap-0 lg:items-center">
              <li>
                <a href="#home" className="duration-300 flex justify-center px-2 rounded-xl tracking-widest hover:bg-slate-200">
                  HOME
                </a>
              </li>
              <li>
                <a href="#order" className="duration-300 flex justify-center px-2 rounded-xl tracking-widest hover:bg-slate-200">
                  ORDER
                </a>
              </li>
              <li>
                <a href="#myservice" className="duration-300 flex justify-center px-2 rounded-xl tracking-widest hover:bg-slate-200">
                  MY-SERVICE
                </a>
              </li>
              <li>
                <a href="#contact" className="duration-300 flex justify-center px-2 rounded-xl tracking-widest hover:bg-slate-200">
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-row font-semibold gap-2 pb-2 text-md text-white lg:pb-0">
            <button
              type="button"
              className="bg-red-600 duration-300 ease-in-out px-8 py-1 rounded-full tracking-widest transition focus:outline-none focus-visible:ring focus-visible:ring-gray-400 focus-visible:ring-opacity-50 hover:bg-red-900 lg:px-6"
            >
              REGISTER
            </button>
            <button
              type="button"
              className="bg-blue-600 duration-300 ease-in-out px-8 py-1 rounded-full tracking-widest transition focus:outline-none focus-visible:ring focus-visible:ring-gray-400 focus-visible:ring-opacity-50 hover:bg-blue-900 lg:px-6"
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
