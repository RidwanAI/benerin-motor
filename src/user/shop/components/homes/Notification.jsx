/* Notification => Done */

import React, { useState, useEffect } from "react";

const Notification = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, title: "Big Sale Coming Up!", content: "Huge discounts are arriving soon! Stay tuned for our big sale event this weekend.", read: false },
    { id: 2, title: "10% Discount on First Purchase", content: "Use the code NEW10 at checkout to get 10% off on your first purchase.", read: false },
    { id: 3, title: "Free Shipping on Orders Over $50", content: "Enjoy free shipping on all orders over $50. Don't miss out on this amazing offer!", read: false },
    { id: 4, title: "20% Discount on Selected Products", content: "Selected products are now 20% off. Limited time only!", read: false },
  ]);

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = messages.filter((msg) => !msg.read).length;
    setUnreadCount(count);
  }, [messages]);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    markAsRead(message.id);
  };

  const markAsRead = (id) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)));
  };

  return (
    <section>
      {/* List of Messages */}
      <div className="fixed bottom-3 right-3 z-50 md:right-7">
        <button onClick={() => setIsPopupVisible(!isPopupVisible)} className="relative bg-orange-500 duration-300 p-3 rounded-md text-white hover:bg-orange-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-text" viewBox="0 0 16 16">
            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
            <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8m0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5" />
          </svg>
          {unreadCount > 0 && <span className="absolute bg-red-500 font-monserrat px-1 right-0.5 rounded-full text-white text-xs top-0.5">{unreadCount}</span>}
        </button>

        {/* Notifications Popup */}
        {isPopupVisible && (
          <div className="bg-black bg-opacity-75 fixed flex inset-0 items-center justify-center p-3 space-y-3 z-50">
            <div className="bg-white p-4 relative rounded-md shadow-sm w-full md:max-w-md">
              <h3 className="font-semibold text-lg text-center">Messages</h3>
              <div className="mt-3 space-y-3 h-64 overflow-y-auto pb-3">
                {messages.map((message) => (
                  <div key={message.id} onClick={() => handleMessageClick(message)} className={`p-2 rounded-md cursor-pointer ${message.read ? "bg-gray-100" : "bg-gray-200"} hover:bg-gray-300`}>
                    <p className="font-semibold">{message.title}</p>
                    <p className="text-sm">{message.content.slice(0, 50)}...</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setIsPopupVisible(false)} className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-md">
                Close
              </button>
            </div>
          </div>
        )}

        {/* Message Detail Popup */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-3 z-50">
            <div className="bg-white p-4 relative rounded-md shadow-sm w-full md:max-w-md">
              <h3 className="font-semibold text-lg">{selectedMessage.title}</h3>
              <p className="mt-2">{selectedMessage.content}</p>
              <button onClick={() => setSelectedMessage(null)} className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-md">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Notification;
