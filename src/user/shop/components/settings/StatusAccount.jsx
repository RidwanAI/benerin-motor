const StatusAccount = () => {
  return (
    <section className="bg-white p-4 rounded-md shadow-sm space-y-3">
      {/* Header */}
      <h3 className="font-semibold text-xl md:text-2xl">Status Account</h3>
      <div className="flex gap-2 items-center text-md">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill text-green-500" viewBox="0 0 16 16">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
        </svg>
        <p className="text-slate-700">Your account is currently active.</p>
      </div>

      {/* Button => Contact Support & View Settings */}
      <div className="flex items-center space-x-3">
        <button className="bg-blue-500 duration-300 ease-in-out px-3 py-1.5 rounded-md text-white transition transform hover:bg-blue-700 md:px-5 md:py-1.5">Contact Support</button>
        <button className="bg-slate-500 duration-300 ease-in-out px-3 py-1.5 rounded-md text-white transition transform hover:bg-slate-700 md:px-5 md:py-1.5">View Settings</button>
      </div>
    </section>
  );
};

export default StatusAccount;
