/* ========== Library ========== */
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

/* ========== User ========== */
// Landing
import Home from "./user/landing/pages/Home";
import Login from "./user/landing/pages/Login";
import Register from "./user/landing/pages/Register";

// Shop
import Shop from "./user/shop/pages/Shop";
import Product from "./user/shop/components/products/Product";

import Setting from "./user/shop/components/settings/Setting";
import EditProfile from "./user/shop/components/settings/EditProfile";
// import DeleteAccount from "./user/shop/components/settings/DeleteAccount";
// import Help from "./user/shop/components/settings/Help";
// import StatusAccount from "./user/shop/components/settings/StatusAccount";

import Cart from "./user/shop/components/carts/Cart";

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup className="page-wrapper">
      <CSSTransition
        key={location.pathname}
        timeout={500}
        classNames="fade"
        onEnter={() => {
          document.querySelector(".page-wrapper").style.overflow = "hidden";
        }}
        onExited={() => {
          document.querySelector(".page-wrapper").style.overflow = "auto";
        }}
      >
        <div className="page-content">
          <Routes location={location}>
            {/* ========== User ========== */}
            {/* Landing */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Shop */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />

            {/* => Setting */}
            <Route path="/setting" element={<Setting />} />
            <Route path="edit-profile" element={<EditProfile />} />
            {/* <Route path="delete-account" element={<DeleteAccount />} />
            <Route path="help" element={<Help />} />
            <Route path="account-status" element={<StatusAccount />} /> */}
          </Routes>
        </div>
      </CSSTransition>

      <div className="overlay"></div>
    </TransitionGroup>
  );
}

export default App;
