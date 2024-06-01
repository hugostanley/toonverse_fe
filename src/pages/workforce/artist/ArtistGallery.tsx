import Masonry from "react-masonry-css";
import { categories } from "@assets";

function ArtistGallery() {
  const allImages = categories.flatMap((category) => category.sample);



  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <>
      <main className="h-screen flex justify-end overflow-hidden">
        <div className="w-[80%] h-full z-10 flex flex-col pb-2">
          <h1 className="text-[2rem] font-bold text-yellow pl-6 pt-2 border-b-4 border-yellow drop-shadow-md">
            Artist Gallery
          </h1>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid p-4 overflow-auto h-screen overflow-x-hidden "
            columnClassName="my-masonry-grid_column"
          >
            {allImages.map((bg, bgIndex) => (
              <div key={bgIndex} className="my-masonry-grid_item min-w-full h-fit hover:scale-125">
                <img
                  src={bg}
                  className="w-full h-auto rounded-xl shadow-2xl"
                  alt={`background-${bgIndex}`}
                />
              </div>
            ))}
          </Masonry>
        </div>
      </main>
    </>
  );
}

export default ArtistGallery;
