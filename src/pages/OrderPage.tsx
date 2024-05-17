// import React from 'react'
import { CCarousel, CCarouselItem } from "@coreui/react";
import { Navbar } from "@components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

function OrderPage() {
  const buttons = Array.from({ length: 10 }, (_, index) => index + 1);
  return (
    <>
      <div className="min-w-full max-w-full h-fit border-2 border-black bg-yellow">
        <Navbar />
        <div className="full-size text-[10rem] flex-center relative">
          <div className="absolute w-full h-screen block">
            <CCarousel controls indicators>
              <CCarouselItem>
                <div className="w-full h-screen flex-center">
                  <div className="w-[90%] h-[90vh] bg-blue">image 1</div>
                </div>
              </CCarouselItem>
              <CCarouselItem>
                <div className="w-full h-screen flex-center">
                  <div className="w-[90%] h-[90vh] bg-blue">image 2</div>
                </div>
              </CCarouselItem>
              <CCarouselItem>
                <div className="w-full h-screen flex-center">
                  <div className="w-[90%] h-[90vh] bg-blue">image 3</div>
                </div>
              </CCarouselItem>
            </CCarousel>
          </div>
        </div>
        <div className="w-full h-[50vh] border-2 border-black flex-center text-[5rem] bg-blue relative">
          <h1 className="absolute top-0 z-10 text-white">
            Step 1: Select Background
          </h1>
          <img
            src="src/assets/cloud.png"
            alt="cloud"
            className="absolute top-0 left-1 min-w-[10%] z-10"
          />
          <img
            src="src/assets/cloud.png"
            alt="cloud"
            className="absolute top-3 right-2 min-w-[10%] z-10"
          />
          <img
            src="src/assets/cloud.png"
            alt="cloud"
            className="absolute  bottom-3 left-56 min-w-[10%] z-0"
          />
          <img
            src="src/assets/cloud.png"
            alt="cloud"
            className="absolute -bottom-5 right-96 min-w-[10%] z-10"
          />
          <img
            src="src/assets/cloud.png"
            alt="cloud"
            className="absolute top-3 right-1/3 min-w-[10%] z-0"
          />

          <div className="absolute -bottom-8 w-[80%] h-[40vh] ">
            <CCarousel controls interval={false}>
              <CCarouselItem>
                <div className="flex-center justify-evenly flex-row w-full h-[30vh]">
                  <div className="bg-white w-[30%] h-[30vh]">image 1</div>
                  <div className="bg-white w-[30%] h-[30vh]">image 2</div>
                </div>
              </CCarouselItem>
              <CCarouselItem>
                <div className="flex-center justify-evenly flex-row w-full h-[30vh]">
                  <div className="bg-white w-[30%] h-[30vh]">image 3</div>
                  <div className="bg-white w-[30%] h-[30vh]">image 4</div>
                </div>
              </CCarouselItem>
              <CCarouselItem>
                <div className="flex-center justify-evenly flex-row w-full h-[30vh]">
                  <div className="bg-white w-[30%] h-[30vh]">image 5</div>
                  <div className="bg-white w-[30%] h-[30vh]">image 6</div>
                </div>
              </CCarouselItem>
            </CCarousel>
          </div>
        </div>
        <div className="full-size text-[5rem] bg-green relative">
          <div className="absolute z-10 flex flex-col py-[2rem] px-[5rem] w-full h-[90vh]">
            <h1 className=" text-white">
              Step 2: Select Number of People and Pets
            </h1>
            <div className="w-[90%] h-[15vh] flex-center justify-evenly flex-wrap ">
              {buttons.map((num) => (
                <button
                  key={num}
                  className="border border-white w-[7%] h-[7vh] text-white rounded-lg text-[3rem] flex-center"
                >
                  {num}
                </button>
              ))}
            </div>
            <h1 className=" text-white">Step 3: Select Picture Style</h1>
            <div className="w-full h-[50vh] flex-center justify-evenly">
              <div className="w-[30%] h-[35vh] bg-white"></div>
              <div className="w-[30%] h-[35vh] bg-white"></div>
              <div className="w-[30%] h-[35vh] bg-white"></div>
            </div>
          </div>
          <img
            src="src/assets/divider.png"
            alt="divider"
            className="w-full max-h-screen absolute top-0 z-0"
          />
        </div>
        <div className="w-full h-screen flex-center text-[5rem] bg-green flex-row flex-wrap">
          <div className="w-[50%] h-screen text-white px-2 flex-center flex-col gap-[12.5rem]">
            <h1>Step 4: Upload Your Photo</h1>
            <div className="w-[50%] h-[20vh] border-[0.3rem] border-white rounded-[5rem] text-[3.5rem] flex-center">
              <h1>Upload Image</h1>
            </div>
          </div>
          <div className="w-[50%] h-screen text-white px-2 flex-center flex-col gap-4">
            <h1>Step 5: Additional Notes on your Order</h1>
            <textarea name="notes" id="notes" className="w-[80%] h-[40vh] rounded-2xl text-black text-[1.5rem] p-[1rem]"></textarea>
          </div>
        </div>
        <div className="w-full h-[40vh] border-2 border-black flex-center">
         <div className="w-[30%] h-[30vh] border-2 border-black bg-pink rounded-[7rem] flex-center"><FontAwesomeIcon icon={faCartPlus} className="w-full h-[20vh] "/></div>
        </div>
        <div className="w-full h-[50vh] border-2 border-black flex-center bg-black flex-col gap-8">
        <div className="w-[50%] text-[1.5rem] text-white">
          <h1 className="font-extrabold">Disclaimer</h1>
          <p>We are in no way associated with or authorized by the Fox Broadcasting Company or FXX and neither these entities nor any of its affiliates have licensed or endorsed us.  We are a project run by fans for fans.</p>
        </div>
        <div>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024
          <a href="#" className="hover:underline">
            ToonVerse™
          </a>
          . All Rights Reserved.
        </span>
        </div>
        </div>
      </div>
    </>
  );
}

export default OrderPage;
