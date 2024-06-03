import { Link } from "react-router-dom";
import { useUserProfile, useUserData } from "@layouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Spinner, LogoutBtn } from "@components";
import { useQuery } from "@tanstack/react-query";
import { ALL_ORDERS, apiClient } from "@utils";
import { LOGOUT_URL } from "@utils";
import { UserOrdersTable } from "@pages";

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

function UserAccount() {
  const { userData } = useUserData();
  const { data: userProfile, isPending } = useUserProfile();
  const { data, isLoading } = useQuery<Order[]>({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ORDERS);
      return response.data;
    },
  });

  if (isPending || !userData) {
    return (
      <section className="w-full h-full p-2 px-4 flex flex-col gap-2">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="w-full h-full p-2 px-4 flex gap-10 overflow-hidden">
      <div className="w-1/4 flex flex-col gap-3">
        <div className="py-2 border-b-2 border-gray-400/60 flex text-3xl font-bold font-header">
          <h1>Account Information</h1>
          <Link
            to="edit"
            className="flex items-center justify-center px-3 text-dark/45 hover:text-dark"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="h-1/2" />
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">{`${userProfile?.first_name} ${userProfile?.last_name}`}</h2>
          <span className="text-sm">
            BIlling Address: {userProfile?.billing_address}
          </span>
        </div>
        <LogoutBtn
          apiUrl={LOGOUT_URL}
          redirectPath="/login"
          className="btn__primary bg-pink"
        />
      </div>
      <div className="w-3/4 h-[85%]">
        <h1 className="py-2 mb-4 border-b-2 border-gray-400/60 flex text-3xl font-bold font-header">
          My Orders
        </h1>
        <div className="w-full max-h-full px-2 bg-white border-4 rounded-2xl border-green/50 overflow-y-auto ">
          <div className="px-3 cursor-default">
            <UserOrdersTable data={data ?? []} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserAccount;
