import Masonry from "react-masonry-css";
import { useQuery } from "@tanstack/react-query";
import { ALL_ARTWORKS, BASE_URL, apiClient } from "@utils";

function ArtistGallery() {
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["allArtworks"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ARTWORKS);
      console.log(response.data, "artwork");
      return response.data;
    },
  });

  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
  };

  const artworks = data || [];

  return (
    <>
      <main className="h-screen flex justify-end overflow-hidden">
        <div className="w-[80%] h-full z-10 flex flex-col pb-2">
          <h1 className="text-[2rem] font-extrabold text-yellow pl-6 pt-2 border-b-4 border-yellow drop-shadow-lg">
            Artist Gallery
          </h1>
          {isLoading && (
            <div className="w-full h-[80vh] flex-center">
              <div className="loader"></div>
            </div>
          )}
          {error && <p>Error loading artworks. Please try again later.</p>}
          {!isLoading && !error && artworks.length === 0 && (
            <p>No available data</p>
          )}
          {artworks.length > 0 && (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid p-4 overflow-auto h-screen overflow-x-hidden"
              columnClassName="my-masonry-grid_column"
            >
              {artworks.map((artwork: any, artworkIndex: number) => (
                <div
                  key={artwork.id}
                  className="my-masonry-grid_item min-w-full h-fit hover:scale-125"
                >
                  <img
                    src={`${BASE_URL}${artwork.artwork_url}`}
                    className="w-full h-auto rounded-xl shadow-2xl"
                    alt={`artwork-${artworkIndex}`}
                  />
                </div>
              ))}
            </Masonry>
          )}
        </div>
      </main>
    </>
  );
}

export default ArtistGallery;
