// import React from 'react'
import { CCarousel, CCarouselItem } from "@coreui/react";

function OrderPage() {
  return (
    <>
      <div className="min-w-full max-w-full h-fit border-2 border-black bg-yellow">
        <div className="full-size text-[10rem] flex-center relative">
          <div className="absolute w-full h-screen block">
            <CCarousel controls indicators dark>
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
            className="absolute  bottom-3 left-56 min-w-[10%] z-10"
          />
          <img
            src="src/assets/cloud.png"
            alt="cloud"
            className="absolute bottom-3 right-96 min-w-[10%] z-10"
          />
          <img
            src="src/assets/cloud.png"
            alt="cloud"
            className="absolute top-3 right-1/3 min-w-[10%] z-0"
          />

          <div className="absolute w-[80%] h-[40vh] ">
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

          {/* <h1 className="absolute"> Step 1</h1> */}
        </div>
        <div className="full-size text-[20rem] bg-green relative">
          <img
            src="src/assets/divider.png"
            alt="divider"
            className="w-full max-h-screen absolute top-0 z-0"
          />
          <h1 className="z-10 text-white absolute top-5">Step 2 & 3</h1>
        </div>
        <div className="w-full h-[50vh]  flex-center text-[20rem] bg-green">
          Step 4 & 5
        </div>
        <div className="w-full h-[30vh] border-2 border-black flex-center text-[20rem]">
          Step 4 & 5
        </div>
        <div className="w-full h-[50vh] border-2 border-black flex-center text-[20rem] bg-black">
          Footer
        </div>
      </div>
    </>
  );
}

export default OrderPage;
