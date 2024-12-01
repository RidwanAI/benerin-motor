import React, { useState } from "react";

const Orders = () => {
  // List => Order Items
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: "Honda Product 1", price: "Rp.100.000", description: "Description product", category: "Unpaid", status: "Unpaid", quantity: 1, image: "./product/new/shockdbs-aerox.png" },
    { id: 2, name: "Honda Product 2", price: "Rp.200.000", description: "Description product", category: "Unpaid", status: "Unpaid", quantity: 1, image: "./product/new/kampasganda-aerox.png" },
    { id: 3, name: "Honda Product 3", price: "Rp.300.000", description: "Description product", category: "Packed", status: "Unpaid", quantity: 1, image: "./product/new/shockbreaker-aerox.png" },
    { id: 4, name: "Yamaha Product 4", price: "Rp.700.000", description: "Description product", category: "Shipped", status: "Shipped", quantity: 1, image: "./product/second/shockfushimaya-beat.png" },
    { id: 5, name: "Yamaha Product 5", price: "Rp.800.000", description: "Description product", category: "Shipped", status: "Shipped", quantity: 1, image: "./product/new/velgvnd-aerox.png" },
    { id: 6, name: "Suzuki Product 6", price: "Rp.1.000.000", description: "Description product", category: "Completed", status: "Completed", quantity: 1, image: "./product/second/shockfushimaya-beat.png" },
  ]);

  // Function => Category Product
  const [selectedCategory, setSelectedCategory] = useState("Unpaid");

  // Function => Virtual Account Random
  const generateRandomCode = (prefix, length = 10) =>
    `${prefix}${Math.random()
      .toString()
      .slice(2, 2 + length)}`;

  // Function => Upload Payment Proof
  const handleFileUpload = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`File uploaded for item ${id}:`, file);
    }
  };

  // Function => Arrival Product
  const [showArrivalMessage, setShowArrivalMessage] = useState(false);
  const handleArrival = () => {
    setShowArrivalMessage(true);

    setTimeout(() => {
      setShowArrivalMessage(false);
    }, 3000);
  };

  // Function => Feedback
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [showReviewMessage, setShowReviewMessage] = useState(false);

  const handleOpenReviewPopup = (id) => {
    setSelectedItemId(id);
    setShowReviewPopup(true);
  };

  const handleCloseReviewPopup = () => {
    setShowReviewPopup(false);
    setReviewText("");
  };

  // Function => Review
  const handleSubmitReview = (id) => {
    console.log(`Review for item ${id}: ${reviewText}`);
    setShowReviewPopup(false);
    setReviewText("");
    setShowReviewMessage(true);

    setTimeout(() => {
      setShowReviewMessage(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col font-poppins">
      <div className="flex-1">
        {/* Part => Header */}
        <div className="bg-white p-3 shadow-sm sticky top-0 z-10">
          <p className="font-semibold text-xl md:text-2xl">Order</p>
        </div>

        {/* Part => Category Orders */}
        <div className="bg-white flex gap-2 overflow-x-auto p-3 sticky top-0 whitespace-nowrap z-10">
          {["Unpaid", "Packed", "Shipped", "Completed"].map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={`px-3 py-1.5 rounded-md md:px-5 md:py-1.5 ${selectedCategory === category ? "bg-orange-500 text-white underline" : "bg-slate-100"}`}>
              {category}
            </button>
          ))}
        </div>

        {/* Part => Order Items */}
        <div className="p-3 space-y-3">
          {orderItems
            .filter((item) => item.category === selectedCategory)
            .map((item) => (
              <div key={item.id} className="bg-white flex flex-col items-start gap-2 p-3">
                {/* Item => Name & Price */}
                <div className="flex gap-2 w-full">
                  <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-md" />
                  <div>
                    <p className="font-semibold text-md truncate">{item.name}</p>
                    <p className="font-semibold text-sm">{item.price}</p>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Item => Button */}
                <div className="bg-slate-100 flex flex-col p-3 w-full">
                  {/* Item */}
                  {/* Item => Unpaid & Packed */}
                  {["Unpaid", "Packed"].includes(selectedCategory) && (
                    <p className="text-sm text-slate-500">
                      Virtual Account : <span className="font-semibold text-blue-500">{generateRandomCode("VA")}</span>
                    </p>
                  )}

                  {/* Item => Shipped & Completed */}
                  {["Shipped", "Completed"].includes(selectedCategory) && (
                    <div>
                      <p className="text-sm text-slate-500">
                        No. Resi : <span className="font-semibold text-blue-500">{generateRandomCode("RESI")}</span>
                      </p>
                    </div>
                  )}

                  {/* Button */}
                  {/* Button => Unpaid */}
                  {["Unpaid"].includes(selectedCategory) && (
                    <div className="mt-2">
                      <label htmlFor={`upload-proof-${item.id}`} className="bg-orange-500 cursor-pointer duration-300 flex gap-2 items-center justify-center px-3 py-1.5 rounded-md text-white hover:bg-orange-700">
                        Payment Proof
                      </label>
                      <input type="file" id={`upload-proof-${item.id}`} accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, item.id)} />
                    </div>
                  )}

                  {/* Button => Shipped */}
                  {["Shipped"].includes(selectedCategory) && (
                    <button onClick={handleArrival} className="bg-orange-500 duration-300 flex gap-2 items-center justify-center mt-2 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5">
                      Item Delivered
                    </button>
                  )}

                  {/* Button => Completed */}
                  {["Completed"].includes(selectedCategory) && (
                    <button onClick={() => handleOpenReviewPopup(item.id)} className="bg-orange-500 duration-300 flex gap-2 items-center justify-center mt-2 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5">
                      Feedback
                    </button>
                  )}

                  {/* Pop Up */}
                  {/* Pop Up => Arrival Product */}
                  {showArrivalMessage && (
                    <div className="bg-black bg-opacity-50 fixed flex inset-0 items-center justify-center px-3 z-10">
                      <div className="bg-white max-w-md p-3 rounded-md text-center w-full">
                        <h3 className="font-semibold text-xl text-green-500 md:text-2xl">Yeay!</h3>
                        <p className="text-md text-slate-500">Item has been delivered.</p>
                      </div>
                    </div>
                  )}

                  {/* Pop Up => Feedback */}
                  {showReviewPopup && (
                    <div className="bg-black bg-opacity-50 fixed flex inset-0 items-center justify-center px-3 z-10">
                      <div className="bg-white max-w-md p-3 rounded-md space-y-3 w-full">
                        {/* Header */}
                        <p className="font-semibold text-xl md:text-2xl">Write a Review</p>

                        {/* Add Review */}
                        <textarea rows="4" className="w-full border rounded-md p-2" placeholder="Write your review here..." value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>

                        {/* Button */}
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={handleCloseReviewPopup} className="bg-slate-300 duration-300 px-3 py-1.5 rounded-md hover:bg-slate-500 md:px-5 md:py-1.5">
                            Cancel
                          </button>
                          <button onClick={() => handleSubmitReview(selectedItemId)} className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {showReviewMessage && (
                    <div className="bg-black bg-opacity-50 fixed flex inset-0 items-center justify-center px-3 z-10">
                      <div className="bg-white max-w-md p-3 rounded-md text-center w-full">
                        <p className="font-semibold text-xl text-green-500 md:text-2xl">Thank You!</p>
                        <p className="text-md text-slate-500">Submitting your review.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
