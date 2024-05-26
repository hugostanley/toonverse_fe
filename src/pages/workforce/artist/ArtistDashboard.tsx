import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@utils";
import { ALL_ARTISTS } from "@utils";
import ArtistProfileInfo from "./ArtistProfileInfo"; // Import the component

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

function ArtistDashboard() {
  const [visible, setVisible] = useState(false);

  const [artistData, setArtistData] = useState<Artist | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["ArtistProfile"],
    queryFn: async () => {
      const response = await apiClient.get<Artist[]>(ALL_ARTISTS);
      return response.data;
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setArtistData(data[0]);
    }
  }, [data]);

  const formattedEarnings =
    artistData && typeof artistData.total_earnings === "number"
      ? artistData.total_earnings.toFixed(2)
      : "0.00";

  return (
    <main>
      <div className="full-size flex-center flex-row bg-ivory relative">
        <div
          className={`absolute top-0 ${
            visible ? "-left-4" : "-left-[50rem]"
          } w-[40%] h-screen transition-all duration-300`}
        >
          <div className="relative w-[90%] h-screen bg-green rounded-2xl flex-center z-10">
            <ArtistProfileInfo artistData={artistData} />
          </div>
          <button
            className="absolute right-2 top-16 w-[10%] h-[20vh] bg-green rounded-xl  flex-center"
            onClick={() => setVisible(false)}
          >
            {" "}
            <div className="w-[60%] h-[5vh] rounded-full border-2 border-white"></div>
          </button>
        </div>
        <button
          className="absolute -left-4 top-16 w-[5%] h-[20vh] bg-green rounded-xl flex-center shadow-md shadow-black"
          onClick={() => setVisible(true)}
        >
          <div className="w-[50%] h-[5vh] rounded-full border-2 border-white"></div>
        </button>

        <div className="w-[65%] h-screen flex-center flex-col">
          <div className="w-[90%] h-[20vh] flex-center">
            <h1 className="text-[3rem] capitalize font-extrabold">
              Hello, {artistData?.first_name}!
            </h1>
          </div>
          <div className="w-[90%] h-[40vh] rounded-2xl border-4 border-green flex-center">
            <h1>Total Earnings</h1>
            <h1>Php {formattedEarnings}</h1>
          </div>
          <div className="w-[90%] h-[40vh] flex-center flex-row justify-evenly">
            <div className="w-[30%] h-[20vh] border-4 border-green rounded-2xl shadow-md shadow-dark flex-center">
              Pending Order
            </div>
            <div className="w-[30%] h-[20vh] border-4 border-green rounded-2xl shadow-md shadow-dark flex-center">
              Pending Order
            </div>
          </div>
        </div>
        <div className="w-[35%] h-screen flex-center">
          <div className="w-[95%] h-[90vh] border-4 border-green rounded-2xl">
            order list
          </div>
        </div>
      </div>
    </main>
  );
}

export default ArtistDashboard;
