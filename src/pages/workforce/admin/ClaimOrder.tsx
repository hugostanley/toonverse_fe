
type ClaimOrderProps = {
  order: Order;
  role: any;
}

function ClaimOrder({ order, role }: ClaimOrderProps) {

  return (
    <button
      type="submit"
      color="secondary"
      className="bg-green py-2 px-3 rounded-lg text-ivory hover:bg-gray-400 focus:bg-gray-500 focus:ring-2 ring-dark cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
      disabled={role === "artist"}
    >
      Claim
    </button>
  )
}

export default ClaimOrder