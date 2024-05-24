import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navbar } from "@components";
import { useFetch } from "@hooks";
import {
  ALL_ITEMS,
  PAYMENT,
  DELETE_ITEM,
  apiClient,
  createCheckoutSession,
  Item,
} from "@utils";
import { CartItems, CheckoutButton, CheckoutModal } from "@components";

interface PaymentRecordPayload {
  payment: {
    checkout_session_id: string;
    total_amount: number;
    payment_status: string;
    item_ids: number[];
  };
}

function Checkout() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<Item[]>([]);
  const [modalCheckout, setModalCheckout] = useState<boolean>(false);
  const [itemsBeingRemoved, setItemsBeingRemoved] = useState<number[]>([]);
  const [items, setItems] = useState<Item[] | undefined>([]);
  const { fetchData } = useFetch();

  const { isLoading: isPending, isError } = useQuery<Item[]>({
    queryKey: ["allItems"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ITEMS);
      setItems(response.data);
      return response.data;
    },
  });

  const { mutate: PaymentMutation } = useMutation({
    mutationFn: async (paymentRecordPayload: PaymentRecordPayload) => {
      try {
        const paymentResponse = await fetchData(PAYMENT, {
          method: "POST",
          data: paymentRecordPayload,
        });
        return paymentResponse;
      } catch (error) {
        throw new Error("network response was not okay");
      }
    },
  });

  const handleProceed = async () => {
    try {
      const selected =
        items?.filter((item) => selectedItems.includes(item.id)) || [];
      setCheckoutItems(selected);
      const response = await createCheckoutSession(selected);
      console.log("Checkout session response:", response.data);

      const { id, attributes } = response.data;
      const { payment_intent } = attributes;

      const paymentRecordPayload: PaymentRecordPayload = {
        payment: {
          checkout_session_id: id,
          total_amount: payment_intent.attributes.amount,
          payment_status: "awaiting_payment_method",
          item_ids: selectedItems,
        },
      };

      PaymentMutation(paymentRecordPayload);
      const checkoutUrl = response.data.attributes.checkout_url;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating payment record:", error);
    }
  };

  const handleDeleteItem = (itemId: number) => {
    setItemsBeingRemoved((prevItems) => [...prevItems, itemId]);
    setTimeout(async () => {
      try {
        await fetchData(DELETE_ITEM(itemId), { method: "DELETE" });
        setItems((prevItems) =>
          prevItems?.filter((item) => item.id !== itemId)
        );
        setCheckoutItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter((id) => id !== itemId)
        );
        setItemsBeingRemoved((prevItems) =>
          prevItems.filter((id) => id !== itemId)
        );
      } catch (error) {
        console.error("Error deleting item:", error);
        setItemsBeingRemoved((prevItems) =>
          prevItems.filter((id) => id !== itemId)
        );
      }
    }, 500);
  };

  const handleCheckboxChange = (itemId: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const handleCheckout = () => {
    const selected =
      items?.filter((item) => selectedItems.includes(item.id)) || [];
    setCheckoutItems(selected);
    setModalCheckout(true);
  };

  const isAnyItemSelected = selectedItems.length > 0;

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading items</div>;
  }

  return (
    <div className="overflow-hidden h-screen bg-ivory">
      <Navbar />
      <CartItems
        items={items || []}
        itemsBeingRemoved={itemsBeingRemoved}
        selectedItems={selectedItems}
        handleCheckboxChange={handleCheckboxChange}
        handleDeleteItem={handleDeleteItem}
      />
      <CheckoutButton
        isAnyItemSelected={isAnyItemSelected}
        handleCheckout={handleCheckout}
      />
      <CheckoutModal
        modalCheckout={modalCheckout}
        checkoutItems={checkoutItems}
        handleProceed={handleProceed}
        handleClose={() => setModalCheckout(false)}
      />
    </div>
  );
}

export default Checkout;
