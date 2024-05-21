import { useState } from "react";
import { Modal } from "@components";
import { useMutation } from "@tanstack/react-query";

interface Item {
  id: number;
  amount: string;
  bg: string;
  art_style: string;
  numberOfPeoplePets: number;
  pictureStyle: string;
}

// Define the mutation function that will be called when the "Proceed" button is clicked
const createCheckoutSession = async (checkoutItems: Item[]) => {
  const payload = {
    data: {
      attributes: {
        send_email_receipt: true,
        show_description: false,
        show_line_items: true,
        line_items: checkoutItems.map((item) => ({
          currency: "PHP",
          amount: parseInt(item.amount.replace(/[^0-9]/g, ""), 10) * 100, // Convert amount to integer (cents)
          name: `toonverse-${item.art_style}-${item.id}`,
          quantity: item.numberOfPeoplePets,
        })),
        payment_method_types: ["card", "gcash", "paymaya"],
      },
    },
  };

  console.log("Payload being sent:", JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(
      "https://api.paymongo.com/v1/checkout_sessions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization:
            "Basic c2tfdGVzdF9oaDI4YVdZN0dIU1ZuNnl1Rk5vU0ZUbVQ6UCE1NjI0MTM3ODlBc2E=",
        },
        body: JSON.stringify(payload),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Error response from server:", responseData);
      throw new Error("Failed to create checkout session");
    }

    return responseData;
  } catch (error) {
    console.error("Error creating checkout session:", error);
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

  const handleProceed = async () => {
    try {
      // Filter items based on selectedItems
      const selected =
        items && items.filter((item) => selectedItems.includes(item.id));
      setCheckoutItems(selected);

      // Trigger mutation with the filtered items
      const data = await checkout(selected);
      console.log("Checkout session created:", data);
      setModalCheckout(false);
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const items: Item[] = [
    {
      id: 1,
      amount: "$55.00",
      bg: "couch",
      art_style: "rick and morty",
      numberOfPeoplePets: 2,
      pictureStyle: "full body",
    },
    {
      id: 2,
      amount: "$50.00",
      bg: "store",
      art_style: "bobs",
      numberOfPeoplePets: 5,
      pictureStyle: "half body",
    },
  ];

  function handleCheckboxChange(itemId: number) {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  }

  function handleCheckout() {
    const selected =
      items && items.filter((item) => selectedItems.includes(item.id));
    setCheckoutItems(selected);
    console.log("Selected items:", selected);

    setModalCheckout(true);
  }

  const isAnyItemSelected = selectedItems.length > 0;

  return (
    <>
      <h1 className="font-black">Cart</h1>
      {items.map(function (item) {
        return (
          <div key={item.id} className="py-4 flex">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
            <div>
              <p>
                <span className="font-extrabold">amount:</span> {item.amount}
              </p>
              <p>
                <span className="font-extrabold">bg:</span> {item.bg}
              </p>
              <p>
                <span className="font-extrabold">art style:</span>{" "}
                {item.art_style}
              </p>
              <p>
                <span className="font-extrabold">number of people/pets:</span>
                {item.numberOfPeoplePets}
              </p>
              <p>
                <span className="font-extrabold">picture style:</span>
                {item.pictureStyle}
              </p>
            </div>
          </div>
        );
      })}
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
              <p>Background: {item.bg}</p>
              <p>Number of People/Pets: {item.numberOfPeoplePets}</p>
              <p>Art Style: {item.art_style}</p>
              <p>Picture Style: {item.pictureStyle}</p>
            </div>
          ))}
          <hr className="border-t-solid border-1 border-grey" />
          <div className="flex flex-row justify-center">
            <button
              className="border border-neutral-300 rounded-lg py-1.5 px-10 bg-blue hover:bg-pink text-light"
              onClick={() => setModalCheckout(false)}
            >
              Close
            </button>
            <button
              className="border border-neutral-300 rounded-lg py-1.5 px-10 bg-blue hover:bg-pink text-light"
              onClick={() => handleProceed()}
              disabled={!checkoutItems.length || isLoading}
            >
              {isLoading ? "Processing..." : "Proceed"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Checkout;
