// import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Navbar() {

  const location = useLocation();
  const landingPath = location.pathname;

 

  return (
    <div className="fixed w-full top-0 z-50 py-4 px-8">
    <nav className="bg-light rounded-full border-2 border-dark w-100 px-8 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* logo */}
        <div className="text-indigo-500">
          <img
            src="/src/assets/temp-logo.png"
            alt="Logo"
            className="h-10 rounded-full"
          />
        </div>
        {/* nav links */}
        <div className="text-gray-500 w-full sm:w-auto">
          <ul className="flex font-semibold justify-between">
            {/* Active Link: text-indigo-500, Inactive Link: hover:text-indigo-500 */}
            {landingPath !== "/" ? (
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
        ) : (
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
        )}
           </ul>
        </div>
        {/* icons */}
        <div className="flex text-dark gap-3">
          <Link to="/account"><FontAwesomeIcon icon={faUser} className="h-6" /></Link>
          <Link to="/checkout"><FontAwesomeIcon icon={faCartShopping} className="h-6" /></Link>
        </div>
      </div>
    </nav>
  </div>
  )
}

export default Navbar;
