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

        const userResponse = await axios.get("http://localhost:5000/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const userId = userResponse.data.id;

        const response = await axios.get(`http://localhost:5000/carts/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setCartItems(response.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Failed to fetch cart items. Please try again later."
        );
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

  const handleCheckout = async () => {
    try {
      const userResponse = await axios.get("http://localhost:5000/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const userId = userResponse.data.id;

      const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id));
      const totalAmount = selectedCartItems.reduce((total, item) => {
        const price = parseFloat(item.product.price.replace(/[^\d.]/g, ""));
        return total + price * item.quantity;
      }, 0);

      await axios.post(
        "http://localhost:5000/checkout",
        { userId, selectedCartItemIds: selectedItems, totalAmount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      alert("Checkout successful!");
      setCartItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    } catch (error) {
      console.error("Error during checkout", error);
      alert("Checkout failed, please try again.");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        const price = parseFloat(item.product.price.replace(/[^\d.]/g, ""));
        return total + price * item.quantity;
      }
      return total;
    }, 0);
  };

  const adjustQuantity = async (id, delta) => {
    try {
      const item = cartItems.find((item) => item.id === id);
      const newQuantity = item.quantity + delta;

      if (newQuantity < 1) return;

      const response = await axios.put(
        `http://localhost:5000/carts/${id}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: response.data.quantity } : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity.", err);
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
                    <p className="text-xs md:text-sm text-slate-500">   {`Rp.${parseFloat(item.product.price).toLocaleString("id-ID", {
                minimumFractionDigits: 2,
              })}`}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => adjustQuantity(item.id, -1)}
                      className="flex gap-2 items-center"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => adjustQuantity(item.id, 1)}
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
              Total: Rp.{calculateTotal().toLocaleString()}
            </p>
            <button
              onClick={handleCheckout}
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