import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@utils";
import { ALL_ARTISTS } from "@utils";
import ArtistProfileInfo from "./ArtistProfileInfo"; // Import the component
import NewArtistForm from "./NewArtistForm";

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
};

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
  }, [data, artistData]);

  const formattedEarnings =
    artistData && typeof artistData.total_earnings === "number"
      ? artistData.total_earnings.toFixed(2)
      : "0.00";

  return (
    <main >
      <div className="full-size flex-center flex-row bg-ivory relative">
        {isLoading ? (
          <div className="loader"></div>
        ) : error ? (
          <div className="error">An error occurred while fetching data.</div>
        ) : artistData ? ( 
          <>
          {/* sidebar */}
            <div
              className={`absolute top-0 ${
                visible ? "right-0" : "hidden"
              } w-[40%] max-w-[40%] h-screen `}
            >
              <div className="absolute right-0 w-[90%] h-screen bg-green rounded-tl-2xl rounded-bl-2xl flex-center z-10">
                <ArtistProfileInfo artistData={artistData} />
              </div>
              <button
                className="absolute left-0 top-16 w-[10%] h-[20vh] bg-green rounded-tl-xl rounded-bl-xl flex-center"
                onClick={() => setVisible(false)}
              >
                
                  <img src="/src/assets/profile-icon.png" alt="profile-icon" className="w-[60%] h-[5vh] rounded-full border-2 border-white" />
                
              </button>
            </div>
            <button
              className="absolute right-0 top-16 w-[5%] h-[20vh] bg-green rounded-tl-xl rounded-bl-xl flex-center shadow-md shadow-black"
              onClick={() => setVisible(true)}
            >
           
                <img src="/src/assets/profile-icon.png" alt="profile-icon" className="w-[50%] h-[5vh] rounded-full border-2 border-white"/>
         
            </button>

              {/* dashboard */}
            <div className="w-[65%] h-screen flex-center flex-col">
              <div className="w-[90%] h-[20vh] flex-center">
                <h1 className="text-[3rem] capitalize font-extrabold">
                  Hello, {artistData?.first_name}!
                </h1>
              </div>
              <div className="w-[90%] h-[40vh] rounded-2xl border-4 border-green flex-center relative">
                <h1 className="absolute top-4 right-8 text-[2.5rem] font-bold">Total Earnings</h1>
                <h1 className="absolute right-32 text-[3.5rem] font-extrabold">₱ {formattedEarnings}</h1>
                <h1 className="absolute bottom-16 right-40 text-[1.2rem]">+{formattedEarnings} {artistData.updated_at}</h1>
              </div>
              <div className="w-[90%] h-[40vh] flex-center flex-row justify-evenly">
                <div className="w-[30%] h-[20vh] border-4 border-green rounded-2xl shadow-md shadow-dark flex-center">
                  Pending Order
                </div>
                <div className="w-[30%] h-[20vh] border-4 border-green rounded-2xl shadow-md shadow-dark flex-center">
                  Job Done
                </div>
              </div>
            </div>
            <div className="w-[35%] h-screen flex-center">
              <div className="w-[95%] h-[90vh] border-4 border-green rounded-2xl flex-center flex-col">
                <img src="/src/assets/temp-logo.png" alt="logo" className="w-[70%] "/>
                <div className="w-full h-[80vh]"></div>
              </div>
            </div>
          </>
        ) : (
          <NewArtistForm />
        )}
      </div>
    </main>
  );
}

export default ArtistDashboard;
