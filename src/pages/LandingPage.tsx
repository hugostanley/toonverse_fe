// import React from "react";

function LandingPage() {
  return (
    <>
      {/*nav*/}
      <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          {/* temp-logo */}
          <div className="text-indigo-500 md:order-1">
            <img src="src/assets/temp-logo.png" alt="Logo" className="h-10" />
          </div>
          <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
              {/* active Link: text-indigo-500
                  inactive Link: hover:text-indigo-500 */}
              <li className="md:px-4 md:py-2 text-indigo-500">
                <a href="#">Home</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">Catalog</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">FAQS</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="order-2 flex gap-3 md:order-3">
            <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
              <span>Login</span>
            </button>
            <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
              <span>Login</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default LandingPage;
