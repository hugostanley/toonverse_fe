import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { rmBg } from "@assets"; // Import your background options from assets
import { useFetch } from "@hooks"; // Custom hook for fetching data
import { ALL_ITEMS } from "@utils"; // Your API endpoint

type Order = {
  background_url: string;
  picture_style: string;
  art_style: string;
  number_of_heads: number;
  amount: number;
  image: File | null;
};

function OrderFormTest() {
  const p_style = ["full_body", "half_body", "shoulders_up"];
  const a_style = ["bobs_burger", "rick_and_morty", "vector"];
  const num = Array.from({ length: 10 }, (_, index) => index + 1);
  const { fetchData } = useFetch();

  const [order, setOrder] = useState<Order>({
    background_url: "",
    picture_style: "",
    art_style: "",
    number_of_heads: 1,
    amount: 0.99, 
    image: null,
  });

  const [clickedNum, setClickedNum] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation({
    mutationKey: 'createOrder',
    mutationFn: async () => {
      return await fetchData(ALL_ITEMS, {
        method: "POST",
        data: order,
      });
    },
    onSuccess: (data) => {
      console.log("Order created:", data);
      // queryClient.invalidateQueries(["orders"]);
    },
    onError: (error: any) => {
      // Handle error
      console.error("Error creating item:", error);
    }
  });

  const handleChange = (name: string, value: string | number | File | null) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
    console.log(order)
    if (name === "number_of_heads") {
      setClickedNum(value as number);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(order).forEach(([key, value]) => {
      if (value !== null) {
        if (key === "image") {
          formDataToSend.append(`item[${key}]`, value as File);
        } else {
          formDataToSend.append(`item[${key}]`, String(value));
        }
      }
    });
    createOrderMutation.mutate(formDataToSend); // Corrected variable name
  };
  
  return (
    <div>
      {createOrderMutation.isError && <p>Error: {JSON.stringify(createOrderMutation.error)}</p>}
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
            type="button"
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
        <h2>Upload Image</h2>
        <input
          type="file"
          name="image"
          onChange={(e) => handleChange(e.target.name, e.target.files ? e.target.files[0] : null)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OrderFormTest;
