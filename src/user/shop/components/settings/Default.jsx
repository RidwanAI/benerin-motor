import { useState, useEffect } from "react";
import axios from "axios";

const Default = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className="bg-white font-poppins p-3 rounded-sm shadow-sm space-y-3">
      {/* Part => Header */}
      <div className="flex flex-col items-start space-y-1">
        <p className="font-semibold text-xl">
          Welcome, <span className="text-orange-500">{user ? user.name : "Guest Account"}</span>
        </p>
        <p className="text-slate-500 text-sm">We're glad to have you back! Select an option from the sidebar to modify your settings.</p>
      </div>

      {/* Part => Link Quick Action */}
      <div className="bg-slate-100 flex flex-col items-start p-3 rounded-sm space-y-1">
        <p className="font-semibold text-xl">Quick Actions</p>
        <ul className="space-y-1 text-sm">
          <li>
            <button className="duration-300 text-blue-500 hover:underline focus:outline-none">Edit your profile</button>
          </li>
          <li>
            <button className="duration-300 text-blue-500 hover:underline focus:outline-none">Change your password</button>
          </li>
          <li>
            <button className="duration-300 text-blue-500 hover:underline focus:outline-none">Manage account settings</button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Default;
