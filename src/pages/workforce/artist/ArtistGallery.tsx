// import React from 'react'
import { categories } from "@assets";

function ArtistGallery() {
  return (
    <>
      <main className="full-size flex justify-end ">
        <div className="w-[80%] h-screen max-h-screen border-2 border-black">
          <h1>Artist Gallery</h1>
          <div className=" grid grid-cols-3 gap-4 p-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-4 space-y-12 min-w-full max-w-full bg-white z-10"
            >
              {category.backgrounds.flatMap((bg, bgIndex) => (
                <img
                  key={bgIndex}
                  src={bg}
                  className="w-full"
                  alt={`background-${bgIndex}`}
                />
              ))}
            </div>
          ))}
        </div>
        </div>
        
      </main>
    </>
  );
}

export default ArtistGallery;
