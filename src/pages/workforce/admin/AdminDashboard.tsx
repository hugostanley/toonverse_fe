import { ArtistsList, InviteArtist, OrdersTable } from "@pages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faMoneyBillTrendUp,
  faPenNib,
  faCashRegister,
  faPesoSign,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function AdminDashboard() {
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
              0.00
            </h1>
          </div>
        </div>

        <div className='grid-green'>
          <FontAwesomeIcon icon={faMoneyBillTrendUp} className='icon--rounded' />
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl tracking-wider'>Total Profit</h2>
            <h1 className='text-3xl tracking-wider font-bold flex gap-2'>
              <FontAwesomeIcon icon={faPesoSign} />
              0.00
            </h1>
          </div>
        </div>

        <div className='grid-green'>
          <FontAwesomeIcon icon={faBagShopping} className='icon--rounded' />
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl tracking-wider'>Pending Orders</h2>
            <h1 className='text-3xl tracking-wider font-bold'>0</h1>
          </div>
        </div>

        <div className='grid-green'>
          <FontAwesomeIcon icon={faPenNib} className='icon--rounded' />
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl tracking-wider'>In Progress</h2>
            <h1 className='text-3xl tracking-wider font-bold'>0</h1>
          </div>
        </div>

        <div className='col-span-4 row-span-4 col-start-2 rounded-2xl border-4 border-green px-6 py-4 shadow-md flex flex-col gap-2 overflow-y-auto'>
          <h2 className='text-2xl tracking-wider font-bold'>All Orders</h2>
          <div className="w-full h-fit px-3 py-3 cursor-default bg-white border-green/50 border-2 rounded-2xl">
            <OrdersTable />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
