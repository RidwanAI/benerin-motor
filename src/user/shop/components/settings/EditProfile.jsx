const EditProfile = () => {
  return (
    <section className="bg-white p-4 rounded-md shadow-sm space-y-3">
      {/* Header */}
      <p className="font-semibold text-xl md:text-2xl">Edit Profile</p>

      {/* Form */}
      <form className="space-y-6 text-md">
        {/* Profile Photo */}
        <div className="flex flex-col items-center space-y-2">
          <img src="" alt="profile" className="border h-24 rounded-full object-cover shadow-sm w-24" />
          <label htmlFor="profile-photo" className="bg-blue-500 cursor-pointer duration-300 px-3 py-1.5 rounded-md text-white transition hover:bg-blue-700 md:px-5 md:py-1.5">
            Upload
          </label>
          <input type="file" id="profile-photo" accept="image/*" className="hidden" />
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="full-name" className="block text-md">
            Full Name
          </label>
          <input type="text" id="full-name" placeholder="Enter your full name" className="border p-2 rounded-sm w-full" />
        </div>

        {/* Email Address */}
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

        {/* Current Passoword */}
        <div className="space-y-2">
          <label htmlFor="currentPassword" className="block text-md">
            Current Password
          </label>
          <input type="currentPassword" id="currentPassword" placeholder="Enter a current password" className="border p-2 rounded-sm w-full" />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-md">
            Password
          </label>
          <input type="password" id="password" placeholder="Enter a new password" className="border p-2 rounded-sm w-full" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 cursor-pointer duration-300 px-3 py-1.5 rounded-md text-white transition w-full hover:bg-blue-700 md:px-5 md:py-1.5">
          Save Changes
        </button>
      </form>

      {/* Button => Cancel */}
      <div className="text-center">
        <button type="button" className="duration-300 hover:text-blue-700 hover:underline focus:outline-none">
          Cancel
        </button>
      </div>
    </section>
  );
};

export default EditProfile;
