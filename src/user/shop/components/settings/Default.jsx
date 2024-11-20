const Default = () => {
  return (
    <section className="bg-white p-4 rounded-sm shadow-sm space-y-3">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div>
          <p className="font-semibold text-xl md:text-2xl">
            Welcome, <span className="text-blue-500">Achmad Rizky</span>
          </p>
          <p className="text-slate-700 text-md">We're glad to have you back! Select an option from the sidebar to modify your settings.</p>
        </div>
      </div>

      {/* Links */}
      <div className="bg-slate-100 p-4 rounded-sm shadow-sm space-y-3">
        <h4 className="font-semibold text-lg">Quick Actions</h4>
        <ul className="space-y-2 text-md">
          <li>
            <button className="text-blue-500 hover:underline focus:outline-none">Edit your profile</button>
          </li>
          <li>
            <button className="text-blue-500 hover:underline focus:outline-none">Change your password</button>
          </li>
          <li>
            <button className="text-blue-500 hover:underline focus:outline-none">Manage account settings</button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Default;
