const EditProfile = () => {
  return (
    <section className="bg-white font-poppins p-3 rounded-sm shadow-sm space-y-3">
      {/* Part => Header */}
      <p className="font-semibold text-xl">Edit Profile</p>

      {/* Part => Form */}
      <form className="space-y-3 text-sm">
        {/* Part => Profile Photo */}
        <div className="flex flex-col items-center space-y-2">
          <img src="../general/cartoonmontir.png" alt="" className="border h-24 rounded-full object-cover shadow-sm w-24" />
          <label htmlFor="profile-photo" className="bg-orange-500 cursor-pointer duration-300 px-3 py-1.5 rounded-md text-white transition hover:bg-orange-700 md:px-5 md:py-1.5">
            Upload
          </label>
          <input type="file" id="profile-photo" accept="image/*" className="hidden" />
        </div>

        {/* Part => Full Name */}
        <div className="space-y-2">
          <label htmlFor="full-name" className="block text-md">
            Full Name
          </label>
          <input type="text" id="full-name" placeholder="Enter your full name" className="border p-2 rounded-sm w-full" />
        </div>

        {/* Part => Email Address */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-md">
            Email Address
          </label>
          <input type="email" id="email" placeholder="Enter your email" className="border p-2 rounded-sm w-full" />
        </div>

        {/* Part => Phone Number */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-md">
            Phone Number
          </label>
          <input type="tel" id="phone" placeholder="Enter your phone number" className="border p-2 rounded-sm w-full" />
        </div>

        <div className="flex flex-col items-center gap-2 md:flex-row">
          {/* Part => Current Passoword */}
          <div className="space-y-2 w-full">
            <label htmlFor="currentPassword" className="block text-md">
              Current Password
            </label>
            <input type="currentPassword" id="currentPassword" placeholder="Enter a current password" className="border p-2 rounded-sm w-full" />
          </div>

          {/* Part => Password */}
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
  );
};

export default EditProfile;
