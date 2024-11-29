import React, { useState } from "react";

const Cart = () => {
  // List => Cart Products
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Honda Product 1", price: "Rp.100.000", description: "Description product", category: "Honda", quantity: 1, image: "./product/new/shockdbs-aerox.png" },
    { id: 2, name: "Honda Product 2", price: "Rp.200.000", description: "Description product", category: "Honda", quantity: 1, image: "./product/new/kampasganda-aerox.png" },
    { id: 3, name: "Honda Product 3", price: "Rp.300.000", description: "Description product", category: "Honda", quantity: 1, image: "./product/new/shockbreaker-aerox.png" },
    { id: 4, name: "Honda Product 4", price: "Rp.400.000", description: "Description product", category: "Honda", quantity: 1, image: "./product/new/velgvnd-aerox.png" },
    { id: 5, name: "Yamaha Product 5", price: "Rp.500.000", description: "Description product", category: "Yamaha", quantity: 1, image: "./product/new/filtertdr-aerox.png" },
    { id: 6, name: "Yamaha Product 6", price: "Rp.600.000", description: "Description product", category: "Yamaha", quantity: 1, image: "./product/second/shockfushimaya-beat.png" },
    { id: 7, name: "Yamaha Product 7", price: "Rp.700.000", description: "Description product", category: "Yamaha", quantity: 1, image: "./product/second/shockfushimaya-beat.png" },
    { id: 8, name: "Yamaha Product 8", price: "Rp.800.000", description: "Description product", category: "Yamaha", quantity: 1, image: "./product/new/velgvnd-aerox.png" },
    { id: 9, name: "Suzuki Product 9", price: "Rp.900.000", description: "Description product", category: "Suzuki", quantity: 1, image: "./product/new/filtertdr-aerox.png" },
    { id: 10, name: "Suzuki Product 10", price: "Rp.1.000.000", description: "Description product", category: "Suzuki", quantity: 1, image: "./product/second/shockfushimaya-beat.png" },
    { id: 11, name: "Suzuki Product 11", price: "Rp.1.100.000", description: "Description product", category: "Suzuki", quantity: 1, image: "./product/second/shockfushimaya-beat.png" },
    { id: 12, name: "Suzuki Product 12", price: "Rp.1.200.000", description: "Description product", category: "Suzuki", quantity: 1, image: "./product/second/shockfushimaya-beat.png" },
  ]);

  // Function => Select Product
  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Function => Calculate Total
  const [selectedItems, setSelectedItems] = useState([]);
  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => {
        const priceValue = parseInt(item.price.replace(/[^\d]/g, ""));
        return total + priceValue * item.quantity;
      }, 0);
  };

  // Function => Category Product
  const [selectedCategory, setSelectedCategory] = useState("Honda");

  // Function => Quantity Product
  const increaseQuantity = (id) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) => prev.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)));
  };

  // Function => Delete Product
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Function => Modal / Pop Up
  const [popupItem, setPopupItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = (item) => {
    setPopupItem(item);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Function => Proceed Payment
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const proceedToPayment = () => {
    setShowPopup(false);
    setShowPaymentPopup(true);
  };

  const closePaymentPopup = () => {
    setShowPaymentPopup(false);
  };

  // Function => Status Order Detail Product
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderStatus, setOrderStatus] = useState([]);

  const handlePlaceOrder = () => {
    const orderDetails = cartItems
      .filter((item) => selectedItems.includes(item.id))
      .map((item) => ({
        ...item,
        virtualAccount: `VA${Math.floor(1000000000 + Math.random() * 9000000000)}`, // Generate nomor VA
        status: "Waiting Payment",
      }));

    setOrderStatus(orderDetails);
    setShowOrderPopup(true);
    setShowPaymentPopup(false);
  };

  return (
    <div className="flex flex-col font-poppins">
      {/* Part => Cart */}
      <div className="flex-1">
        {/* Part => Header */}
        <div className="bg-white flex items-center justify-between p-3 sticky top-0 z-10">
          <p className="font-semibold text-xl md:text-2xl">Cart</p>
        </div>

        {/* Part => Category Product */}
        <div className="bg-white flex gap-2 overflow-x-auto p-3 sticky top-0 whitespace-nowrap z-10">
          <button onClick={() => setSelectedCategory("Honda")} className={`px-3 py-1.5 rounded-md md:px-5 md:py-1.5 ${selectedCategory === "Honda" ? "bg-orange-500 text-white underline" : "bg-slate-100"}`}>
            Honda
          </button>
          <button onClick={() => setSelectedCategory("Yamaha")} className={`px-3 py-1.5 rounded-md md:px-5 md:py-1.5 ${selectedCategory === "Yamaha" ? "bg-orange-500 text-white underline" : "bg-slate-100"}`}>
            Yamaha
          </button>
          <button onClick={() => setSelectedCategory("Suzuki")} className={`px-3 py-1.5 rounded-md md:px-5 md:py-1.5 ${selectedCategory === "Suzuki" ? "bg-orange-500 text-white underline" : "bg-slate-100"}`}>
            Suzuki
          </button>
        </div>

        {/* Part => Cart Items */}
        <div className="p-3 space-y-3">
          {cartItems
            .filter((item) => item.category === selectedCategory)
            .map((item) => (
              <div key={item.id} className="bg-white flex flex-col gap-2 p-3">
                {/* Cart Item */}
                <div className="flex items-center space-x-2">
                  {/* Part 1 */}
                  <div className="flex gap-2 items-center">
                    <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleSelectItem(item.id)} className="ml-4" />
                    <img src={item.image} alt={item.name} className="cursor-pointer h-24 object-cover rounded-sm w-24" onClick={() => openPopup(item)} />
                  </div>

                  {/* Part 2 */}
                  <div className="flex flex-col space-y-3 w-1/2">
                    <div className="flex flex-col truncate w-auto">
                      <p className="font-semibold text-md">{item.name}</p>
                      <p className="text-xs md:text-sm text-slate-500">{item.price}</p>
                      <p className="text-xs md:text-sm text-slate-500">{item.description}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button onClick={() => decreaseQuantity(item.id)} className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash-fill" viewBox="0 0 16 16">
                          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1" />
                        </svg>
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)} className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Button => Remove Cart Item */}
                <button onClick={() => removeItem(item.id)} className="duration-300 flex items-center justify-center text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            ))}

          {/* Button => Checkout */}
          <div className="bg-white flex items-center justify-between p-3 rounded-sm">
            <p className="font-semibold text-md md:text-xl">Total : Rp.{calculateTotal().toLocaleString()}</p>
            <button onClick={proceedToPayment} className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5">
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Part => Pop Up Detail Product */}
      {showPopup && popupItem && (
        <div className="bg-black bg-opacity-50 fixed flex inset-0 items-center justify-center px-3 z-10">
          <div className="bg-white p-3 rounded-md space-y-3 w-full md:w-2/4">
            <img src={popupItem.image} alt={popupItem.name} className="h-40 object-cover rounded-md w-full" />

            {/* Description */}
            <div className="bg-slate-100 p-3 rounded-sm text-slate-500">
              <p className="font-semibold text-xl md:text-2xl">{popupItem.name}</p>
              <p className="font-semibold text-md">{popupItem.price}</p>
              <p className="text-sm">{popupItem.description}</p>
            </div>

            <div className="flex space-x-2">
              <button onClick={closePopup} className="bg-slate-300 duration-300 px-3 py-1.5 rounded-md w-full hover:bg-slate-500 md:px-5 md:py-1.5">
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedItems([popupItem.id]);
                  proceedToPayment();
                }}
                className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white w-full hover:bg-orange-700 md:px-5 md:py-1.5"
              >
                Proceed To Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Part => Pop Up Detail Payment */}
      {showPaymentPopup && (
        <div className="bg-black bg-opacity-50 fixed flex inset-0 items-center justify-center px-3 z-10">
          <div className="h-96 overflow-hidden overflow-y-auto w-full md:w-2/4">
            <div className="bg-white p-3 rounded-md space-y-3">
              <p className="font-semibold text-xl md:text-2xl">Payment</p>
              <hr className="w-full" />
              {/* Part => Payment Method */}
              <div className="space-y-2">
                <label className="block font-semibold text-md">Payment Method</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-2 border rounded-md">
                  <option value="">Select Payment Method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </div>

              {/* Part => Delivery Method */}
              <div className="space-y-2">
                <label className="block font-semibold text-md">Delivery Method</label>
                <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)} className="w-full p-2 border rounded-md">
                  <option value="">Select Delivery Method</option>
                  <option value="Standard">Standard</option>
                  <option value="Express">Express</option>
                </select>
              </div>

              {/* Part => Address */}
              <div className="space-y-2">
                <label className="block font-semibold text-md">Customer Address</label>
                <textarea value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="w-full p-2 border rounded-md" placeholder="Enter your address" />
              </div>

              {/* Part => Cart Item */}
              <p className="text-sm text-slate-500">Select the items you want to pay for:</p>
              <div>
                {cartItems
                  .filter((item) => selectedItems.includes(item.id))
                  .map((item) => (
                    <li key={item.id} className="flex flex-col space-y-3 mt-3">
                      <span className="font-semibold text-md">{item.name}</span>
                      <div className="bg-slate-100 p-3 flex items-center justify-between text-md">
                        <span>{item.price}</span>
                        <span>Qty : {item.quantity}</span>
                        <span>Rp.{parseInt(item.price.replace(/[^\d]/g, "")) * item.quantity}</span>
                      </div>
                    </li>
                  ))}
              </div>

              {/* Part => Price Total Item */}
              <div className="flex items-center justify-between font-semibold text-md">
                <span>Total :</span>
                <span>Rp. {calculateTotal().toLocaleString()}</span>
              </div>

              {/* Button => Cancel & Pay Now */}
              <div className="flex items-center space-x-2">
                <button onClick={closePaymentPopup} className="bg-slate-300 duration-300 px-3 py-1.5 rounded-md w-full hover:bg-slate-500 md:px-5 md:py-1.5">
                  Cancel
                </button>
                <button onClick={handlePlaceOrder} className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white w-full hover:bg-orange-700 md:px-5 md:py-1.5">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Part => Pop Up Order Status */}
      {showOrderPopup && (
        <div className="bg-black bg-opacity-50 fixed flex inset-0 items-center justify-center px-3 z-10">
          <div className="h-96 overflow-y-auto w-full md:w-2/4">
            <div className="bg-white p-3 rounded-md space-y-3">
              {/* Header */}
              <p className="font-semibold text-xl md:text-2xl">Orders</p>

              {/* Order Items */}
              <div className="space-y-3">
                {orderStatus.map((item) => (
                  <div key={item.id} className="bg-slate-100 flex flex-col items-start p-3 rounded-sm space-y-3">
                    <p className="font-semibold text-md">{item.name}</p>
                    <div className="flex font-semibold items-start justify-between w-full">
                      <p className="text-sm text-slate-500">Qty : {item.quantity}</p>
                      <p className="text-sm text-slate-500">{item.price}</p>
                    </div>

                    <hr className="border-2 w-full" />

                    <div className="text-start">
                      <p className="font-semibold text-sm text-slate-500">
                        Virtual Account : <span className="text-slate-700">{item.virtualAccount}</span>
                      </p>
                      <p className="font-semibold text-sm text-slate-500">
                        Status : <span className="text-orange-500">{item.status}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-2">
                <button onClick={() => setShowOrderPopup(false)} className="bg-slate-300 duration-300 py-1.5 rounded-md w-full hover:bg-slate-500">
                  Close
                </button>
                <button onClick={() => (window.location.href = "/orderDetails")} className="bg-orange-500 duration-300 py-1.5 text-white rounded-md w-full hover:bg-orange-700">
                  Order Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
