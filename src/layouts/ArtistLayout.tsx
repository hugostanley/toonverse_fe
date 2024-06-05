import { Outlet, useOutletContext } from "react-router-dom";
import { ArtistSidebar } from "@pages";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ALL_ARTISTS, ALL_ORDERS, apiClient } from "@utils";
import { artPad } from "@assets";
import { Link } from "react-router-dom";

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
  workforce_id: number;
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
  const { data, isLoading, error, refetch } = useQuery<Artist[]>({
    queryKey: ["ArtistProfile"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ARTISTS);
      return response.data;
    },
  });

  const { data: orderData } = useQuery({
    queryKey: ["OrdersRemark"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ORDERS);
      const orders = response.data;
      const artistId = artistData?.workforce_id;

      // Filter orders based on whether workforce_id exists and matches artistId
      const filteredOrders = orders.filter(
        (order: any) =>
          order.workforce_id !== null &&
        order.workforce_id === artistId &&
        order.order_status === 'in_progress' &&
        order.remarks !== null
      );

      console.log(filteredOrders, "filtered orders");
      return filteredOrders;
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      refetch()
      setArtistData(data[0]);
    }
  }, [data, artistData, orderData]);

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
              <hr className=" border-1 border-black border-dashed" />
              {orderData?.map((remark: any, id: number) => (
                <Link to="/w/jobs" className="hover:text-green">
                 <h1 className="w-full h-[2vh] truncate" key={`${id}`}>
                  {remark.remarks || "No pending revision"}
                </h1>
                </Link>
               
              ))}
            </div>
            <img
              src={artPad}
              alt="artpad"
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
