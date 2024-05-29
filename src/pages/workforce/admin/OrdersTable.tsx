import DataTable from "react-data-table-component";
import { Spinner } from "@components";
import { formatCreatedAt } from "@utils";
import { Link } from "react-router-dom";
import ClaimOrder from "./ClaimOrder";

type Order = {
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
  reference_image: string;
  latest_artwork?: string | null;
  latest_artwork_revision?: string | null;
  created_at: string;
  updated_at: string;
}

type OrdersTableProps = {
  data: Order[];
  isLoading: boolean;
  paginationRowsPerPageArray: number[];
}

function OrdersTable({ data, isLoading, paginationRowsPerPageArray }: OrdersTableProps) {
  const columns = [
    {
      name: "ID",
      width: "50px",
      style: {
        fontWeight: "900",
      },
      selector: (row: Order) => row.id
      
    },
    {
      name: "Item ID",
      maxWidth: "100px",
      selector: (row: Order) => row.item_id
    },
    {
      name: "Payment ID",
      maxWidth: "120px",
      selector: (row: Order) => row.payment_id
    },
    {
      name: "Details",
      minWidth: "250px",
      cell: (row: Order) => (
        <div className="flex flex-col gap-1 text-pretty py-2">
          <p>Art Style: <span className="font-bold">{row.art_style}</span></p>
          <p>Number of Heads: <span className="font-bold">{row.number_of_heads}</span></p>
          <p>Picture Style: <span className="font-bold">{row.picture_style}</span></p>
          <p>Notes: <span className="font-bold">{row.notes ? row.notes : "N/A"}</span></p>
          <Link to={row.background_url} target="_blank" className="underline underline-offset-2 text-blue hover:text-green">Background Url</Link>
          <Link to={row.reference_image} target="_blank" className="underline underline-offset-2 text-blue hover:text-green">
            <span>Reference Image</span>
          </Link>
        </div>
      )
    },
    {
      name: "Amount",
      selector: (row: Order) => parseFloat(row.amount).toFixed(2)
    },
    {
      name: "Created At",
      cell: (row: Order) => (
        <div className="text-pretty">{formatCreatedAt(row.created_at)}</div>
      )
    },
    {
      name: "Latest Artwork",
      cell: (row: Order) => (
        <div>
          {row.latest_artwork ? 
            <span className="text-pretty">{row.latest_artwork_revision}: {row.latest_artwork}</span>
            : "N/A"
          }
        </div>
        
      )
    },
    {
      name: "Status",
      sortable: true,
      selector: (row: Order) => row.order_status,
    },
    {
      name: "",
      cell: (row: Order) => (
        <div>
          {row.order_status === "queued" ? (
            <ClaimOrder order={row} />
          ) : (
            row.workforce_id
          )}
        </div>
        
      )
    },
  ]

  const customStyles = {
    headCells: {
      style: {
        fontSize: "0.85rem",
        fontWeight: "900",
      },
    },
    rows: {
      style: {
        fontSize: "0.75rem",
      },
    },
  };
  
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          fixedHeader
          pagination 
          paginationPerPage={paginationRowsPerPageArray[0]} 
          paginationRowsPerPageOptions={paginationRowsPerPageArray}
          defaultSortFieldId={0}
        />
      )}
    </>
  );
}

export default OrdersTable
