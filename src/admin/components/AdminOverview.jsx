/* Library / Package / File  */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/adminService";

const AdminOverview = () => {
  /* Function -> Navigate URL */
  const navigate = useNavigate();

  /* Function Shop -> Count Products, Customers, Orders */
  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, customers, orders] = await Promise.all([adminService.getProducts(), adminService.getUsers(), adminService.getOrders()]);
        setProductCount(products.length);
        setCustomerCount(customers.length);
        setOrderCount(orders.length);
      } catch (err) {
        setError("Failed to Fetch Data!");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Service Motor
  const bookingListServiceMotor = 0;
  const customersServiceMotor = 0;

  return (
    <div className="bg-slate-100 flex font-poppins min-h-screen">
      <div className="flex-1 space-y-3">
        {/* Header */}
        <div className="bg-slate-100 flex items-center p-3 shadow-sm sticky top-0 z-30">
          <p className="font-bold text-2xl">Overview</p>
        </div>

        {/* Main Content */}
        <main className="px-3 pb-3 space-y-6">
          {/* Content -> Shop */}
          <div className="space-y-3">
            {/* Title */}
            <div className="flex items-center">
              <p className="text-xl font-bold">Shop</p>
            </div>

            {/* List Card*/}
            <div className="gap-3 grid grid-cols-2 w-auto lg:grid-cols-4">
              {/* Card -> Product */}
              <button onClick={() => navigate("/admin/dashboard/products")} className="bg-white duration-300 flex flex-col rounded-sm p-3 shadow-sm space-y-3 transition-transform transform hover:scale-95 hover:shadow-lg">
                <div className="flex flex-col gap-3 items-center justify-center w-full md:flex-row md:justify-start">
                  <div className="bg-orange-500 flex items-center h-12 justify-center rounded-full w-12 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart3 text-white" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <p className="font-bold text-slate-700 text-2xl">{productCount}</p>
                    <p className="text-slate-700 text-sm">Products Data</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <hr className="w-full" />
                  <p className="text-slate-700 text-sm leading-relaxed">Track and manage all product data in the system. This includes inventory levels, product details, and more to keep your store up-to-date.</p>
                </div>
              </button>

              {/* Card -> Customer */}
              <button onClick={() => navigate("/admin/dashboard/customers")} className="bg-white duration-300 flex flex-col rounded-sm p-3 shadow-sm space-y-3 transition-transform transform hover:scale-95 hover:shadow-lg">
                <div className="flex flex-col gap-3 items-center justify-center w-full md:flex-row md:justify-start">
                  <div className="bg-orange-500 flex items-center h-12 justify-center rounded-full w-12 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people text-white" viewBox="0 0 16 16">
                      <path d="M5.5 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zM11 5.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm1 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zM7.5 14s-1 0-1-1 1-3 4.5-3 4.5 2 4.5 3-1 1-1 1H7.5zm-2.5-1c0-.668.97-1.987 3.5-2-2.09-.3-5.5.134-5.5 2 0 .533.36 1 .5 1h2.5zm2.5-6.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <p className="font-bold text-slate-700 text-2xl">{customerCount}</p>
                    <p className="text-slate-700 text-sm">Customers Data</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <hr className="w-full" />
                  <p className="text-slate-700 text-sm leading-relaxed"> Manage all customer data including personal information, purchasing history, and more to enhance customer relationships and business growth.</p>
                </div>
              </button>

              {/* Card -> Order */}
              <button onClick={() => navigate("/admin/dashboard/orders")} className="bg-white duration-300 flex flex-col rounded-sm p-3 shadow-sm space-y-3 transition-transform transform hover:scale-95 hover:shadow-lg">
                <div className="flex flex-col gap-3 items-center justify-center w-full md:flex-row md:justify-start">
                  <div className="bg-orange-500 flex items-center h-12 justify-center rounded-full w-12 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-receipt text-white" viewBox="0 0 16 16">
                      <path d="M8.5 2.5v11l-2-2-2 2V2.5L6.5 4l2-1.5zm0-.5 2 1.5 2-1.5v11l-2-2-2 2V2z" />
                      <path d="M3 3h10v2H3V3zm0 3h10v2H3V6zm0 3h10v2H3V9z" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <p className="font-bold text-slate-700 text-2xl">{orderCount}</p>
                    <p className="text-slate-700 text-sm">Orders Data</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <hr className="w-full" />
                  <p className="text-slate-700 text-sm leading-relaxed">Monitor and manage all customer orders, including order status, payment details, and delivery tracking to streamline operations.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Content -> Service Motor */}
          <div className="space-y-3">
            {/* Title */}
            <div className="flex items-center">
              <p className="text-xl font-bold">Service Motor</p>
            </div>

            {/* List Card */}
            <div className="gap-3 grid grid-cols-2 w-auto lg:grid-cols-4">
              {/* Card -> Booking List */}
              <button onClick={() => navigate("/admin/dashboard")} className="bg-white duration-300 flex flex-col rounded-sm p-3 shadow-sm space-y-3 transition-transform transform hover:scale-95 hover:shadow-lg">
                <div className="flex flex-col gap-3 items-center justify-center w-full md:flex-row md:justify-start">
                  <div className="bg-orange-500 flex items-center h-12 justify-center rounded-full w-12 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar-check text-white" viewBox="0 0 16 16">
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm11.854 2.646a.5.5 0 1 0-.708-.708L9 8.793 7.854 7.646a.5.5 0 0 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l4-4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <p className="font-bold text-slate-700 text-2xl">{bookingListServiceMotor}</p>
                    <p className="text-slate-700 text-sm">Booking List Data</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <hr className="w-full" />
                  <p className="text-slate-700 text-sm leading-relaxed">Track and manage all booking details, including schedules, customer requests, and confirmations to ensure seamless operations.</p>
                </div>
              </button>

              {/* Card - Customer */}
              <button onClick={() => navigate("/admin/dashboard")} className="bg-white duration-300 flex flex-col rounded-sm p-3 shadow-sm space-y-3 transition-transform transform hover:scale-95 hover:shadow-lg">
                <div className="flex flex-col gap-3 items-center justify-center w-full md:flex-row md:justify-start">
                  <div className="bg-orange-500 flex items-center h-12 justify-center rounded-full w-12 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people text-white" viewBox="0 0 16 16">
                      <path d="M5.5 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zM11 5.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm1 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zM7.5 14s-1 0-1-1 1-3 4.5-3 4.5 2 4.5 3-1 1-1 1H7.5zm-2.5-1c0-.668.97-1.987 3.5-2-2.09-.3-5.5.134-5.5 2 0 .533.36 1 .5 1h2.5zm2.5-6.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <p className="font-bold text-slate-700 text-2xl">{customersServiceMotor}</p>
                    <p className="text-slate-700 text-sm">Customers Data</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <hr className="w-full" />
                  <p className="text-slate-700 text-sm leading-relaxed"> Manage all customer data including personal information, purchasing history, and more to enhance customer relationships and business growth.</p>
                </div>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminOverview;
