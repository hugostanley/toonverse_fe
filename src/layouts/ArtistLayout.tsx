import { Outlet, useOutletContext } from "react-router-dom";
import { ArtistSidebar } from "@pages";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ALL_ARTISTS, apiClient } from "@utils";

type Artist = {
  email: string;
  id: number;
  bio: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  billing_address: string;
  total_earnings: string | any;
  created_at: string;
  updated_at: string;
  workforce_id: string;
};

type ArtistContext = {
  artistData: Artist | null;
  isLoading?: boolean;
  error?: Error | null;
};

export function useArtistData() {
  return useOutletContext<ArtistContext>();
}

function ArtistLayout() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const { data, isLoading, error } = useQuery<Artist[]>({
    queryKey: ["ArtistProfile"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ARTISTS);
      return response.data;
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setArtistData(data[0]);
    }
  }, [data, artistData]);

  useEffect(() => {
    const updateDateTime = () => {
      const options: any = {
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const now = new Date().toLocaleString("en-US", options);
      setCurrentDateTime(now);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="w-full h-full bg-ivory">
      {/* YELLOW LEFT SIDE ELEMENT */}
      {artistData && (
        <>
          <aside className="fixed z-10 left-0 w-[20%] h-screen bg-yellow flex-center items-start flex-col gap-14 max-w-[20%]">
            <h1 className="max-w-[80%] h-[20vh] ps-8 capitalize text-[2.5rem] text-justify flex flex-col gap-1 font-semibold justify-center">
              <p className="text-[2rem] font-normal">Hello,</p>
              <p className="flex gap-1 tracking-widest">
                <span className="truncate">{artistData?.first_name}</span>!
              </p>
            </h1>
            <div className="w-full  h-[55vh] text-left px-8 flex flex-col gap-2">
              <h1 className="text-[1.8rem] font-bold">{currentDateTime}</h1>
              <h1 className="text-[1.3rem]">To-do Revision</h1>
              <h1 className="font-bold">newest</h1>
              <hr className=" border-1 border-black border-dashed" />
              <h1 className="w-full h-[2vh] truncate">
                Job# : Order Remark this is a link.....
              </h1>
            </div>
            <img
              src="/src/assets/art-pad.png"
              alt=""
              className="fixed right-6 bottom-0 opacity-60"
            />
          </aside>
        </>
      )}

      <ArtistSidebar />
      <Outlet
        context={{ artistData, isLoading, error } satisfies ArtistContext}
      />
    </main>
  );
}

export default ArtistLayout;
