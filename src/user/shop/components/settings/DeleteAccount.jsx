const DeleteAccount = () => {
  return (
    <section className="bg-white font-poppins p-4 rounded-md shadow-sm space-y-3">
      {/* Header */}
      <p className="font-semibold text-xl md:text-2xl">Delete Account</p>
      <p className="text-slate-700 text-md">Are you sure you want to delete your account? This action cannot be undone. Once deleted, all your data will be permanently removed.</p>

      {/* Action => Delete */}
      <div className="flex flex-col items-start justify-start space-y-3">
        <div className="space-y-2 text-slate-700 text-md w-full">
          <label htmlFor="deleteAccount" className="block">
            Please type, <span className="font-semibold italic">"delete my account achmadrizky@gmail.com right now!"</span> in the field below.
          </label>
          <input type="text" id="deleteAccount" placeholder="Enter your text" className="border p-2 rounded-sm w-full" />
        </div>
        <div className="flex gap-2 items-center text-sm text-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle mr-2" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z" />
            <path d="M7.002 5.002a.5.5 0 0 1 .996 0l.003 4a.5.5 0 0 1-.993 0L7.002 5.002ZM7 9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V9Z" />
          </svg>
          <p className="text-red-500">This action is permanent and cannot be undone.</p>
        </div>
      </div>

      {/* Button => Cancel & Delete */}
      <div className="flex space-x-3 text-white">
        <button className="bg-slate-500 duration-300 px-3 py-1.5 rounded-md hover:bg-slate-700 md:px-5 md:py-1.5">Cancel</button>
        <button className="bg-red-500 duration-300 px-3 py-1.5 rounded-md hover:bg-red-700 md:px-5 md:py-1.5">Confirm Deletion</button>
      </div>
    </section>
  );
};

export default DeleteAccount;
