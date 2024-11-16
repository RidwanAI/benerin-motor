import { useState, useEffect } from "react";

function OpeningAppComponent() {
  const [showPopup, setShowPopup] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      const hideTimer = setTimeout(() => {
        setShowPopup(false);
      }, 500);
      return () => clearTimeout(hideTimer);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showPopup && (
        <div className={`bg-orange-400 fixed flex font-poppins inset-0 items-center justify-center tracking-wider z-50 md:px-7 ${fadeOut ? "animate-fade-out" : ""}`}>
          <div className="flex flex-col gap-4 items-center justify-center text-center text-white">
            <img src="../general/logo.png" alt="logo.png" className="animate-bounce" width={500} />
          </div>
        </div>
      )}
    </>
  );
}

export default OpeningAppComponent;
