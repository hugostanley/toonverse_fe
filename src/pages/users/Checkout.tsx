import { useState } from "react";
import { Modal } from "@components";
import { useFetch } from "@hooks";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ALL_ITEMS, PAYMENT, apiClient, createCheckoutSession } from "@utils";

interface Item {
  id: number;
  amount: number;
  background_url: string;
  art_style: string;
  number_of_heads: number;
  picture_style: string;
}

interface PaymentRecordPayload {
  payment: {
    checkout_session_id: string;
    total_amount: number;
    payment_status: string;
    item_ids: number[];
  };
}

function Checkout() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<Item[]>([]);
  const [modalCheckout, setModalCheckout] = useState<boolean>(false);
  const { fetchData } = useFetch();

  const {
    data: items,
    isLoading: isPending,
    isError,
  } = useQuery<Item[]>({
    queryKey: ["allItems"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ITEMS);
      return response.data;
    },
  });

  const { mutate: PaymentMutation } = useMutation({
    mutationFn: async (paymentRecordPayload: PaymentRecordPayload) => {
      try {
        const paymentResponse = await fetchData(PAYMENT, {
          method: "POST",
          data: paymentRecordPayload,
        });
        return paymentResponse;
      } catch (error) {
        throw new Error("network response was not okay");
      }
    },
  });

  const handleProceed = async () => {
    try {
      const selected =
        items?.filter((item) => selectedItems.includes(item.id)) || [];
      setCheckoutItems(selected);
      const response = await createCheckoutSession(selected);
      console.log("Checkout session response:", response.data);

      const { id, attributes } = response.data;
      const { payment_intent } = attributes;

      const paymentRecordPayload: PaymentRecordPayload = {
        payment: {
          checkout_session_id: id,
          total_amount: payment_intent.attributes.amount,
          payment_status: "awaiting_payment_method",
          item_ids: selectedItems,
        },
      };

      PaymentMutation(paymentRecordPayload);
      const checkoutUrl = response.data.attributes.checkout_url;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating payment record:", error);
    }
  };

  const handleCheckboxChange = (itemId: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const handleCheckout = () => {
    const selected =
      items?.filter((item) => selectedItems.includes(item.id)) || [];
    setCheckoutItems(selected);
    setModalCheckout(true);
  };

  const isAnyItemSelected = selectedItems.length > 0;

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading items</div>;
  }

  return (
    <>
      <h1 className="font-black">Cart</h1>
      {items?.map((item) => (
        <div key={item.id} className="py-4 flex">
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedItems.includes(item.id)}
            onChange={() => handleCheckboxChange(item.id)}
          />
          <div>
            <p>
              <span className="font-extrabold">Amount:</span> {item.amount}
            </p>
            <p>
              <span className="font-extrabold">Background:</span>{" "}
              {item.background_url}
            </p>
            <p>
              <span className="font-extrabold">Art Style:</span>
              {item.art_style}
            </p>
            <p>
              <span className="font-extrabold">Number of People/Pets:</span>
              {item.number_of_heads}
            </p>
            <p>
              <span className="font-extrabold">Picture Style:</span>
              {item.picture_style}
            </p>
          </div>
        </div>
      ))}
      <button
        onClick={handleCheckout}
        disabled={!isAnyItemSelected}
        className={`font-bold border border-dark py-2 px-4 rounded-full ${
          !isAnyItemSelected && "opacity-50 cursor-not-allowed"
        }`}
      >
        Checkout
      </button>

      <Modal open={modalCheckout} onClose={() => setModalCheckout(false)}>
        <div className="flex flex-col gap-4 px-4">
          <h2 className="font-bold text-lg">
            Are you sure you want to checkout?
          </h2>
          {checkoutItems.map((item) => (
            <div key={item.id}>
              <p>Amount: {item.amount}</p>
              <p>Background: {item.background_url}</p>
              <p>Number of People/Pets: {item.number_of_heads}</p>
              <p>Art Style: {item.art_style}</p>
              <p>Picture Style: {item.picture_style}</p>
            </div>
          ))}
          <hr className="border-t-solid border-1 border-grey" />
          <div className="flex flex-row justify-center gap-4">
            <button
              className="border border-neutral-300 rounded-lg py-1.5 px-10 bg-blue hover:bg-pink text-light"
              onClick={() => setModalCheckout(false)}
            >
              Close
            </button>
            <button
              className="border border-neutral-300 rounded-lg py-1.5 px-10 bg-blue hover:bg-pink text-light"
              onClick={handleProceed}
              disabled={!checkoutItems.length}
            >
              Proceed
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Checkout;
