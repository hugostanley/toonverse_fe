import { InviteArtist, WorkforceNavbar } from '@pages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faMoneyBillTrendUp, faPenNib } from "@fortawesome/free-solid-svg-icons";

function AdminDashboard() {
  return (
    <main className='w-full h-full bg-ivory'>
      <WorkforceNavbar />
      <section className='w-full h-[92%] p-4 flex flex-col gap-2'>        
        <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-4 p-2">
          <div className="relative rounded-2xl bg-green backdrop-blur-sm row-span-4 p-2 flex flex-col justify-center">
            <InviteArtist btnColor='yellow' formClassName='flex flex-col gap-4 p-4'/>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='absolute -bottom-2 left-0'><path fill="#FDF7E1" fillOpacity="1" d="M0,0L48,37.3C96,75,192,149,288,165.3C384,181,480,139,576,149.3C672,160,768,224,864,229.3C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          </div>

          <div className='grid-green'>
            <FontAwesomeIcon icon={faMoneyBillTrendUp} className='icon--rounded' />
            <div className='flex flex-col gap-2'>
              <h2 className='text-xl tracking-wider'>Total Sales</h2>
              <h1 className='text-4xl tracking-wider font-bold'>Php 0.00</h1>
            </div>
          </div>

          <div className='grid-green'>
            <FontAwesomeIcon icon={faBagShopping} className='icon--rounded' />
            <div className='flex flex-col gap-2'>
              <h2 className='text-xl tracking-wider'>Pending Orders</h2>
              <h1 className='text-4xl tracking-wider font-bold'>0</h1>
            </div>
          </div>

          <div className='grid-green'>
            <FontAwesomeIcon icon={faPenNib} className='icon--rounded'/>
            <div className='flex flex-col gap-2'>
              <h2 className='text-xl tracking-wider'>In Progress</h2>
              <h1 className='text-4xl tracking-wider font-bold'>0</h1>
            </div>
          </div>

          <div className="col-span-2 row-span-3 col-start-2 rounded-2xl border-4 border-green px-6 py-4 shadow-md">
            <h2 className='text-2xl tracking-wider'>Order History</h2>
            <small>Note: Latest 10 only</small>
          </div>

          <div className="row-span-3 col-start-4 rounded-2xl border-4 border-green px-6 py-4 shadow-md">
            <h2 className='text-2xl tracking-wider'>Newest Artists</h2>
            <small>Note: Latest 10 only</small>
          </div>
        </div>
      
      </section>  
    </main>
  )
}

export default AdminDashboard
