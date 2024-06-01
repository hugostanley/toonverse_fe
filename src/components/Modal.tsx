import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ open, onClose, children }: ModalProps) {
  return (
    <>
      <div
        className={`fixed z-10 inset-0 flex justify-center items-center transition-colors ${
          open ? "visible bg-dark" : "invisible"
        }`}
        onClick={onClose}
      >
        <div
          className={`bg-light rounded-lg shadow p-6 transition-all max-w-md ${
            open ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-50hover:text-gray-600"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
