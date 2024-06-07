import { CForm } from "@coreui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ORDER, apiClient, getLocalStorage } from "@utils";
import { FormEvent } from "react";


function ClaimOrder({ order }: any) {
  const { data: currentUserData } = getLocalStorage("AccountData");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData: any) => {
      return apiClient.patch(ORDER(order?.id), formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allOrders"],
        exact: true,
        refetchType: "all",
      })
    },
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const requestBody = {
      order_status: "in_progress",
      workforce_id: currentUserData.id
    };

    try {
      await mutation.mutateAsync(requestBody);
    } catch (error) {
      console.error(
        "Axios Error:",
        (error as any).response.data.error.join(". ")
      );
    }
  }

  return (
    <CForm onSubmit={handleSubmit} >
      <button
        type="submit"
        color="secondary"
        className="bg-green py-2 px-3 rounded-lg text-ivory hover:bg-gray-400 focus:bg-gray-500 focus:ring-2 ring-dark cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={currentUserData.role === "admin"}
      >
        Claim
      </button>   
    </CForm>
  )
}

export default ClaimOrder