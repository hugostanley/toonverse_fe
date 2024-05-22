import axios from "axios";
import { useState } from "react";
import { Modal } from "@components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ALL_ITEMS, apiClient } from "@utils";

interface Item {
  id: number;
  amount: string;
  background_url: string;
  art_style: string;
  number_of_heads: number;
  picture_style: string;
}

const createCheckoutSession = async (checkoutItems: Item[]) => {
  const payload = {
    data: {
      attributes: {
        send_email_receipt: true,
        show_description: false,
        show_line_items: true,
        line_items: checkoutItems.map((item) => ({
          currency: "PHP",
          name: `toonverse-${item.art_style}-${item.id}`,
        })),
        payment_method_types: ["card", "gcash", "paymaya"],
      },
    },
  };

  try {
    const response = await axios.post(
      "https://api.paymongo.com/v1/checkout_sessions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Basic c2tfdGVzdF9oaDI4YVdZN0dIU1ZuNnl1Rk5vU0ZUbVQ6UCE1NjI0MTM3ODlBc2E=",
        },
      }
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating checkout session:",
      error.response?.data || error
    );
    throw error;
  }
};

function Checkout() {
  type MutateFunction = (items: Item[]) => Promise<any>;
  type IsLoading = boolean;

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<Item[]>([]);
  const [modalCheckout, setModalCheckout] = useState<boolean>(false);
  const {
    mutate: checkout,
    isLoading,
  }: { mutate: MutateFunction; isLoading: IsLoading } = useMutation({
    mutationKey: "createCheckoutSession",
    mutationFn: createCheckoutSession,
  });

  const {
    data: items,
    isPending,
    isError,
  } = useQuery<Item[]>({
    queryKey: ["allItems"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ITEMS);
      return response.data;
    },
  });

  const handleProceed = async () => {
    try {
      const selected =
        items?.filter((item) => selectedItems.includes(item.id)) || [];
      setCheckoutItems(selected);

      const data = await checkout(selected);
      console.log("Checkout session created:", data);
      setModalCheckout(false);
    } catch (error) {
      console.error("Error creating checkout session:", error);
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
    console.log("Selected items:", selected);
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
    <div>
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
              disabled={!checkoutItems.length || isLoading}
            >
              {isLoading ? "Processing..." : "Proceed"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Checkout;
