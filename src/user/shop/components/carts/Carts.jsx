import React, { useState, useEffect } from "react";
import axios from "axios";

const Carts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
    
        // Mengambil data pengguna dari endpoint /me
        const userResponse = await axios.get("http://localhost:5000/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
    
        const userId = userResponse.data.id;
    
        // Ambil data cart items milik pengguna dari /carts/user/:userId
        const response = await axios.get(`http://localhost:5000/carts/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
    
        setCartItems(response.data); // Set data ke state cartItems
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch cart items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    

    fetchCartItems();
  }, []);

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceValue = parseFloat(item.product.price.replace(/[^\d]/g, ""));
      return total + priceValue * item.quantity;
    }, 0);
  };

  const increaseQuantity = async (id) => {
    try {
      const item = cartItems.find((item) => item.id === id);
      const newQuantity = item.quantity + 1;
  
      // Update quantity di backend
      const response = await axios.put(
        `http://localhost:5000/carts/${id}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
  
      // Update state setelah berhasil di backend
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: response.data.quantity } : item
        )
      );
    } catch (err) {
      console.error("Failed to increase quantity.", err);
      setError("Failed to update quantity. Please try again later.");
    }
  };
  
  const decreaseQuantity = async (id) => {
    try {
      const item = cartItems.find((item) => item.id === id);
      if (item.quantity <= 1) return;
  
      const newQuantity = item.quantity - 1;
  
      // Update quantity di backend
      const response = await axios.put(
        `http://localhost:5000/carts/${id}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
  
      // Update state setelah berhasil di backend
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: response.data.quantity } : item
        )
      );
    } catch (err) {
      console.error("Failed to decrease quantity.", err);
      setError("Failed to update quantity. Please try again later.");
    }
  };
  

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/carts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to remove item from cart.", err);
      setError("Failed to remove item. Please try again later.");
    }
  };

  if (loading) return <p>Loading cart items...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col font-poppins">
      <div className="flex-1">
        <div className="bg-white flex items-center justify-between p-3 sticky top-0 z-10">
          <p className="font-semibold text-xl md:text-2xl">Cart</p>
        </div>
        <div className="p-3 space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white flex flex-col gap-2 p-3">
              <div className="flex items-center space-x-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="ml-4"
                  />
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cursor-pointer h-24 object-cover rounded-sm w-24"
                  />
                </div>
                <div className="flex flex-col space-y-3 w-1/2">
                  <div className="flex flex-col truncate w-auto">
                    <p className="font-semibold text-md">{item.product.name}</p>
                    <p className="text-xs md:text-sm text-slate-500">{item.product.price}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="flex gap-2 items-center"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="flex gap-2 items-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="duration-300 flex items-center justify-center text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="bg-white flex items-center justify-between p-3 rounded-sm">
            <p className="font-semibold text-md md:text-xl">
              Total : Rp.{calculateTotal().toLocaleString()}
            </p>
            <button
              onClick={() => alert("Proceed to payment!")}
              className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
