import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Item } from "@utils";
import { Link } from "react-router-dom";

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
    <div className="relative items-center py-4 flex flex-col overflow max-h-[85%]">
      <h1 className="p-4 text-4xl font-header">Your Cart</h1>
      {items.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <img
            src="/src/assets/empty-cart.png"
            className="w-[20%]"
            alt="Empty Cart"
          />
          <div className="p-4 text-center font-black text-4xl text-red">
            Oop! Your cart is empty!
          </div>
          <p className="text-gray-600">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/#styles"
            className="mt-4 px-6 py-3 bg-blue border-2 border-dark shadow-retro__dark rounded-md hover:bg-pink"
          >
            Go back to catalog
          </Link>
        </div>
      ) : (
        items.map((item) => (
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
                className="w-6 ms-3 transform hover:text-warningRed cursor-pointer"
                onClick={() => handleDeleteItem(item.id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItems;
