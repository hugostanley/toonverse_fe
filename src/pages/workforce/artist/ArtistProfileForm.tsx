import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { apiClient } from "@utils";
import { ALL_ARTISTS } from "@utils";

type Info = {
  first_name: string;
  last_name: string;
  bio: string;
  billing_address: string;
  mobile_number: number | string;
};

function ArtistProfileForm() {
  const [info, setInfo] = useState<Info | any>({
    first_name: "",
    last_name: "",
    bio: "",
    billing_address: "",
    mobile_number: "",
  });

  const handleChange = (name: keyof Info, value: string | number) => {
    setInfo((prevInfo: any) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   createInfoMutation.mutate(info)
  };

 
const createInfoMutation = useMutation({
    mutationFn: async (info) => {
        try {
          const response = await apiClient.post(ALL_ARTISTS, info);
          console.log(response);
          return response;
        } catch (error) {
          throw new Error();
        }
      },
})
  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          value={info.first_name}
          onChange={(e) => handleChange('first_name', e.target.value)}
        />
        <br />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={info.last_name}
          onChange={(e) => handleChange('last_name', e.target.value)}
        />
        <br />
         <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          value={info.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
        />
        <br />
         <label htmlFor="billing_address">Billing Address</label>
        <input
          type="text"
          name="billing_address"
          value={info.billing_address}
          onChange={(e) => handleChange('billing_address', e.target.value)}
        />
        <br />
        <label htmlFor="mobile_number">Contact No.</label>
        <input
          type="number"
          name="mobile_number"
          value={info.mobile_number}
          onChange={(e) => handleChange('mobile_number', Number(e.target.value))}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ArtistProfileForm;
