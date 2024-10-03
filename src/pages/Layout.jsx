import React from "react";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";

const Layouts = ({ children }) => {
  return (
    <React.Fragment>
      <NavbarComponent />
      <div>
        <div className="container items-center justify-center mx-auto max-w-screen-xl">
          <main>{children}</main>
        </div>
      </div>
      <FooterComponent />
    </React.Fragment>
  );
};

export default Layouts;
