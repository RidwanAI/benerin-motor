import React from "react";

const AdminSettings = () => (
  <div className="flex h-screen">
    <div className="flex-1 ">
      {/* Main Content */}
      <main className="bg-slate-100 p-3 space-y-3">
        {/* Content -> Status Account */}
        <section className="font-poppins space-y-3">
          <div className="bg-white p-3 rounded-sm shadow-sm space-y-1">
            <p className="font-semibold text-xl">Status Account</p>
            <div className="flex gap-2 items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill text-green-500" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
              </svg>
              <p className="text-slate-500">
                Welcome, <span className="text-orange-500">Admin!</span> Your account is currently active.
              </p>
            </div>
          </div>
        </section>

        {/* Content -> Edit Profile */}
        <section className="bg-white font-poppins p-3 rounded-sm shadow-sm space-y-3">
          <p className="font-semibold text-xl">Edit Profile</p>

          {/* Fitur -> Form Edit Profile */}
          <form className="space-y-3 text-sm">
            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-2">
              <img src="../general/cartoonmontir.png" alt="" className="border h-24 rounded-full object-cover shadow-sm w-24" />
              <label htmlFor="profile-photo" className="bg-orange-500 cursor-pointer duration-300 px-3 py-1.5 rounded-md text-white transition hover:bg-orange-700 md:px-5 md:py-1.5">
                Upload
              </label>
              <input type="file" id="profile-photo" accept="image/*" className="hidden" />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="full-name" className="block text-md">
                Full Name
              </label>
              <input type="text" id="full-name" placeholder="Enter your full name" className="border p-2 rounded-sm w-full" />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-md">
                Email Address
              </label>
              <input type="email" id="email" placeholder="Enter your email" className="border p-2 rounded-sm w-full" />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-md">
                Phone Number
              </label>
              <input type="tel" id="phone" placeholder="Enter your phone number" className="border p-2 rounded-sm w-full" />
            </div>

            <div className="flex flex-col items-center gap-2 md:flex-row">
              {/* Current Passoword */}
              <div className="space-y-2 w-full">
                <label htmlFor="currentPassword" className="block text-md">
                  Current Password
                </label>
                <input type="currentPassword" id="currentPassword" placeholder="Enter a current password" className="border p-2 rounded-sm w-full" />
              </div>

              {/* Password */}
              <div className="space-y-2 w-full">
                <label htmlFor="newPassword" className="block text-md">
                  New Password
                </label>
                <input type="newPassword" id="newPassword" placeholder="Enter a new password" className="border p-2 rounded-sm w-full" />
              </div>
            </div>
          </form>

          {/* Button => Save Changes & Cancel */}
          <div className="flex items-center justify-end space-x-2 text-center">
            <button type="button" className="bg-slate-300 duration-300 px-3 py-1.5 rounded-md hover:bg-slate-500 md:px-5 md:py-1.5">
              Cancel
            </button>
            <button type="submit" className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5">
              Save Changes
            </button>
          </div>
        </section>

        {/* Language */}
        <section className="bg-white font-poppins p-3 rounded-sm shadow-sm space-y-3">
          {/* Header */}
          <div className="flex flex-col items-start space-y-1">
            <p className="font-semibold text-xl">Language</p>
            <p className="text-slate-500 text-sm">Select your preferred language from the options below. The selected language will be applied throughout the application.</p>
          </div>

          {/* Fitur -> Language */}
          <div className="flex flex-col items-start justify-start space-y-3">
            <div className="space-y-2 text-slate-500 text-sm w-full">
              <label htmlFor="languageSelect" className="block">
                Choose a language:
              </label>
              <select id="languageSelect" className="border p-2 rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文 (Chinese)</option>
              </select>
            </div>

            <div className="flex gap-2 items-center text-sm text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM8 15A7 7 0 1 1 8 2a7 7 0 0 1 0 14Z" />
                <path d="M8.93 6.588a.5.5 0 0 0-.43.255l-1.29 2.42-.002.008-.0007.001-.004.008-.006.012c-.103.206-.03.445.184.578.214.133.505.063.628-.133l.042-.08 1.29-2.42.001-.001.002-.004.001-.002a.5.5 0 0 0-.085-.643ZM8 4.5A.5.5 0 0 0 8 5h.007A.5.5 0 0 0 8 4.5Z" />
              </svg>
              <p>Your selection will be saved automatically.</p>
            </div>
          </div>

          {/* Button => Save & Cancel */}
          <div className="flex space-x-2 items-center justify-end">
            <button className="bg-slate-300 duration-300 px-3 py-1.5 rounded-md hover:bg-slate-500 md:px-5 md:py-1.5">Cancel</button>
            <button className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5">Save Changes</button>
          </div>
        </section>

        {/* Delete Account */}
        <section className="font-poppins space-y-3">
          {/* Part => Delete Account */}
          <div className="bg-white p-3 rounded-sm shadow-sm space-y-3">
            {/* Part => Header */}
            <div className="flex flex-col items-start space-y-1">
              <p className="font-semibold text-xl">Delete Account</p>
              <p className="text-slate-500 text-sm">Are you sure you want to delete your account? This action cannot be undone. Once deleted, all your data will be permanently removed.</p>
            </div>

            {/* Part => Delete Validation */}
            <div className="flex flex-col items-start justify-start space-y-3">
              <div className="space-y-2 text-slate-500 text-sm w-full">
                <label htmlFor="deleteAccount" className="block">
                  Please type, <span className="font-semibold italic">"delete my account achmadrizky@gmail.com right now!"</span> in the field below.
                </label>
                <input type="text" id="deleteAccount" placeholder="Enter your text" className="border p-2 rounded-sm w-full" />
              </div>

              <div className="flex gap-2 items-center text-sm text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z" />
                  <path d="M7.002 5.002a.5.5 0 0 1 .996 0l.003 4a.5.5 0 0 1-.993 0L7.002 5.002ZM7 9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V9Z" />
                </svg>
                <p>This action is permanent and cannot be undone.</p>
              </div>
            </div>

            {/* Button => Cancel & Delete */}
            <div className="flex items-center justify-end space-x-2">
              <button className="bg-slate-300 duration-300 px-3 py-1.5 rounded-md hover:bg-slate-500 md:px-5 md:py-1.5">Cancel</button>
              <button className="bg-red-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-red-700 md:px-5 md:py-1.5">Confirm</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
);

export default AdminSettings;
