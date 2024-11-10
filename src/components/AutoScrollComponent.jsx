import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AutoScrollComponent() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return null;
}

export default AutoScrollComponent;
