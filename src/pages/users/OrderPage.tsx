import { useState } from "react";
import { CButton, CCarousel, CCarouselItem } from "@coreui/react";
import { Footer, Navbar } from "@components";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { categories } from "@assets";
import { useFetch } from "@hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ALL_ITEMS } from "@utils";

type Order = {
  background_url: string;
  picture_style: string;
  art_style: string;
  number_of_heads: number;
  amount: number
};

function OrderPage() {
  const location = useLocation();
  const parts = location.pathname.split("/");
  const paramspath = parts[parts.length - 1];
  const Category = categories.find(
    (category) => category.category === paramspath
  );

  const { fetchData } = useFetch();
  const queryClient = useQueryClient();

  const [order, setOrder] = useState<Order>({
    background_url: "",
    picture_style: "",
    art_style: paramspath,
    number_of_heads: 1,
    amount: 0.99
  });

  const handleChange = (name: string, value: string | number | File | null) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOrderMutation.mutate(order);
  };

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetchData(ALL_ITEMS, {
          method: "POST",
          data: order,
        });
        console.log(response);
        return response;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: (data) => {
      console.log("Order created:", data);
    },
    onError: (error: any) => {
      console.error("Error creating item:", error);
    },
  });

  return (
    <>
      <div className="full-size border-2 border-black bg-yellow">
        <Navbar />
        <div className="full-size text-[3rem] flex-center relative">
          <img
            src="/src/assets/flower_neub.png"
            alt="flower"
            className="absolute middle right-[6rem] -rotate-45"
          />
          <img
            src="/src/assets/flower_neub.png"
            alt="flower"
            className="absolute top-[8rem] left-[0.5rem] -rotate-45"
          />
          <img
            src="/src/assets/doodle_neub.png"
            alt="flower"
            className="absolute top-[25rem] left-[0.5rem] -rotate-45"
          />
          <img
            src="/src/assets/doodle_neub.png"
            alt="flower"
            className="absolute bottom-[8rem] right-[0.5rem] rotate-5"
          />
          <div className="absolute w-full h-screen">
            <CCarousel controls indicators>
              {Category?.sample.map((sample, index) => (
                <CCarouselItem key={index}>
                  <div className="w-full h-screen flex-center">
                    <img
                      src={sample}
                      alt={`sample${index + 1}`}
                      className="w-fit h-[90vh] border-[0.5rem] border-black"
                    />
                  </div>
                </CCarouselItem>
              ))}
            </CCarousel>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full h-[50vh] border-2 border-black flex-center text-[3rem] bg-blue relative">
            <h1 className="absolute top-0 z-10 text-white">
              Step 1: Select Background
            </h1>
            <img
              src="/src/assets/cloud.png"
              alt="cloud"
              className="absolute top-0 left-1 min-w-[10%] z-10"
            />
            <img
              src="/src/assets/cloud.png"
              alt="cloud"
              className="absolute top-3 right-2 min-w-[10%] z-10"
            />
            <img
              src="/src/assets/cloud.png"
              alt="cloud"
              className="absolute bottom-3 left-56 min-w-[10%] z-0"
            />
            <img
              src="/src/assets/cloud.png"
              alt="cloud"
              className="absolute -bottom-5 right-96 min-w-[10%] z-10"
            />
            <img
              src="/src/assets/cloud.png"
              alt="cloud"
              className="absolute top-3 right-1/3 min-w-[10%] z-0"
            />
            <div className="absolute -bottom-8 w-[80%] h-[40vh] ">
              <CCarousel controls interval={false}>
                {Category?.backgrounds.map((bg, index) => (
                  <CCarouselItem key={index}>
                    <div className="flex-center justify-evenly flex-row w-full h-[30vh] relative">
                      <img
                        src={bg}
                        alt={`bg${index}`}
                        className="bg-white w-fit h-[30vh] border-4 border-white"
                      />
                      <input
                        type="radio"
                        name="background_url"
                        value={bg}
                        checked={order.background_url === bg}
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                        className="size-6 absolute bottom-2"
                      />
                    </div>
                  </CCarouselItem>
                ))}
              </CCarousel>
            </div>
          </div>
          <div className="full-size text-[3rem] bg-green relative">
            <div className="absolute z-10 flex flex-col py-[2rem] px-[5rem] w-full h-[90vh]">
              <h1 className="text-white">
                Step 2: Select Number of People and Pets
              </h1>
              <div className="w-[90%] h-[15vh] flex-center justify-evenly flex-wrap">
                {Category?.number_of_heads.map((num) => (
                  <CButton
                    color="light"
                    variant="outline"
                    key={num}
                    name="number_of_heads"
                    value={num}
                    onClick={() => handleChange("number_of_heads", num)}
                    className={`border border-white w-[7%] h-[7vh] text-white rounded-lg text-[3rem] flex-center ${
                      order.number_of_heads === num ? "bg-white text-black" : ""
                    }`}
                  >
                    {num}
                  </CButton>
                ))}
              </div>
              <h1 className="text-white">Step 3: Select Picture Style</h1>
              <div className="w-full h-[50vh] flex-center justify-evenly">
                <div className="w-[30%] h-[35vh] flex-center flex-row relative">
                  <img
                    src="/src/assets/full-size.png"
                    alt="full-body"
                    className="w-[50%] h-[30vh]"
                  />
                  <h1 className="flex flex-wrap text-[2rem] font-bold text-green">
                    FULL BODY
                  </h1>
                  <input
                    type="radio"
                    name="picture_style"
                    value="full_body"
                    checked={order.picture_style === "full_body"}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    className="size-6 absolute bottom-2 left-0"
                  />
                </div>
                <div className="w-[30%] h-[35vh] flex-center flex-col relative">
                  <img
                    src="/src/assets/hero-bg.png"
                    alt="half-body"
                    className="w-full h-[30vh]"
                  />
                  <h1 className="flex flex-wrap text-[2rem] font-bold text-green">
                    HALF BODY
                  </h1>
                  <input
                    type="radio"
                    name="picture_style"
                    value="half_body"
                    checked={order.picture_style === "half_body"}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    className="size-6 absolute bottom-2 left-0"
                  />
                </div>
                <div className="w-[30%] h-[35vh] flex-center flex-row relative">
                  <img
                    src="/src/assets/bob_head.png"
                    alt="shoulders_up"
                    className="w-[50%] h-[35vh]"
                  />
                  <h1 className="flex flex-wrap text-[2rem] font-bold text-green">
                    SHOULDERS UP
                  </h1>
                  <input
                    type="radio"
                    name="picture_style"
                    value="shoulders_up"
                    checked={order.picture_style === "shoulders_up"}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    className="size-6 absolute bottom-2 left-0"
                  />
                </div>
              </div>
            </div>
            <img
              src="/src/assets/divider.png"
              alt="divider"
              className="w-full max-h-screen absolute top-0 z-0"
            />
          </div>
          <div className="w-full h-screen flex-center text-[3rem] bg-green flex-row flex-wrap">
            <div className="w-[50%] h-screen text-white px-2 flex-center flex-col gap-[12.5rem]">
              <h1>Step 4: Upload Your Photo</h1>
              <div className="w-[50%] h-[20vh] border-[0.3rem] border-white rounded-[5rem] text-[3.5rem] flex-center">
                <h1>Upload Image</h1>
              </div>
            </div>
            <div className="w-[50%] h-screen text-white px-2 flex-center flex-col gap-4">
              <h1>Step 5: Additional Notes on your Order</h1>
              <textarea
                name="notes"
                id="notes"
                className="w-[80%] h-[40vh] rounded-2xl text-black text-[1.5rem] p-[1rem]"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="w-full h-[40vh] border-2 border-black flex-center">
            <input type="hidden" value={0.99} name="amount" onChange={(e) => handleChange(e.target.name, e.target.value)}/>
            <button type="submit" className="w-[30%] h-[30vh] border-2 border-black bg-pink rounded-[7rem] flex-center">
              <FontAwesomeIcon icon={faCartPlus} className="w-full h-[20vh]" />
            </button>
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
}

export default OrderPage;
