import { OrdersTable } from "@pages";

function AllOrders() {
  return (
    <main className="w-full h-[92%] p-4 flex flex-col gap-3">
      <h1 className="w-full py-2 border-b-2 border-gray-400/60 flex justify-between text-3xl font-bold font-header">
        Orders
      </h1>
      <section className="w-full max-h-full px-2 overflow-y-auto">
        <div className="px-3 py-3 cursor-default bg-white border-green/50 border-2 rounded-2xl">
          <OrdersTable />
        </div>
      </section>
    </main>
  )
}

export default AllOrders
