import { useState, useEffect } from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Link } from "react-router-dom";
import { formatCreatedAt, baseURL, statusColors, apiClient } from "@utils";
import { Spinner, Modal } from "@components";

interface Order {
  id: number;
  item_id: number;
  payment_id: number;
  workforce_id: number;
  amount: string;
  order_status: string;
  background_url: string;
  number_of_heads: string;
  picture_style: string;
  art_style: string;
  notes?: string | null;
  remarks?: string | null;
  reference_image: string;
  latest_artwork?: string | null;
  latest_artwork_revision?: string | null;
  created_at: string;
  updated_at: string;
}

type OrdersTableProps = {
  data: Order[];
  isLoading: boolean;
};

const paginate = (array: Order[], page_size: number, page_number: number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

function UserOrdersTable({ data: initialData, isLoading }: OrdersTableProps) {
  const [data, setData] = useState(initialData);
  const [modalArtwork, setModalArtwork] = useState(false);
  const [artworkUrl, setArtworkUrl] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [showRevisionTextArea, setShowRevisionTextArea] = useState(false);
  const [revisionText, setRevisionText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [paginatedData, setPaginatedData] = useState<Order[]>([]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    setPaginatedData(paginate(data, itemsPerPage, currentPage));
  }, [data, itemsPerPage, currentPage]);

  const openArtworkModal = (url: string, orderId: number) => {
    setArtworkUrl(url);
    setSelectedOrderId(orderId);
    setModalArtwork(true);
  };

  const handleClaimOrder = async () => {
    if (selectedOrderId !== null) {
      try {
        const response = await apiClient.patch(
          `/api/v1/orders/${selectedOrderId}`,
          { order_status: "completed" }
        );

        if (response.status === 200) {
          const updatedData = data.map((order) => {
            if (order.id === selectedOrderId) {
              return { ...order, order_status: "completed" };
            }
            return order;
          });
          setData(updatedData);
          setModalArtwork(false);

          const imageResponse = await fetch(artworkUrl);
          const imageData = await imageResponse.blob();

          const imageURL = window.URL.createObjectURL(imageData);

          const link = document.createElement("a");
          link.href = imageURL;
          link.download = "artwork.jpg";
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();

          window.URL.revokeObjectURL(imageURL);
          document.body.removeChild(link);
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (error) {
        setErrorMessage("Failed to claim order. Please try again.");
        console.error("Failed to claim order:", error);
      }
    }
  };

  const handleDownload = async (artworkUrl: string) => {
    try {
      const imageResponse = await fetch(artworkUrl);
      const imageData = await imageResponse.blob();

      const imageURL = window.URL.createObjectURL(imageData);

      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "artwork.jpg";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(imageURL);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download artwork:", error);
    }
  };

  const handleAskForRevision = () => {
    setShowRevisionTextArea((prevState) => !prevState);
  };

  const submitRevision = async () => {
    if (selectedOrderId !== null) {
      try {
        const response = await apiClient.patch(
          `/api/v1/orders/${selectedOrderId}`,
          {
            order_status: "in_progress",
            remarks: revisionText,
          }
        );

        if (response.status === 200) {
          const updatedData = data.map((order) => {
            if (order.id === selectedOrderId) {
              return Object.assign({}, order, {
                order_status: "in_progress",
                remarks: revisionText,
              });
            }
            return order;
          });
          setData(updatedData);
          setModalArtwork(false);
          setShowRevisionTextArea(false);
          setRevisionText("");
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (error) {
        setErrorMessage("Failed to submit revision. Please try again.");
        console.error("Failed to submit revision:", error);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="py-3">
          {paginatedData && paginatedData.length > 0 ? (
            <>
              <CTable hover>
                <CTableHead>
                  <CTableRow className="text-sm">
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Payment Timestamp
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {paginatedData.map((order) => (
                    <CTableRow key={order.id} className="text-xs">
                      <CTableHeaderCell
                        scope="row"
                        className="tracking-widest pt-3"
                      >
                        {order.id}
                      </CTableHeaderCell>
                      <CTableDataCell className="pt-3">
                        <div
                          className={`btn__primary bg-${
                            statusColors[
                              order.order_status as keyof typeof statusColors
                            ]
                          }`}
                        >
                          {order.order_status}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="pt-3">
                        <div className="flex flex-col gap-1">
                          <span>Art Style: {order.art_style}</span>
                          <span>Number of Heads: {order.number_of_heads}</span>
                          <span>Picture Style: {order.picture_style}</span>
                          <span>
                            Notes: {order.notes ? order.notes : "N/A"}
                          </span>
                          <Link
                            to={order.background_url}
                            target="_blank"
                            className="underline underline-offset-2 text-blue hover:text-green"
                          >
                            Background Url
                          </Link>
                          <Link
                            to={order.reference_image}
                            target="_blank"
                            className="underline underline-offset-2 text-blue hover:text-green"
                          >
                            <span>Reference Image</span>
                          </Link>
                        </div>
                      </CTableDataCell>

                      <CTableDataCell className="pt-3">
                        ₱ {parseFloat(order.amount).toFixed(2)}
                      </CTableDataCell>

                      <CTableDataCell className="pt-3">
                        {formatCreatedAt(order.created_at)}
                      </CTableDataCell>

                      <CTableDataCell className="pt-3">
                        {order.latest_artwork &&
                          order.order_status === "delivered" && (
                            <button
                              className="btn__primary bg-blue"
                              onClick={() =>
                                openArtworkModal(
                                  `${baseURL}${order.latest_artwork}`,
                                  order.id
                                )
                              }
                            >
                              Artwork
                            </button>
                          )}
                        {order.latest_artwork &&
                          order.order_status === "completed" && (
                            <button
                              className="btn__primary bg-green"
                              onClick={() =>
                                handleDownload(
                                  `${baseURL}${order.latest_artwork}`
                                )
                              }
                            >
                              Download Artwork
                            </button>
                          )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div className="flex justify-end">
                <button
                  className={`btn__blue bg-grey text-xs ${
                    currentPage === 1 ? "cursor-not-allowed" : ""
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className={`btn__blue bg-grey text-xs ${
                    currentPage === Math.ceil(data.length / itemsPerPage) ||
                    data.length === 0
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(data.length / itemsPerPage) ||
                    data.length === 0
                  }
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/#styles"
              className="text-center hover:underline underline-offset-4 hover:font-bold w-full grid place-items-center"
            >
              Create an order!
            </Link>
          )}
        </div>
      )}

      <Modal open={modalArtwork} onClose={() => setModalArtwork(false)}>
        <div className="flex flex-col gap-4 px-4">
          <img src={artworkUrl} />
          <hr className="border-t-solid border-1 border-grey" />
          <div className="flex flex-row justify-center gap-4">
            <button
              className="btn__primary text-sm bg-green text-light"
              onClick={handleClaimOrder}
            >
              Claim Order
            </button>
            <button
              className="btn__primary text-sm bg-orange text-light"
              onClick={handleAskForRevision}
            >
              Ask for Revision
            </button>
          </div>
          {showRevisionTextArea && (
            <div className="flex flex-col gap-2 mt-4">
              <textarea
                className="border border-gray-300 p-2 rounded"
                value={revisionText}
                onChange={(e) => setRevisionText(e.target.value)}
                placeholder="Enter your revision remarks here"
              ></textarea>
              <button
                className="btn__primary text-sm bg-orange text-light"
                onClick={submitRevision}
              >
                Submit Remarks
              </button>
            </div>
          )}
          {errorMessage && (
            <div className="text-warningRed mt-2">{errorMessage}</div>
          )}
        </div>
      </Modal>
    </section>
  );
}

export default UserOrdersTable;
