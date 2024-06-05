import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ALL_ORDERS, apiClient } from "@utils";
import NewArtistForm from "./NewArtistForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPesoSign,
  faMoneyBillTrendUp,
  faPenNib,
  faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { OrdersTable, ArtistJobsTable } from "@pages";
import { useArtistData } from "@layouts";

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
  const { artistData, isLoading, error } = useArtistData();
  const [showAvailableJobs, setShowAvailableJobs] = useState(true);
  const [showArtistJobs, setShowArtistJobs] = useState(false);
  const { data: orderData, isLoading: orderLoading } = useQuery<Order[]>({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ORDERS);
      return response.data;
    },
  });
  
  // console.log("ARTIST DATA", artistData?.id);
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
              <div className="w-full h-[40vh] flex-center flex-row gap-24 ps-32">
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
                    icon={faFileCircleCheck}
                    className="icon--rounded"
                  />
                  <div className="flex flex-col gap-2 items-start">
                    <h2 className="text-xl tracking-wider">Completed Jobs</h2>
                    <h1 className="text-3xl tracking-wider font-bold">
                      {
                        orderData?.filter(
                          (order) =>
                            order.order_status === "completed" &&
                            order.workforce_id === parseInt(artistData.workforce_id)
                        ).length
                      }
                    </h1>
                  </div>
                </div>

                <div className="grid-green w-[22%] h-[20vh]">
                  <FontAwesomeIcon icon={faPenNib} className="icon--rounded" />
                  <div className="flex flex-col gap-2 items-start">
                    <h2 className="text-xl tracking-wider">In Progress</h2>
                    <h1 className="text-3xl tracking-wider font-bold">
                      {
                        orderData?.filter(
                          (order) =>
                            order.order_status === "in_progress" &&
                            order.workforce_id === parseInt(artistData.workforce_id)
                        ).length
                      }
                    </h1>
                  </div>
                </div>
              </div>

              <div className="w-full h-1/2 flex justify-end pr-40">
                <div className="w-3/4 col-span-4 row-span-4 col-start-2 rounded-2xl border-4 border-green px-6 py-4 shadow-md flex flex-col gap-2 overflow-y-auto z-10">
                  <div className="flex flex-col gap-2">
                    <div className="w-full py-2 border-b-2 border-gray-400/60 flex gap-3 text-3xl font-semibold font-header">
                      <h1
                        className={`cursor-pointer ${
                          showAvailableJobs ? "" : "text-gray-400/70 font-light"
                        }`}
                        onClick={() => {
                          setShowAvailableJobs(true);
                          setShowArtistJobs(false);
                        }}
                      >
                        Available Jobs
                      </h1>

                      <h1
                        className={`cursor-pointer border-l-2 border-gray-400/60 pl-4 ${
                          showArtistJobs ? "" : "text-gray-400/70 font-light"
                        }`}
                        onClick={() => {
                          setShowAvailableJobs(false);
                          setShowArtistJobs(true);
                        }}
                      >
                        My Jobs
                      </h1>
                    </div>

                    <div className="w-full max-h-full pr-2 overflow-y-auto">
                      {/* Available Jobs Table */}
                      {showAvailableJobs && (
                        <div className="px-3 py-3 cursor-default bg-white border-green/50 border-2 rounded-2xl">
                          <OrdersTable
                            data={orderData ?? []}
                            isLoading={orderLoading}
                            paginationRowsPerPageArray={[2, 5, 10]}
                          />
                        </div>
                      )}

                      {/* Artist's Jobs */}
                      {showArtistJobs && <ArtistJobsTable />}
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
