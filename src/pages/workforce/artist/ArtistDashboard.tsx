import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ALL_ORDERS, apiClient } from "@utils";
import { ALL_ARTISTS } from "@utils";
import NewArtistForm from "./NewArtistForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPesoSign,
  faMoneyBillTrendUp,
  faBagShopping,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";
import { AvailableJobsTable, ArtistSidebar, OrdersTable } from "@pages";


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

type Order = {
  id: number;
  item_id: number;
  payment_id: number;
  workforce_id: number;
  amount: string;
  order_status: string;
  background_url: string;
  number_of_heads: string;
  picture_style: string;
  art_style: string;
  notes?: string | null;
  reference_image: string;
  latest_artwork?: string | null;
  latest_artwork_revision?: string | null;
  created_at: string;
  updated_at: string;
};

function ArtistDashboard() {
  const [visible, setVisible] = useState(false);
  const [artistData, setArtistData] = useState<Artist | null>(null);

  const [currentDateTime, setCurrentDateTime] = useState("");

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
    const intervalId = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const { data, isLoading, error, refetch } = useQuery({
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

  const { data: orderData, isLoading: orderLoading } = useQuery<Order[]>({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ORDERS);
      return response.data;
    },
  });

  return (
    <main>
      <div className="full-size flex-row bg-ivory relative">
      {isLoading ? (
          <div className="loader"></div>
        ) : error ? (
          <div className="error">An error occurred while fetching data.</div>
        ) : artistData ? (
          <>
            {/* dashboard */}
            <div className="full-size">
              <div className="fixed left-0 w-[20%] h-screen bg-yellow flex-center items-start flex-col gap-16 ">
                <h1 className=" w-[60%] h-[25vh] p-8 capitalize text-[2rem] text-justify flex items-center font-semibold">
                  Hello, {artistData.first_name}!
                </h1>
                <div className="w-full h-[50vh] text-left px-8 flex flex-col gap-2">
                  <h1 className="text-[2rem] font-bold  ">{currentDateTime}</h1>
                  <h1 className="text-[1.3rem]">To-do Revision</h1>
                  <h1 className="font-bold">newest</h1>
                  <hr className=" border-1 border-black border-dashed" />
                  <h1 className="w-full h-[2vh] truncate">
                    Job# : Order Remark this is a link.....
                  </h1>
                </div>
              </div>
              <img
                src="/src/assets/art-pad.png"
                alt=""
                className="absolute right-6 bottom-0 opacity-60 "
              />
              <div className="w-full h-[40vh] flex-center flex-row gap-24 pl-14">
                <div className="grid-green w-[22%] h-[20vh] z-10 bg-ivory">
                  <FontAwesomeIcon
                    icon={faMoneyBillTrendUp}
                    className="icon--rounded"
                  />
                  <div className="flex flex-col gap-2 items-start">
                    <h2 className="text-xl tracking-wider">Total Commission</h2>
                    <h1 className="text-3xl tracking-wider font-bold flex gap-2">
                      <FontAwesomeIcon icon={faPesoSign} />
                      {parseFloat(artistData.total_earnings).toFixed(2)}
                    </h1>
                  </div>
                </div>

                <div className="grid-green w-[22%] h-[20vh]">
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="icon--rounded"
                  />
                  <div className="flex flex-col gap-2 items-start">
                    <h2 className="text-xl tracking-wider">Pending Orders</h2>
                    <h1 className="text-3xl tracking-wider font-bold">0</h1>
                  </div>
                </div>

                <div className="grid-green w-[22%] h-[20vh]">
                  <FontAwesomeIcon icon={faPenNib} className="icon--rounded" />
                  <div className="flex flex-col gap-2 items-start">
                    <h2 className="text-xl tracking-wider">In Progress</h2>
                    <h1 className="text-3xl tracking-wider font-bold">0</h1>
                  </div>
                </div>
              </div>
              <div className="w-full h-1/2 flex justify-end pr-40">
                <div className="w-3/4 col-span-4 row-span-4 col-start-2 rounded-2xl border-4 border-green px-6 py-4 shadow-md flex flex-col gap-2 overflow-y-auto z-10">
                  <h2 className="text-2xl tracking-wider font-bold">
                    Available Jobs
                  </h2>

                  <div className="w-full max-h-full pr-2 overflow-y-auto">
                    <div className="px-3 py-3 cursor-default bg-white border-green/50 border-2 rounded-2xl">
                      <OrdersTable
                        data={orderData ?? []}
                        isLoading={orderLoading}
                        paginationRowsPerPageArray={[3, 5, 10, 20, 30]}
                      />
                    </div>
                  </div>
                </div>
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
