import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

const Layout = ({ children }) => {
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

export default Layout;
