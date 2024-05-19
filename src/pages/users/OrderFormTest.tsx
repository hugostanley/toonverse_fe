import React, { useState, useEffect } from 'react';
import { rmBg } from "@assets";

type Order = {
    background_url: string,
    picture_style: string,
    art_style: string,
    ref_photo_url: string,
    number_of_heads: number,
    notes: string,
    amount: number
}

function OrderFormTest() {
  // State to store the selected background as a string
  const [bgSelected, setBgSelected] = useState<string | null>("");

  // Handle change event for radio buttons
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBgSelected(e.target.value); // Update state with selected value
  };

  // Log the selected background whenever it changes
  useEffect(() => {
    console.log(bgSelected); // Log the selected string
  }, [bgSelected]);

  return (
    <form>
      <h1>Background URL</h1><br />
      {rmBg.map((bg, index) => (
        <div key={index}>
          <label htmlFor={bg}>{bg}</label>
          <input 
            type="radio" 
            name="background" 
            id={bg} 
            value={bg} 
            checked={bgSelected === bg} 
            onChange={handleChange} // Update state on change
          /><br />
        </div>
      ))}
    </form>
  );
}

export default OrderFormTest;
