import { useState } from "react";
import { rmBg } from "@assets";
import { useFetch } from "@hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ALL_ITEMS } from "@utils";

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
  const queryClient = useQueryClient();

  const [order, setOrder] = useState<Order>({
    background_url: "",
    picture_style: "",
    art_style: "",
    number_of_heads: 1,
    amount: 0.99,
    image: null,
  });

  const handleChange = (name: string, value: string | number | File | null) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

const createOrderMutation = useMutation({
  mutationKey: 'createOrder',
  mutationFn: async (formDataToSend) => {
    try {
      const response = await fetchData(ALL_ITEMS, {
        method: 'POST',
        data: formDataToSend,
      });
      console.log(response)
      return response; 
      // Return the response to indicate success
    } catch (error) {
      throw new Error(error); // Throw an error to handle failure
    }
  },
  onSuccess: (data) => {
    console.log('Order created:', data);
    queryClient.invalidateQueries(['orders']);
  },
  onError: (error: any) => {
    console.error('Error creating item:', error);
  },
});

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // console.log("Current order:", order); // Log the current order object
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
  console.log("FormData to send:", formDataToSend);

//   const dataToSend = {
//     item: {
//         background_url: order.background_url,
//         picture_style: order.picture_style,
//         art_style: order.art_style,
//         number_of_heads: order.number_of_heads,
//         amount: order.amount,
//         image: order.image as File,
//     }
// };
// console.log(dataToSend.item.image, "IMAGE ITO NA")
  createOrderMutation.mutate(formDataToSend);
};



  return (
    <div>
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
        <br />
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
        <br />
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
        <br />
        <h2>Number of Heads</h2>
        {num.map((index) => (
          <div key={index}>
            <label htmlFor={`number_of_heads_${index}`}>{index}</label>
            <input
              type="radio"
              name="number_of_heads"
              id={`number_of_heads_${index}`}
              value={index}
              checked={order.number_of_heads === index}
              onChange={(e) =>
                handleChange(e.target.name, parseInt(e.target.value))
              }
            />
          </div>
        ))}
        <br />
        <h2>Price</h2>
        <label htmlFor="amount">$0.99</label>
        <input
          type="checkbox"
          name="amount"
          id="amount"
          value={0.99}
          checked={order.amount === 0.99}
          onChange={(e) =>
            handleChange(e.target.name, e.target.checked ? 0.99 : 0)
          }
        />
        <br />
        <h2>Upload Image</h2>
        <input
          type="file"
          name="image"
          onChange={(e) =>
            handleChange(
              e.target.name,
              e.target.files ? e.target.files[0] : null
            )
          }
        />
        <br />
        <button type="submit">Submit</button>
        {createOrderMutation.isError && (
          <p>Error: {JSON.stringify(createOrderMutation.error)}</p>
        )}
      </form>
    </div>
  );
}

export default OrderFormTest;
