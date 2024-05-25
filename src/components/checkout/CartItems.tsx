import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Item } from "@utils";

interface CartItemsProps {
  items: Item[];
  itemsBeingRemoved: number[];
  selectedItems: number[];
  handleCheckboxChange: (itemId: number) => void;
  handleDeleteItem: (itemId: number) => void;
}

const CartItems: React.FC<CartItemsProps> = ({
  items,
  itemsBeingRemoved,
  selectedItems,
  handleCheckboxChange,
  handleDeleteItem,
}) => {
  return (
    <div className="relative items-center py-4 flex flex-col overflow max-h-[80vh]">
      <h1 className="p-4 text-4xl font-black">Your Cart</h1>
      {items.map((item) => (
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
  );
};

export default CartItems;
