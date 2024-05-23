import { useState } from "react";
import { Modal } from "@components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "@hooks";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  ALL_ITEMS,
  PAYMENT,
  DELETE_ITEM,
  apiClient,
  createCheckoutSession,
} from "@utils";
import { Navbar } from "@components";

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
  const [itemsBeingRemoved, setItemsBeingRemoved] = useState<number[]>([]);
  const [items, setItems] = useState<Item[] | undefined>([]);
  const { fetchData } = useFetch();

  const { isLoading: isPending, isError } = useQuery<Item[]>({
    queryKey: ["allItems"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ITEMS);
      setItems(response.data);
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

  const handleDeleteItem = (itemId: number) => {
    setItemsBeingRemoved((prevItems) => [...prevItems, itemId]);
    setTimeout(async () => {
      try {
        await fetchData(DELETE_ITEM(itemId), { method: "DELETE" });
        setItems((prevItems) =>
          prevItems?.filter((item) => item.id !== itemId)
        );
        setCheckoutItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter((id) => id !== itemId)
        );
        setItemsBeingRemoved((prevItems) =>
          prevItems.filter((id) => id !== itemId)
        );
      } catch (error) {
        console.error("Error deleting item:", error);
        setItemsBeingRemoved((prevItems) =>
          prevItems.filter((id) => id !== itemId)
        );
      }
    }, 500);
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
    <div className="overflow-hidden">
      <Navbar />
      <div className=" relative items-center bg-ivory h-[80vh] py-4 flex flex-col overflow-y-auto">
        {/* <img
          src="/src/assets/doodle_neub.png"
          alt="Logo"
          className="absolute top-0 left-[25%] h-42 -rotate-6 aspect-square"
        />
        <img
          src="/src/assets/doodle_neub.png"
          alt="Logo"
          className="absolute top-0 right-[25%] h-42 -rotate-6 aspect-square"
        /> */}
        <h1 className="p-4 text-4xl font-black">Your Cart</h1>
        {items?.map((item) => (
          <div
            key={item.id}
            className={`rounded-3xl w-2/3 ${
              itemsBeingRemoved.includes(item.id) ? "fade-out" : ""
            }`}
          >
            <div className="mb-6 rounded-lg bg-white w-full p-6 shadow-retro__dark flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <img
                  src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="product-image"
                  className="rounded-lg w-20"
                />
                <div className="cursor-default">
                  <p className="font-extrabold">{item.art_style}</p>
                  <p className="font-extrabold">PHP {item.amount}0</p>
                  <div className="flex text-gray-400 gap-2">
                    <p>{item.background_url}</p> |
                    <p>number of heads: {item.number_of_heads}</p>|
                    <p>{item.picture_style}</p>
                  </div>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faTrashCan}
                className="w-6 ms-3 transform hover:text-red-500 cursor-pointer"
                onClick={() => handleDeleteItem(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="sticky h-[5rem] bottom-0 z-10 py-6 px-8 w-full border-dashed flex justify-end gap-4 items-center border-t-4 border-black bg-ivory">
        <p className="text-red-400">*Add Total Amount here*</p>
        <button
          onClick={handleCheckout}
          disabled={!isAnyItemSelected}
          className={`font-bold border bg-blue shadow-retro__dark border-dark py-2 px-12 rounded-lg ${
            !isAnyItemSelected && "opacity-50 cursor-not-allowed"
          }`}
        >
          Checkout
        </button>
      </div>

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
    </div>
  );
}

export default Checkout;
