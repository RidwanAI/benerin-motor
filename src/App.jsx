import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import HomePage from "./user/HomePage";
import LoginPage from "./user/LoginPage";
import RegisterPage from "./user/RegisterPage";

// Products
import Landing from "./user/usercomponents/homes/Landing";
import ProductsPage from "./user/ProductsPage";
import Order from "./user/usercomponents/orders/Order";
import SettingAccount from "./user/usercomponents/settings/SettingAccount";

import BookingListPage from "./user/BookingListPage";
import ContactPage from "./user/ContactPage";

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
            {/* Admin */}

            {/* User */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Products */}
            <Route path="/home" element={<Landing />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/settings" element={<SettingAccount />} />

            <Route path="/products" element={<ProductsPage />} />
            <Route path="/bookingList" element={<BookingListPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </CSSTransition>

      <div className="overlay"></div>
    </TransitionGroup>
  );
}

export default App;
