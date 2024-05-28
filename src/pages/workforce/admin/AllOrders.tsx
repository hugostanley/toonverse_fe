import { OrdersTable } from "@pages";
import { useQuery } from "@tanstack/react-query";
import { ALL_ORDERS, apiClient } from "@utils";

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


function AllOrders() {
  const { data, isLoading } = useQuery<Order[]>({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ORDERS);
      return response.data;
    },
  })
  return (
    <main className="w-full h-[92%] p-4 flex flex-col gap-3">
      <h1 className="w-full py-2 border-b-2 border-gray-400/60 flex justify-between text-3xl font-bold font-header">
        Orders
      </h1>
      <section className="w-full max-h-full px-2 overflow-y-auto">
        <div className="px-3 py-3 cursor-default bg-white border-green/50 border-2 rounded-2xl">
          <OrdersTable data={data ?? []} isLoading={isLoading} />
        </div>
      </section>
    </main>
  )
}

export default AllOrders
