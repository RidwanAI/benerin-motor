import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

/* User */
// Landing Page
import Home from "./user/landing/pages/Home";
import Login from "./user/landing/pages/Login";
import Register from "./user/landing/pages/Register";

// Shop
import Shop from "./user/shop/pages/Shop";
import Products from "./user/shop/components/products/Products";
import ProductDetail from "./user/shop/components/products/ProductDetail";
import Cart from "./user/shop/components/carts/Cart";
import Settings from "./user/shop/components/settings/Settings";

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
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </CSSTransition>

      <div className="overlay"></div>
    </TransitionGroup>
  );
}

export default App;
