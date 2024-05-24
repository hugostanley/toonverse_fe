import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
}

function Navbar() {
  useScrollToHash();
  return (
    <div className="sticky w-full top-0 z-50">
      <nav className="bg-dark shadow-lg w-100 px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto container flex items-center justify-between flex-wrap">
          <div className="text-indigo-500">
            <img
              src="/src/assets/temp-logo-white.png"
              alt="Logo"
              className="h-8 rounded-full"
            />
          </div>
          <div className="text-gray-200 w-full md:w-auto">
            <ul className="flex font-semibold justify-between">
              <li className="md:px-4 md:py-2 hover:text-pink">
                <Link to="/">Home</Link>
              </li>
              <li className="md:px-4 md:py-2 hover:text-pink">
                <Link to="/#styles">Catalog</Link>
              </li>
              <li className="md:px-4 md:py-2 hover:text-pink">
                <Link to="/#faqs">FAQS</Link>
              </li>
              <li className="md:px-4 md:py-2 hover:text-pink">
                <Link to="/#contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="text-light flex gap-3">
            <FontAwesomeIcon icon={faUser} className="h-6" />
            <FontAwesomeIcon icon={faCartShopping} className="h-6" />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
