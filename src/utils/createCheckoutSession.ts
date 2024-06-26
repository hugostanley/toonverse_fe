import axios, { AxiosError } from "axios";
import { FE_BASE_URL } from "@utils";

interface Item {
  id: number;
  amount: number;
  background_url: string;
  art_style: string;
  number_of_heads: number;
  picture_style: string;
}

export const createCheckoutSession = async (checkoutItems: Item[]) => {
  const payload = {
    data: {
      attributes: {
        send_email_receipt: true,
        show_description: false,
        show_line_items: true,
        cancel_url: `${FE_BASE_URL}/checkout`,
        line_items: checkoutItems.map((item) => ({
          currency: "PHP",
          amount: item.amount * 100,
          name: `toonverse-${item.art_style}-${item.id}`,
          quantity: 1,
        })),
        success_url: `${FE_BASE_URL}/checkout`,
        payment_method_types: ["card", "gcash", "paymaya"],
      },
    },
  };

  try {
    const response = await axios.post(
      "https://api.paymongo.com/v1/checkout_sessions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Basic c2tfdGVzdF9mbVF4V0xoQllld1c5b2YxSFFnRDI5dHA6QVZJT04hdG9vbnZlcnNlMjAyNA==",
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error creating checkout session:",
      axiosError.response?.data || axiosError.message
    );
    throw error;
  }
};
