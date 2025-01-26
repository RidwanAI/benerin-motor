import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

/* Admin */
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminOverview from "./admin/components/AdminOverview";
import AdminProducts from "./admin/components/AdminProducts";
import AdminCustomers from "./admin/components/AdminCustomers";
import AdminOrders from "./admin/components/AdminOrders";
import AdminSettings from "./admin/components/AdminSettings";

/* User */
// Landing Page
import Home from "./user/landing/pages/Home";
import Contact from "./user/landing/pages/Contact";
import Login from "./user/landing/pages/Login";
import Register from "./user/landing/pages/Register";

// Shop
import Shop from "./user/shop/pages/Shop";
import Products from "./user/shop/components/products/Products";
import ProductDetail from "./user/shop/components/products/ProductDetail";
import Carts from "./user/shop/components/carts/Carts";
import Settings from "./user/shop/components/settings/Settings";
import Orders from "./user/shop/components/orders/Orders";

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
            {/* ========== Admin ========== */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/dashboard/overview"
              element={<AdminOverview />}
            />
            <Route
              path="/admin/dashboard/products"
              element={<AdminProducts />}
            />
            <Route
              path="/admin/dashboard/customers"
              element={<AdminCustomers />}
            />
            <Route path="/admin/dashboard/orders" element={<AdminOrders />} />
            <Route
              path="/admin/dashboard/settings"
              element={<AdminSettings />}
            />

            {/* ========== User ========== */}
            {/* Landing */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Shop */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/carts" element={<Carts />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </CSSTransition>

      <div className="overlay"></div>
    </TransitionGroup>
  );
}

export default App;
