import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, title, message, isEditProfile, initialData, onInputChange }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-black bg-opacity-75 flex fixed inset-0 justify-center items-center z-50">
      <div className="bg-slate-900 mx-3 p-5 rounded-md shadow-lg space-y-4 text-md text-white w-full md:w-auto">
        <p className="font-semibold text-xl md:text-2xl">{title}</p>
        <p>{message}</p>
        <hr className="border-2 w-full" />

        {isEditProfile && (
          <div className="space-y-2">
            {/* Name */}
            <label htmlFor="name" className="block text-sm">
              Name
            </label>
            <input type="text" id="name" className="p-2 rounded-sm text-black w-full focus:outline-orange-700" value={initialData.name} onChange={(e) => onInputChange("name", e.target.value)} />

            {/* Email */}
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input type="email" id="email" className="p-2 rounded-sm text-black w-full focus:outline-orange-700" value={initialData.email} onChange={(e) => onInputChange("email", e.target.value)} />
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button className="bg-white px-3 py-1 rounded-md text-black hover:bg-slate-200 md:px-5 md:py-1.5" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-green-500 px-3 py-1 rounded-md hover:bg-green-700 md:px-5 md:py-1.5" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
