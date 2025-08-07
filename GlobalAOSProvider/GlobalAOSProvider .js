import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const GlobalAOSProvider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return children;
};

export default GlobalAOSProvider;
