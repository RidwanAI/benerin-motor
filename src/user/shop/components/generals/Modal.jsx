import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-slate-900 bg-opacity-50 flex fixed inset-0 justify-center items-center z-50">
      <div className="bg-white mx-3 p-3 rounded-sm shadow-sm space-y-3 w-full md:max-w-md">
        {/* Header */}
        <div className="flex flex-col items-start space-y-1">
          <p className="font-semibold text-black text-xl">{title}</p>
          <p className="text-slate-500 text-sm">{message}</p>
        </div>

        {/* Button => Cancel & Confirm */}
        <div className="flex justify-end space-x-2">
          <button className="bg-slate-300 duration-300 px-3 py-1.5 rounded-md hover:bg-slate-500 md:px-5 md:py-1.5" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
