// import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sticky w-full top-0 z-50">
      <nav className="bg-dark  shadow-lg w-100 px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto container flex items-center justify-between flex-wrap">
          {/* logo */}
          <div className="text-indigo-500">
            <img
              src="/src/assets/temp-logo-white.png"
              alt="Logo"
              className="h-8 rounded-full"
            />
          </div>
          {/* nav links */}
          <div className="text-gray-200 w-full md:w-auto">
            <ul className="flex font-semibold justify-between">
              {/* Active Link: text-indigo-500, Inactive Link: hover:text-indigo-500 */}
              <li className="md:px-4 md:py-2 hover:text-pink">
                <a href="#">
                  <Link to="/">Home</Link>
                </a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-pink">
                <a href="#styles">Catalog</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-pink">
                <a href="#faqs">FAQS</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-pink">
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          {/* icons */}
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
