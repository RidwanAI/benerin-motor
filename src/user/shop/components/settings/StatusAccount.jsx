const StatusAccount = () => {
  return (
    <section className="font-poppins space-y-3">
      {/* Part => Status Account */}
      <div className="bg-white p-3 rounded-sm shadow-sm space-y-1">
        <p className="font-semibold text-xl">Status Account</p>
        <div className="flex gap-2 items-center text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill text-green-500" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
          </svg>
          <p className="text-slate-500">Your account is currently active.</p>
        </div>
      </div>

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
  );
};

export default StatusAccount;
