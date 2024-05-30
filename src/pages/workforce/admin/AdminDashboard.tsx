import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faMoneyBillTrendUp,
  faPenNib,
  faCashRegister,
  faPesoSign,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArtistsList, InviteArtist, OrdersTable } from "@pages";
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


function AdminDashboard() {
  const { data, isLoading } = useQuery<Order[]>({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ORDERS);
      return response.data;
    },
  })

  function calculateTotalAmount() {
    return data?.reduce((total, order) => total + (+order.amount), 0).toFixed(2) ?? "0.00";
  }

  function calculateTotalProfit() {
    const totalSales = parseFloat(calculateTotalAmount());
    const totalProfit = totalSales * 0.3; 
    return totalProfit.toFixed(2);
  }

  function countOrdersWithStatus(status: string) {
    if (!data) return 0;
  
    const filteredOrders = data.filter(order => order.order_status === status);
    return filteredOrders.length;
  }
  

  return (
    <section className='w-full h-[92%] p-4 flex flex-col gap-2'>
      <div className='w-full h-full grid grid-cols-5 grid-rows-5 gap-3 p-2'>
        <div className='rounded-2xl bg-green row-span-5 p-2 flex flex-col shadow-md'>
          <InviteArtist
            btnColor='yellow'
            formClassName='flex flex-col gap-4 p-4'
          />
          <div className='flex flex-col gap-2 p-4 text-ivory'>
            <Link to="artists">
              <h2 className='text-2xl tracking-wider'>Newest Artists</h2>
            </Link>
            
            <ArtistsList className='border-t-2 border-ivory/45 border-dotted' />
          </div>
        </div>

        <div className='grid-green'>
          <FontAwesomeIcon
            icon={faCashRegister}
            className='icon--rounded'
          />
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl tracking-wider'>Total Sales</h2>
            <h1 className='text-3xl tracking-wider font-bold flex gap-2'>
              <FontAwesomeIcon icon={faPesoSign} />
              {calculateTotalAmount()}
            </h1>
          </div>
        </div>

        <div className='grid-green'>
          <FontAwesomeIcon icon={faMoneyBillTrendUp} className='icon--rounded' />
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl tracking-wider'>Total Profit</h2>
            <h1 className='text-3xl tracking-wider font-bold flex gap-2'>
              <FontAwesomeIcon icon={faPesoSign} />
              {calculateTotalProfit()}
            </h1>
          </div>
        </div>

        <div className='grid-green'>
          <FontAwesomeIcon icon={faBagShopping} className='icon--rounded' />
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl tracking-wider'>Pending Orders</h2>
            <h1 className='text-3xl tracking-wider font-bold'>{countOrdersWithStatus("queued")}</h1>
          </div>
        </div>

        <div className='grid-green'>
          <FontAwesomeIcon icon={faPenNib} className='icon--rounded' />
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl tracking-wider'>In Progress</h2>
            <h1 className='text-3xl tracking-wider font-bold'>{countOrdersWithStatus("in_progress")}</h1>
          </div>
        </div>

        <div className='col-span-4 row-span-4 col-start-2 rounded-2xl border-4 border-green px-6 py-4 shadow-md flex flex-col gap-2'>
          <h2 className='text-2xl tracking-wider font-bold'>All Orders</h2>
          <div className="w-full max-h-full pr-2 overflow-y-auto">
            <div className="px-3 pt-2 cursor-default bg-white border-green/50 border-2 rounded-2xl">
              <OrdersTable data={data ?? []} isLoading={isLoading} paginationRowsPerPageArray={[3, 5, 10, 20, 30]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
