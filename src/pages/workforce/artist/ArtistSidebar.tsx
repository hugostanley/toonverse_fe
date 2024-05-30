import { useState, useEffect } from "react";
import { ArtistProfileInfo } from "@pages"; 
import { useQuery } from "@tanstack/react-query";
import { ALL_ARTISTS } from "@utils";
import {  apiClient } from "@utils";

type Artist = {
  email: string;
  id: number;
  bio: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  billing_address: string;
  total_earnings: number;
  created_at: string;
  updated_at: string;
  workforce_id: string;
}

function ArtistSidebar() {
  const [artistData, setArtistData] = useState<Artist | any>();
  const [visible, setVisible] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["ArtistProfile"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ARTISTS);
      return response.data;
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setArtistData(
      data[0],
        );
    } 
  }, [data, isLoading, error, setArtistData, visible]);

  return (
    <>
      <div
        className={`absolute top-0 ${
          visible ? "right-0" : "hidden"
        } w-[40%] max-w-[40%] h-screen z-20`}
      >
        <div className="absolute right-0 w-[90%] h-screen bg-green rounded-tl-2xl rounded-bl-2xl flex-center z-20">
          <ArtistProfileInfo artistData={artistData} refetch={refetch} />
        </div>
        <button
          className="absolute left-0 top-16 w-[10%] h-[20vh] bg-green rounded-tl-xl rounded-bl-xl flex-center"
          onClick={() => setVisible(false)}
        >
          <img
            src="/src/assets/profile-icon.png"
            alt="profile-icon"
            className="w-1/2"
          />
        </button>
      </div>
      <button
        className="z-10 absolute right-0 top-16 w-[3.5%] h-[20vh] bg-green rounded-tl-xl rounded-bl-xl flex-center shadow-md shadow-black"
        onClick={() => setVisible(true)}
      >
        <img
          src="/src/assets/profile-icon.png"
          alt="profile-icon"
          className="w-1/2"
        />
      </button>
    </>
  );
}

export default ArtistSidebar