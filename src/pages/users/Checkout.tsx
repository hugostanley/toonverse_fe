import { useState } from "react";
import { Modal } from "@components";

interface Item {
  id: number;
  amount: string;
  bg: string;
  numberOfPeoplePets: number;
  pictureStyle: string;
}

function Checkout() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<Item[]>([]);
  const [modalCheckout, setModalCheckout] = useState<boolean>(false);

  const items: Item[] = [
    {
      id: 1,
      amount: "$55.00",
      bg: "couch",
      numberOfPeoplePets: 2,
      pictureStyle: "full body",
    },
    {
      id: 2,
      amount: "$50.00",
      bg: "couch",
      numberOfPeoplePets: 2,
      pictureStyle: "full body",
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
    const selected = items.filter((item) => selectedItems.includes(item.id));
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
                <span className="font-extrabold">number of people/pets:</span>{" "}
                {item.numberOfPeoplePets}
              </p>
              <p>
                <span className="font-extrabold">picture style:</span>{" "}
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
        <h2>Selected Items for Checkout:</h2>
        {checkoutItems.map((item) => (
          <div key={item.id}>
            <p>Amount: {item.amount}</p>
            <p>Background: {item.bg}</p>
            <p>Number of People/Pets: {item.numberOfPeoplePets}</p>
            <p>Picture Style: {item.pictureStyle}</p>
          </div>
        ))}
      </Modal>
    </>
  );
}

export default Checkout;
