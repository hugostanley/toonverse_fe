import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ALL_ARTISTS, apiClient } from "@utils";
import { ErrorToast } from "@pages";
import { funBox, tempLogoWhite } from "@assets";


type Artist = {
  email?: string;
  id?: number;
  bio: string;
  first_name: string;
  last_name: string;
  mobile_number: string | number;
  billing_address: string;
  total_earnings?: number;
  created_at?: string;
  updated_at?: string;
  workforce_id?: string;
};

function NewArtistForm() {
  const [error, setError] = useState(null);
  const [data, setData] = useState<Artist>({
    first_name: "",
    last_name: "",
    bio: "",
    billing_address: "",
    mobile_number: "",
  });

  const createArtistMutation = useMutation({
    mutationFn: async (newArtist: Artist) => {
      try {
        const response = await apiClient.post(ALL_ARTISTS, newArtist);
        window.location.reload();
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          console.log(error.response.data.error);
          setError(error.response.data.error);
        }
        throw new Error(error);
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createArtistMutation.mutate(data);
  };

  return (
    <div className="full-size relative flex-center">
      {error && (
        <div className="fixed top-32 right-10 w-fit h-fit z-20 uppercase">
          {(error as string[]).map((errorMessage: any, index: any) => (
            <ErrorToast key={index} msgerror={errorMessage} />
          ))}
        </div>
      )}

      <img
        src={tempLogoWhite}
        alt="logo"
        className="absolute top-16 left-16 w-[25%] z-10"
      />
      <div className="w-[50%] h-screen rounded-full bg-green absolute -top-[28rem] -left-[12rem] "></div>
      <h1 className="absolute left-6 bottom-40 font-bold text-[4rem] w-[50%] text-green ">
        Hello, Please complete your details.
      </h1>
      <img
        src={funBox}
        alt="funbox"
        className="w-[35%] h-[98vh] absolute right-24 border-dashed border-4 rounded-[10rem] bg-green shadow-md shadow-black"
      />
      <div className=" w-[25%] h-[60vh] flex-center flex-col rounded-xl absolute right-40 bottom-4 ">
        <form
          className="w-fit h-[50vh] flex-center flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="first_name"
            className="min-h-[7vh] rounded-lg"
            placeholder="First Name"
            value={data.first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            className="min-h-[7vh] rounded-lg"
            placeholder="Last Name"
            value={data.last_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="bio"
            className="min-h-[7vh] rounded-lg"
            placeholder="My bio"
            value={data.bio}
            onChange={handleChange}
          />
          <input
            type="text"
            name="billing_address"
            className="min-h-[7vh] rounded-lg"
            placeholder="Billing Address"
            value={data.billing_address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobile_number"
            maxLength={11}
            className="min-h-[7vh] rounded-lg"
            placeholder="Contact No."
            value={data.mobile_number.toString()}
            onChange={(e) => {
              if (e.target.value.length <= 11) {
                handleChange(e);
              }
            }}
          />
          <button
            type="submit"
            className="font-bold bg-yellow w-[50%] h-[5vh] rounded-md text-green border-4 border-dashed focus:bg-pink shadow-md shadow-black"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewArtistForm;
