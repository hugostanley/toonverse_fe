// import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

function LandingPage() {
  return (
    <>
      {/* navigation */}
      <div className="fixed w-full top-0 z-50 py-4 px-8">
        <nav className="bg-light rounded-full border-2 border-dark  w-100 px-8 md:px-auto">
          <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
            {/* logo */}
            <div className="text-indigo-500 md:order-1">
              <img
                src="src/assets/temp-logo.png"
                alt="Logo"
                className="h-10 rounded-full"
              />
            </div>
            {/* nav links */}
            <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
              <ul className="flex justify-between">
                {/* Active Link: text-indigo-500, Inactive Link: hover:text-indigo-500 */}
                <li className="md:px-4 md:py-2 hover:text-pink">
                  <a href="#">Home</a>
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
            <div className="order-2 text-dark flex gap-3 md:order-3">
              <FontAwesomeIcon icon={faUser} className="h-6" />
              <FontAwesomeIcon icon={faCartShopping} className="h-6" />
            </div>
          </div>
        </nav>
      </div>

      {/* pages */}
      <div className="relative bg-blue h-screen border-b-2 border-dark">
        <div className="absolute inset-x-0 top-20 pt-12 text-light text-center">
          <h1 className="text-lg md:text-4xl lg:text-6xl xl:text-10xl">
            THRILL YOUR
          </h1>
          <h1 className="text-lg md:text-4xl lg:text-6xl xl:text-10xl">
            FRIENDS AND FAMILY!
          </h1>
          <h3 className="text-lg">Create your character online</h3>
        </div>
        <img
          src="src/assets/hero-bg.png"
          alt="hero"
          className="absolute bottom-0 w-full"
        />
      </div>
      <div className="bg-yellow flex items-center h-screen border-b-2 border-dark">
        <div className="px-4 py-8 flex">
          <div className="flex flex-col">
            <div className="w-[20rem] text-center bg-light px-6 rounded-2xl py-4 border-2 border-dark">
              <div className="flex justify-center items-center">
                <img
                  src="src/assets/chooseYourStyle.png"
                  alt="chooseYourStyle"
                  className="h-[15rem]"
                />
              </div>
              <h1>CHOOSE A STYLE</h1>
            </div>

            <div className="w-[20rem] text-center bg-light px-6 rounded-2xl py-4 border-2 border-dark mt-8">
              <div className="flex justify-center items-center">
                <img
                  src="src/assets/uploadPhotos.png"
                  alt="uploadPhotos"
                  className="h-[15rem]"
                />
              </div>
              <h1>UPLOAD YOUR PHOTOS</h1>
            </div>
          </div>
          <div className="flex flex-col ml-8">
            <div className="w-[20rem] text-center bg-light px-6 rounded-2xl py-4 border-2 border-dark">
              <div className="flex justify-center items-center">
                <img
                  src="src/assets/selectBackground.png"
                  alt="selectBackground"
                  className="h-[15rem] rounded-xl"
                />
              </div>
              <h1>SELECT A BACKGROUND</h1>
            </div>

            <div className="w-[20rem] text-center bg-light px-6 rounded-2xl py-4 border-2 border-dark mt-8">
              <div className="flex justify-center items-center">
                <img
                  src="src/assets/receivePortrait.png"
                  alt="receivePortrait"
                  className="h-[15rem]"
                />
              </div>
              <h1>RECEIVE YOUR DIGITAL PORTRAIT</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-center px-16">
          <h1 className="pb-8 text-lg md:text-4xl lg:text-6xl xl:text-10xl">
            HOW IT WORKS
          </h1>
          <h3 className="text-2xl">
            Follow the steps to order a unique picture-art created by one of our
            talented artists!
          </h3>
          <h3 className="text-2xl">
            100% online and without extra shipping or import costs
          </h3>
          <button className="text-dark shadow-retro__dark bg-pink font-medium rounded-xl px-5 py-2.5 mt-8 text-center border-dark border-2 w-[10rem]">
            GET STARTED
          </button>
        </div>
      </div>
      <div
        className="bg-pink flex flex-col justify-center h-screen border-b-2 border-dark"
        id="styles"
      >
        <h1 className="text-6xl text-center">STYLES</h1>
        <div className="flex flex-row justify-center">
          <div className="px-4 py-8">
            <div className="w-[20rem] rounded-2xl bg-light px-6 py-4 border-2 border-dark">
              <div className="flex justify-center items-center">
                <img
                  src="src/assets/rickMorty.png"
                  alt="rickMorty"
                  className="h-[15rem] rounded-lg"
                />
              </div>
            </div>
            <h1 className="text-lg">Rick and Morty Custom Portrait</h1>
            <h1 className="text-red-600">$Free.99</h1>
          </div>
          <div className="px-4 py-8">
            <div className="w-[20rem] rounded-2xl bg-light px-6 py-4 border-2 border-dark">
              <div className="flex justify-center items-center">
                <img
                  src="src/assets/bobs.png"
                  alt="bobs"
                  className="h-[15rem] rounded-lg"
                />
              </div>
            </div>
            <h1 className="text-lg">Bob's Burger Custom Portait</h1>
            <h1 className="text-red-600">$Free.99</h1>
          </div>
          <div className="px-4 py-8">
            <div className="w-[20rem] rounded-2xl bg-light px-6 py-4 border-2 border-dark">
              <div className="flex justify-center items-center">
                <img
                  src="src/assets/vexel.png"
                  alt="vexel"
                  className="h-[15rem] rounded-lg"
                />
              </div>
            </div>
            <h1 className="text-lg">Vexel Art Custom Portrait</h1>
            <h1 className="text-red-600">$Free.99</h1>
          </div>
        </div>
      </div>
      <div className="bg-green h-screen border-b-2 border-dark" id="faqs">
        <h1 className="text-6xl text-center py-4 text-light">FAQS</h1>
        <div className="flex gap-4">
          <div className="w-[50vw] px-8 py-8">
            <div className="mb-4">
              <span className="text-lg text-light">How long will it take?</span>
              <div>
                Our team of artists works as fast as possible to create the
                artwork. But since this is a hand-drawn digital illustration and
                is a time-consuming process, it may take up to 5-10 working days
                for you to receive your custom portrait.
              </div>
            </div>
            <div className="mb-4">
              <span className="text-lg text-light">
                What if I am not happy with my Happy Tooned portrait?
              </span>
              <div>
                We take pride in our talented artists and their ability to
                create amazing pieces of art. However, sometimes when working
                from a photo, we may miss the essence of the person and in this
                case, we are always ready to make revisions until you are 100%
                satisfied with your purchase.
              </div>
            </div>
            <div className="mb-4">
              <span className="text-lg text-light">
                Can you make me a custom background?
              </span>
              <div>
                Yes, whatever you want 😊. Just make sure to select the ‘Custom’
                option and describe what you want in detail in the notes
                section.
              </div>
            </div>

            <div className="mb-4">
              <span className="text-lg text-light">
                Do pets count as person?
              </span>
              <div>We consider all pets as non-human persons. So, yes. 😺 </div>
            </div>

            <div className="mb-4">
              <span className="text-lg text-light">
                When I order a printed or framed poster, do I also get the
                digital file?
              </span>
              <div>
                Yes! When you place an order for a printed or a framed poster
                you will also receive a high-res digital file on your email.
              </div>
            </div>
          </div>
          <div className="w-[50vw] px-8 py-8">
            <div className="mb-4">
              <span className="text-lg text-light">
                If I order a physical print, how long will it take to reach me?
              </span>
              <div>
                After you give us a confirmation on your digital file, it
                usually takes us an additional 5-10 working days to print and
                deliver your order.
              </div>
            </div>

            <div className="mb-4">
              <span className="text-lg text-light">
                {" "}
                What should be the quality of the photo I upload?
              </span>
              <div>
                The higher the quality of the photos you upload, the easier it
                is for our artists to create an accurate illustration. But don’t
                worry, we will reach out to you if we have any issues.
              </div>
            </div>

            <div className="mb-4">
              <span className="text-lg text-light">
                When I want to include more than one character, do I need to
                have everyone in the same image?
              </span>
              <div>
                No, please feel free to add them separately. Individual
                pictures/selfies works just as good. You may, however, want to
                detail what you'd want them to look like/ be doing in the
                drawing notes box.
              </div>
            </div>

            <div className="mb-4">
              <span className="text-lg text-light">
                Can you work on a large group portrait?
              </span>
              <div>
                Yes, we can! Drop us an email on support@happy-tooned.com and
                let's discuss.
              </div>
            </div>

            <div className="mb-4">
              <span className="text-lg text-light">
                Will it cost more to make revisions or changes?
              </span>
              <div>
                Please ensure that any/ all relevant details about your order is
                mentioned in the drawing notes section. Any details not included
                in the drawing notes will be assumed by our artist and will
                result in additional charges if you require changes.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className=" bg-dark text-light text-center py-4">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024
          <a href="#" className="hover:underline">
            ToonVerse™
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </>
  );
}

export default LandingPage;
