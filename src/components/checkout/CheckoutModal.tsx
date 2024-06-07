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
      <div className="flex flex-col gap-4 px-4 max-h-screen">
        <h2 className="font-bold text-lg">
          Are you sure you want to checkout?
        </h2>
        <div className="overflow-y-auto overflow-x-hidden max-h-80">
          {checkoutItems.map((item) => (
            <div key={item.id}>
              <p>
                Amount: <span className="font-bold">{item.amount}</span>
              </p>
              <p>Background: {item.background_url}</p>
              <p>Number of People/Pets: {item.number_of_heads}</p>
              <p>Art Style: {item.art_style}</p>
              <p>Picture Style: {item.picture_style}</p>
              <hr className="py-2 border-t-solid border-1 border-grey" />
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-center gap-4">
          <button
            className="btn__primary text-sm bg-warningRed text-light"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="btn__primary text-sm bg-green text-light"
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
