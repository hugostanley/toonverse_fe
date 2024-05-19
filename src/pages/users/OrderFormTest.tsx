import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { rmBg } from "@assets";
import { createItem } from '../../utils/ItemServices';

type Order = {
    background_url: string;
    picture_style: string;
    art_style: string;
    ref_photo_url: string;
    number_of_heads: number;
    notes: string;
    amount: number;
  };

function OrderFormTest() {
  const p_style = ["full_body", "half_body", "shoulders_up"];
  const a_style = ["bobs_burger", "rick_and_morty", "vector"];
  const num = Array.from({ length: 10 }, (_, index) => index + 1);

  const [order, setOrder] = useState<Order>({
    background_url: "",
    picture_style: "",
    art_style: "",
    ref_photo_url: "",
    number_of_heads: 1,
    notes: "",
    amount: 0,
  });

  const [clickedNum, setClickedNum] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // Define mutation hook for creating an order
  const createOrderMutation = useMutation({
    mutationFn: createItem,
    onSuccess: (data) => {
      // On success, you can perform any necessary actions, such as updating the UI or fetching updated data
      console.log("Order created:", data);
      // For example, you might want to fetch updated data after creating the order
      queryClient.invalidateQueries<string[]>(["orders"]);

    },
  });

  const handleChange = (name: string, value: string | number) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
    if (name === "number_of_heads") {
      setClickedNum(value as number);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger the mutation with form data
    createOrderMutation.mutate(order);
  };

  return (
    <div>
      {/* Display error message if mutation fails */}
      {createOrderMutation.isError && JSON.stringify(createOrderMutation.error)}
      <h1>Create Order</h1>
      <form onSubmit={handleSubmit}>
        <h2>Background URL</h2>
        {rmBg.map((bg, index) => (
          <div key={index}>
            <label htmlFor={bg}>{bg}</label>
            <input
              type="radio"
              name="background_url"
              id={bg}
              value={bg}
              checked={order.background_url === bg}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        ))}
        <h2>Picture Style</h2>
        {p_style.map((pic, index) => (
          <div key={index}>
            <label htmlFor={pic}>{pic}</label>
            <input
              type="radio"
              name="picture_style"
              id={pic}
              value={pic}
              checked={order.picture_style === pic}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        ))}
        <h2>Art Style</h2>
        {a_style.map((pic, index) => (
          <div key={index}>
            <label htmlFor={pic}>{pic}</label>
            <input
              type="radio"
              name="art_style"
              id={pic}
              value={pic}
              checked={order.art_style === pic}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        ))}
        <h2>Number of Heads</h2>
        {num.map((index) => (
          <button
            key={index}
            name="number_of_heads"
            onClick={() => handleChange("number_of_heads", index)}
            className={`w-16 border p-2 m-1 text-center cursor-pointer ${
              index === clickedNum ? "bg-blue-500" : "bg-gray-200"
            }`}
          >
            {index}
          </button>
        ))}
        <h2>Price</h2>
        <label htmlFor="amount">$0.99</label>
        <input
          type="checkbox"
          name="amount"
          id="amount"
          value={0.99}
          checked={order.amount === 0.99}
          onChange={(e) => handleChange(e.target.name, e.target.checked ? 0.99 : 0)}
        />
        <h2>Reference Photo URL</h2>
        <label htmlFor="ref_photo_url">ref_photo_url: https://i.postimg.cc/MKGJWgTn/heart-portal.png</label>
        <input
          type="checkbox"
          name="ref_photo_url"
          id="ref_photo_url"
          value="https://i.postimg.cc/MKGJWgTn/heart-portal.png"
          checked={order.ref_photo_url === "https://i.postimg.cc/MKGJWgTn/heart-portal.png"}
          onChange={(e) => handleChange(e.target.name, e.target.checked ? e.target.value : "")}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  
}

export default OrderFormTest;
