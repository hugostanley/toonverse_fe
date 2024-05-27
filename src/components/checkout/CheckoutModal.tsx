import React from "react";
import { Modal } from "@components";
import { Item } from "@utils";

interface CheckoutModalProps {
  modalCheckout: boolean;
  checkoutItems: Item[];
  handleProceed: () => void;
  handleClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  modalCheckout,
  checkoutItems,
  handleProceed,
  handleClose,
}) => {
  return (
    <Modal open={modalCheckout} onClose={handleClose}>
      <div className="flex flex-col gap-4 px-4">
        <h2 className="font-bold text-lg">
          Are you sure you want to checkout?
        </h2>
        {checkoutItems.map((item) => (
          <div key={item.id}>
            <p>Amount: {item.amount}</p>
            <p>Background: {item.background_url}</p>
            <p>Number of People/Pets: {item.number_of_heads}</p>
            <p>Art Style: {item.art_style}</p>
            <p>Picture Style: {item.picture_style}</p>
          </div>
        ))}
        <hr className="border-t-solid border-1 border-grey" />
        <div className="flex flex-row justify-center gap-4">
          <button
            className="border border-neutral-300 rounded-lg py-1.5 px-10 bg-blue hover:bg-pink text-light"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="border border-neutral-300 rounded-lg py-1.5 px-10 bg-blue hover:bg-pink text-light"
            onClick={handleProceed}
            disabled={!checkoutItems.length}
          >
            Proceed
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
