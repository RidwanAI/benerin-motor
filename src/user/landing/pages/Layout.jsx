/* ========== Library ========== */
import React from "react";

/* ========== [ Landing ] => Components ========== */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container items-center justify-center mx-auto min-w-full">
        <main>{children}</main>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
