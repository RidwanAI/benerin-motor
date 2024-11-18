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
import SettingAccount from "./user/shop/components/settings/SettingAccount";
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
            <Route path="/setting" element={<SettingAccount />} />
          </Routes>
        </div>
      </CSSTransition>

      <div className="overlay"></div>
    </TransitionGroup>
  );
}

export default App;
