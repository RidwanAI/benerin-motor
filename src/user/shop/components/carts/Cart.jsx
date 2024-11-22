import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Shock DBS Aerox", price: "Rp.1.100.000", description: "High-performance shock absorber for a smoother ride", category: "new", quantity: 1, image: "./product/new/shockdbs-aerox.png" },
    { id: 2, name: "Kampas Ganda Aerox", price: "Rp.250.000", description: "Durable clutch pads for optimal performance", category: "new", quantity: 1, image: "./product/new/kampasganda-aerox.png" },
    { id: 3, name: "Shockbreaker Aerox", price: "Rp.1.700.000", description: "Advanced suspension system for superior comfort", category: "new", quantity: 1, image: "./product/new/shockbreaker-aerox.png" },
    { id: 4, name: "Velg VND Aerox", price: "Rp.900.000", description: "Lightweight alloy wheels for improved handling", category: "new", quantity: 1, image: "./product/new/velgvnd-aerox.png" },
    { id: 5, name: "Filter TDR Aerox", price: "Rp.145.000", description: "High-performance air filter for efficient airflow", category: "new", quantity: 1, image: "./product/new/filtertdr-aerox.png" },
    {
      id: 6,
      name: "Shock Fushimaya Beat FI/Karbu/Street",
      price: "Rp.850.000",
      description: "Shock absorber with exceptional strength for smoother rides",
      category: "second",
      quantity: 1,
      image: "./product/second/shockfushimaya-beat.png",
    },
    {
      id: 7,
      name: "Kampas Ganda Beat FI/Karbu/Street",
      price: "Rp.180.000",
      description: "Efficient clutch pads for consistent performance",
      category: "second",
      quantity: 1,
      image: "./product/second/kampasganda-beat.png",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupItem, setPopupItem] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("new");

  // Function to calculate the total price based on quantity
  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => {
        const priceValue = parseInt(item.price.replace(/[^\d]/g, ""));
        return total + priceValue * item.quantity;
      }, 0);
  };

  // Increase and decrease item quantity
  const increaseQuantity = (id) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) => prev.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle item selection for payment
  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Open detailed item popup
  const openPopup = (item) => {
    setPopupItem(item);
    setShowPopup(true);
  };

  // Close item details popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Proceed to payment with selected items
  const proceedToPayment = () => {
    setShowPaymentPopup(true);
  };

  // Close payment popup
  const closePaymentPopup = () => {
    setShowPaymentPopup(false);
  };

  return (
    <div className="bg-slate-900 flex flex-col font-poppins md:flex-row">
      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
          <p className="font-semibold text-slate-900 text-xl md:text-2xl">Cart</p>
          <p className="text-lg font-semibold">Total: Rp. {calculateTotal().toLocaleString()}</p>
        </div>

        {/* Category Selection */}
        <div className="bg-white flex gap-2 p-3 sticky top-0 z-10">
          <button onClick={() => setSelectedCategory("new")} className={`px-4 py-2 rounded-md ${selectedCategory === "new" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            New Products
          </button>
          <button onClick={() => setSelectedCategory("second")} className={`px-4 py-2 rounded-md ${selectedCategory === "second" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            Second Products
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-3 space-y-3">
          {cartItems
            .filter((item) => item.category === selectedCategory) // Filter by category
            .map((item) => (
              <div key={item.id} className="bg-white flex items-center justify-between p-4 rounded-sm shadow-sm space-x-3">
                {/* Image Product */}
                <div className="flex items-start gap-2 w-1/2">
                  <img src={item.image} alt={item.name} className="cursor-pointer h-24 object-cover rounded-sm w-24" onClick={() => openPopup(item)} />
                  <div className="flex flex-col">
                    <p className="font-semibold text-md">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.price}</p>
                  </div>
                </div>

                {/* Quantity, Remove, and Checkbox */}
                <div className="flex flex-col gap-2 items-end w-1/2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="bg-slate-200 px-3 py-1.5 rounded-sm md:px-5 md:py-1.5">
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="bg-slate-200 px-3 py-1.5 rounded-sm md:px-5 md:py-1.5">
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-between space-x-2 md:justify-start">
                    <button onClick={() => removeItem(item.id)} className="text-red-600">
                      Remove
                    </button>
                    <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleSelectItem(item.id)} className="ml-4" />
                  </div>
                </div>
              </div>
            ))}
          <div className="flex w-full">
            <button onClick={proceedToPayment} className="bg-blue-500 text-white px-3 py-1.5 rounded-md w-full md:px-5 md:py-1.5">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Popup for item details */}
      {showPopup && popupItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-80 space-y-4">
            <img src={popupItem.image} alt={popupItem.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-semibold">{popupItem.name}</h3>
            <p>{popupItem.description}</p>
            <div className="flex space-x-2">
              <button onClick={closePopup} className="bg-gray-200 px-4 py-2 rounded-full w-full">
                Close
              </button>
              <button
                onClick={() => {
                  setShowPaymentPopup(true);
                  setSelectedItems([popupItem.id]);
                }} // Trigger payment for this specific item
                className="bg-blue-500 text-white px-4 py-2 rounded-full w-full"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-80 space-y-4">
            <h3 className="text-xl font-semibold">Payment</h3>
            <p className="text-sm">Select the items you want to pay for:</p>
            <ul>
              {cartItems
                .filter((item) => selectedItems.includes(item.id))
                .map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>Rp. {parseInt(item.price.replace(/[^\d]/g, "")) * item.quantity}</span>
                  </li>
                ))}
            </ul>

            {/* Total Price of Selected Items */}
            <div className="flex justify-between items-center font-semibold">
              <span>Total:</span>
              <span>Rp. {calculateTotal().toLocaleString()}</span>
            </div>

            <button onClick={closePaymentPopup} className="bg-blue-500 text-white px-4 py-2 rounded-full w-full">
              Pay Now
            </button>
            <button onClick={closePaymentPopup} className="bg-gray-200 px-4 py-2 rounded-full w-full">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
