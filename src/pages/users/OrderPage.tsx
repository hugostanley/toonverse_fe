import { useState } from "react";
import { CCarousel, CCarouselItem } from "@coreui/react";
import { Footer, Navbar } from "@components";
import { useNavigate, useParams } from "react-router-dom";
import { categories } from "@assets";
import { useMutation } from "@tanstack/react-query";
import { ALL_ITEMS, apiClientFormData } from "@utils";
import ErrorToast from "../errors/ErrorToast";

type Order = {
  background_url: string;
  picture_style: string;
  art_style: string | undefined | any;
  number_of_heads: number;
  notes?: string | null;
  image?: File | null | Blob | any;
};

function OrderPage() {
  const navigate = useNavigate();
  const { params: paramspath } = useParams();
  const Category = categories.find(
    (category) => category.category === paramspath
  );
  const [error, setError] = useState<string | any>();
  const [order, setOrder] = useState<Order>({
    background_url: "",
    picture_style: "",
    art_style: paramspath,
    number_of_heads: 1,
    notes: "",
    image: null,
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleChange = (
    name: string,
    value: string | number | File | Blob | null
  ) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const convertOrderToFormData = (order: Order) => {
    const formData = new FormData();
    formData.append("item[background_url]", order.background_url);
    formData.append("item[picture_style]", order.picture_style);
    formData.append("item[art_style]", order.art_style);
    formData.append("item[number_of_heads]", order.number_of_heads.toString());
    if (order.notes) formData.append("item[notes]", order.notes);
    if (order.image) formData.append("item[image]", order.image);

    return formData;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOrderMutation.mutate(order);
  };

  const createOrderMutation: any = useMutation({
    mutationFn: async (order: Order) => {
      try {
        const formData = convertOrderToFormData(order);
        const response = await apiClientFormData.post(ALL_ITEMS, formData);
        if (response) {
          navigate("/checkout");
        }
        return response;
      } catch (error: any) {
        if (error.response && error.response.data) {
          const errorMessages = Object.entries(error.response.data)
            .map(([field, messages]) => {
              return `${field.replace(/_/g, " ")} ${(messages as string[]).join(
                ", "
              )}`;
            })
            .join(", ");
          setError(errorMessages);
          throw new Error(errorMessages);
        }
      }
    },
  });

  return (
    <>
      <div className="border-2 border-black bg-yellow" id="#">
        {error ? (
          <div className="fixed top-32 right-10 w-fit h-fit z-20 uppercase">
            <ErrorToast msgerror={error} />
          </div>
        ) : null}

        {/* navbar */}
        <Navbar />
        {/* sample works */}
        <div className="w-full h-screen text-[2.5rem] flex-center relative">
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
          <div className="absolute w-full h-[90vh] top-4">
            <CCarousel controls indicators>
              {Category?.sample.map((sample, index) => (
                <CCarouselItem key={index}>
                  <div className="w-full h-[90vh] flex-center">
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
        {/* form */}
        <form onSubmit={handleSubmit}>
          {/* background_url */}
          <div className="w-full h-[70vh] border-2 border-black flex-center text-[2.5rem] bg-blue relative">
            <h1 className="absolute top-4 z-10 text-white font-extrabold">
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
            <div className="absolute top-24 w-[80%] h-[50vh] ">
              <CCarousel
                dark
                controls
                interval={false}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (
                    target.tagName === "BUTTON" ||
                    target.tagName === "SPAN"
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                {Category?.backgrounds.map((bg, index) => (
                  <CCarouselItem key={index}>
                    <div className="flex-center justify-evenly flex-row w-full h-[50vh] relative">
                      <img
                        src={bg}
                        alt={`bg${index}`}
                        className="bg-white w-fit h-[50vh] border-4 border-white"
                      />
                      <input
                        type="radio"
                        name="background_url"
                        value={bg}
                        checked={order.background_url === bg}
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                        className="size-6 absolute bottom-4 text-yellow focus:outline-yellow"
                      />
                    </div>
                  </CCarouselItem>
                ))}
              </CCarousel>
            </div>
          </div>

          {/* number_of_heads & picture_style */}
          <div className="full-size text-[2.5rem] bg-green relative">
            <div className="absolute z-10 flex flex-col py-[2rem] px-[5rem] w-full h-[90vh]">
              <h1 className="text-white font-extrabold">
                Step 2: Select Number of People and Pets
              </h1>
              <div className="w-[90%] h-[15vh] flex-center justify-evenly flex-wrap">
                {Category?.number_of_heads.map((num) => (
                  <button
                    type="button"
                    key={num}
                    name="number_of_heads"
                    value={num}
                    onClick={() => handleChange("number_of_heads", num)}
                    className={` w-[7%] h-[7vh] font-bold rounded-2xl text-[2.5rem] flex-center ${
                      order.number_of_heads === num
                        ? "bg-yellow "
                        : "border border-white text-white"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <h1 className="text-white font-extrabold">
                Step 3: Select Picture Style
              </h1>
              <div className="w-full h-[50vh] flex-center justify-evenly">
                <button
                  type="button"
                  name="picture_style"
                  value="full_body"
                  onClick={() => handleChange("picture_style", "full_body")}
                  className={`w-[20%] h-[35vh] flex-center flex-row   ${
                    order.picture_style === "full_body" ? "scale-125" : ""
                  }`}
                >
                  <img
                    src="/src/assets/full_body.png"
                    alt="full_body"
                    className="w-full"
                  />
                </button>
                <button
                  type="button"
                  name="picture_style"
                  value="half_body"
                  onClick={() => handleChange("picture_style", "half_body")}
                  className={`w-[20%] h-[35vh] flex-center flex-col relative  ${
                    order.picture_style === "half_body" ? "scale-125" : ""
                  }`}
                >
                  <img
                    src="/src/assets/half_body.png"
                    alt="half-body"
                    className="w-full"
                  />
                </button>
                <button
                  type="button"
                  name="picture_style"
                  value="shoulders_up"
                  onClick={() => handleChange("picture_style", "shoulders_up")}
                  className={`w-[20%] h-[35vh] flex-center flex-row relative 
                   ${
                     order.picture_style === "shoulders_up" ? "scale-125" : ""
                   }`}
                >
                  <img
                    src="/src/assets/shoulders_up.png"
                    alt="shoulder_up"
                    className="w-full"
                  />
                </button>
              </div>
            </div>
            <img
              src="/src/assets/divider.png"
              alt="divider"
              className="w-full max-h-screen absolute top-0 z-0"
            />
          </div>

          {/* upload photo & notes */}
          <div className="w-full h-[60vh] flex-center text-[2.5rem] bg-green flex-row flex-wrap">
            <div className="w-[50%] h-[60vh] text-white px-2 flex-center flex-col gap-[5rem]">
              <h1 className="font-extrabold">Step 4: Upload Your Photo</h1>
              <div className="w-[50%] h-[20vh] border-[0.3rem] border-white rounded-[5rem] text-[3.5rem] flex-center cursor-pointer px-2 hover:border-dashed relative">
                <label htmlFor="image">
                  {order.image !== null ? (
                    <h1 className="text-[2rem]">{order.image.name}</h1>
                  ) : (
                    "Choose Image"
                  )}
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  required
                  className="absolute w-full  top-0 file:bg-transparent file:text-white file:border-none file:cursor-pointer file:w-full file:h-[20vh] file:opacity-0 focus:rounded-full  focus:outline-white focus:outline-dashed "
                  onChange={(e) => {
                    if (e.target.files) {
                      setOrder({ ...order, image: e.target.files[0] });
                    }
                  }}
                />
              </div>
            </div>
            <div className="w-[50%] h-[60vh] text-white px-2 flex-center flex-col gap-[3rem]">
              <h1 className="font-extrabold">
                Step 5: Additional Notes on your Order
              </h1>
              <textarea
                name="notes"
                id="notes"
                className="w-[80%] h-[25vh] rounded-2xl text-black text-[1.5rem] p-[1rem] outline-none border-none focus:outline-yellow"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="Drawing Notes (Describe Clothing, Background, Face, Pose, Names Etc..)"
              ></textarea>
            </div>
          </div>

          {/* add-to-cart */}
          <div className="w-full h-[50vh] border-2 border-black flex-center flex-col gap-10">
          <h1 className="font-extrabold text-[2.5rem] text-white drop-shadow-xl">Step 6: Add to your cart to checkout.</h1>

            <button
              type="submit"
              className="w-[30%] h-[30vh] border-4 border-black hover:border-dashed  rounded-[7rem] flex-center"
            >
              <img
                src={
                  isHovered
                    ? "/src/assets/addtocart.gif"
                    : "/src/assets/addtocart.png"
                }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                alt="addtocart"
                className=" h-[25vh] "
              />
            </button>
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
}

export default OrderPage;
