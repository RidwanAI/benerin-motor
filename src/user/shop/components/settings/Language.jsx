const Language = () => {
  return (
    <section className="bg-white font-poppins p-4 rounded-md shadow-sm space-y-3">
      {/* Header */}
      <p className="font-semibold text-xl md:text-2xl">Language</p>
      <p className="text-slate-700 text-md">Select your preferred language from the options below. The selected language will be applied throughout the application.</p>

      {/* Action => Language Selection */}
      <div className="flex flex-col items-start justify-start space-y-3">
        <div className="space-y-2 text-slate-700 text-md w-full">
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
        <div className="flex gap-2 items-center text-sm text-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle mr-2" viewBox="0 0 16 16">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM8 15A7 7 0 1 1 8 2a7 7 0 0 1 0 14Z" />
            <path d="M8.93 6.588a.5.5 0 0 0-.43.255l-1.29 2.42-.002.008-.0007.001-.004.008-.006.012c-.103.206-.03.445.184.578.214.133.505.063.628-.133l.042-.08 1.29-2.42.001-.001.002-.004.001-.002a.5.5 0 0 0-.085-.643ZM8 4.5A.5.5 0 0 0 8 5h.007A.5.5 0 0 0 8 4.5Z" />
          </svg>
          <p>Your selection will be saved automatically.</p>
        </div>
      </div>

      {/* Button => Save & Cancel */}
      <div className="flex space-x-3 text-white">
        <button className="bg-slate-500 duration-300 px-3 py-1.5 rounded-md hover:bg-slate-700 md:px-5 md:py-1.5">Cancel</button>
        <button className="bg-blue-500 duration-300 px-3 py-1.5 rounded-md hover:bg-blue-700 md:px-5 md:py-1.5">Save Changes</button>
      </div>
    </section>
  );
};

export default Language;
