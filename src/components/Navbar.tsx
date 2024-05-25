import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <div className="sticky w-full top-0 z-50">
      <nav className="bg-dark shadow-lg w-100 px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto container flex items-center justify-between flex-wrap">
          {/* logo */}
          <Link to="/" >
            <img
              src="/src/assets/temp-logo-white.png"
              alt="Logo"
              className="h-8 rounded-full"
            />
          </Link>
          {/* nav links */}
          <div className="text-gray-200 w-full md:w-auto">
            <ul className="flex font-semibold justify-between">
              {pathname === "/" ? (
                <>
                  <li className="md:px-4 md:py-2 hover:text-pink">
                    <a href="#home">Home</a>
                  </li>
                  <li className="md:px-4 md:py-2 hover:text-pink">
                    <a href="#styles">Catalog</a>
                  </li>
                  <li className="md:px-4 md:py-2 hover:text-pink">
                    <a href="#faqs">FAQS</a>
                  </li>
                  <li className="md:px-4 md:py-2 hover:text-pink">
                    <a href="#contact">Contact Us</a>
                  </li>
                </>
              ) : (
                <>
                  <li className="md:px-4 md:py-2 hover:text-pink">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="md:px-4 md:py-2 hover:text-pink">
                    <Link to="/">Catalog</Link>
                  </li>
                  <li className="md:px-4 md:py-2 hover:text-pink">
                    <Link to="/">FAQS</Link>
                  </li>
                  <li className="md:px-4 md:py-2 hover:text-pink">
                    <Link to="/">Contact Us</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* icons */}
          <div className="text-light flex gap-3">
          <Link to="/account"><FontAwesomeIcon icon={faUser} className="h-6" /></Link>
          <Link to="/checkout"><FontAwesomeIcon icon={faCartShopping} className="h-6" /></Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
