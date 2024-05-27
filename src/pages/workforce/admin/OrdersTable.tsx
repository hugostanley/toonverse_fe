import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";

function OrdersTable() {
  return (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">ID</CTableHeaderCell>
          <CTableHeaderCell scope="col">Item ID</CTableHeaderCell>
          <CTableHeaderCell scope="col">Payment ID</CTableHeaderCell>
          <CTableHeaderCell scope="col">Details</CTableHeaderCell>
          <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
          <CTableHeaderCell scope="col">Created at</CTableHeaderCell>
          <CTableHeaderCell scope="col">Latest Artwork</CTableHeaderCell>
          <CTableHeaderCell scope="col">Status</CTableHeaderCell>
          <CTableHeaderCell scope="col">Artist ID</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody className="">
        <CTableRow className="">
          <CTableHeaderCell
            scope="row"
            className="tracking-widest pt-3"
          >
            1
          </CTableHeaderCell>

          <CTableDataCell className="pt-3">
            1
          </CTableDataCell>

          <CTableDataCell className="pt-3">
            1
          </CTableDataCell>

          <CTableDataCell className="pt-3">
            Details
          </CTableDataCell>

          <CTableDataCell className="pt-3">
            Amount
          </CTableDataCell>

          <CTableDataCell className="pt-3">
            mm/dd/yyyy hh/mm/ss
          </CTableDataCell>

          <CTableDataCell className="pt-3">
            
          </CTableDataCell> 

          <CTableDataCell className="pt-3">
            queued
          </CTableDataCell>

          <CTableDataCell className="">
            <CButton
              type="submit"
              color="secondary"
              className="bg-green"
            >
              Claim
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  )
}

export default OrdersTable
